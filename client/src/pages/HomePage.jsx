import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useSiteData } from '../context/SiteDataContext';
import heroImage from '../assets/hero.jpeg';
import Seo from '../components/Seo';
import { cityAgencies } from '../data/cityAgencies';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebsiteSchema
} from '../seo/schemas';

const pillars = [
  'Transfert vers une structure de soins de proximite',
  'Rapatriement sanitaire avec equipe medicale',
  'Assistance psychologique en cas d evenement traumatisant',
  'Constitution rapide du dossier et demarches administratives'
];

const homeFaqs = [
  { q: 'La CMPF intervient-elle 24h/24 et 7j/7 ?', a: 'Oui, sur simple appel et a tout moment, nos equipes se mobilisent selon le besoin medical.' },
  { q: 'Quels types de transport medical proposez-vous ?', a: 'Ambulance medicalisee, ambulance avec medecin, transport dialyse, rapatriement sanitaire et solutions specialisees.' },
  { q: 'Intervenez-vous pour les evenements ?', a: 'Oui, congres, salons, evenements sportifs, culturels, chantiers, avec ambulance, infirmerie mobile et equipe medicale.' },
  { q: 'Pouvez-vous organiser une prise en charge hors urgence ?', a: 'Oui, nous mobilisons medecins, infirmiers, paramedicaux, location de materiel et suivi clinique apres hospitalisation.' }
];

const cities = cityAgencies.map((city) => ({
  slug: city.slug,
  code: city.code,
  name: city.name,
  region: city.region,
  address: city.address,
  phones: Array.isArray(city.phones) ? city.phones : [],
  mobile: city.mobile,
  email: city.email
}));

function AnimatedStatValue({ value }) {
  const valueRef = useRef(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(value);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const match = value.match(/(\d+(?:[.,]\d+)?)/);
    if (!isInView || !match) {
      return;
    }

    const numericRaw = match[0].replace(/,/g, '');
    const target = Number(numericRaw);
    if (Number.isNaN(target)) {
      return;
    }

    const hasDecimal = numericRaw.includes('.');
    const decimals = hasDecimal ? numericRaw.split('.')[1].length : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    const duration = 1900;
    let rafId;

    const formatNumber = (num) => {
      const fixed = decimals > 0 ? num.toFixed(decimals) : Math.round(num);
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(Number(fixed));
    };

    setIsRunning(true);
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = target * eased;
      setDisplayValue(`${prefix}${formatNumber(current)}${suffix}`);
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
        setIsRunning(false);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isInView, value]);

  return <span ref={valueRef} className={isRunning ? 'count-pop' : ''}>{displayValue}</span>;
}

function getStatIcon(label, index) {
  const text = label.toLowerCase();
  if (text.includes('dispatch')) return 'bi bi-activity';
  if (text.includes('response') || text.includes('time')) return 'bi bi-stopwatch-fill';
  if (text.includes('cities') || text.includes('covered')) return 'bi bi-geo-alt-fill';
  if (text.includes('ambulance')) return 'bi bi-truck';
  const fallback = ['bi bi-heart-pulse-fill', 'bi bi-shield-check', 'bi bi-graph-up-arrow', 'bi bi-hospital'];
  return fallback[index % fallback.length];
}

function HomePage() {
  const { content, apiBaseUrl } = useSiteData();
  const [selectedCitySlug, setSelectedCitySlug] = useState(() => cities[0]?.slug || '');
  const [openFaq, setOpenFaq] = useState(0);
  const homeMapSectionRef = useRef(null);
  const selectedCity = useMemo(() => cities.find((city) => city.slug === selectedCitySlug) || cities[0], [selectedCitySlug]);
  const selectedCityPhone = selectedCity.phones?.[0] || selectedCity.mobile || '';
  const phoneDigits = (content.phone || '').replace(/[^\d+]/g, '');
  const whatsappDigits = (content.phone || '').replace(/\D/g, '');
  const resolvedHeroImage = (() => {
    const heroSrc = content?.hero?.backgroundImage || heroImage;
    if (heroSrc.startsWith('/uploads/')) return `${apiBaseUrl}${heroSrc}`;
    return heroSrc;
  })();

  const mapSrc = useMemo(() => {
    const query = encodeURIComponent(selectedCity.address || `${selectedCity.name}, Morocco`);
    return `https://www.google.com/maps?q=${query}&z=11&output=embed`;
  }, [selectedCity]);

  const scrollToHomeMap = () => {
    requestAnimationFrame(() => {
      homeMapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const leftFaqs = homeFaqs.slice(0, Math.ceil(homeFaqs.length / 2));
  const rightFaqs = homeFaqs.slice(Math.ceil(homeFaqs.length / 2));

  const googleStyleReviews = useMemo(
    () =>
      content.testimonials.map((item, index) => ({
        ...item,
        date: ['il y a 2 jours', 'il y a 1 semaine', 'il y a 2 semaines'][index % 3],
        badge: ['Guide Local', 'Utilisateur Verifie', 'Guide Local'][index % 3],
        avatar: `https://i.pravatar.cc/100?img=${index + 12}`
      })),
    [content.testimonials]
  );

  return (
    <>
      <Seo
        title="Ambulance et Assistance Medicale 24/7"
        description="CMPF Assistance intervient rapidement pour transport medical, rapatriement sanitaire, assistance a domicile et couverture evenementielle au Maroc."
        path="/"
        image="/hero.jpeg"
        keywords="ambulance maroc, assistance medicale, rapatriement sanitaire, ambulance casablanca, transport medical urgent"
        structuredData={[
          buildOrganizationSchema(content),
          buildWebsiteSchema(),
          buildWebPageSchema({
            name: 'Accueil CMPF Assistance',
            path: '/',
            description: 'Services d ambulance et assistance medicale disponibles 24/7 au Maroc.'
          }),
          buildBreadcrumbSchema([{ name: 'Accueil', path: '/' }]),
          buildFaqSchema(homeFaqs)
        ]}
      />
      <section className="hero-section" style={{ backgroundImage: `url(${resolvedHeroImage})` }}>
        <div className="hero-overlay" />
        <div className="container position-relative">
          <motion.div className="hero-content" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1>{content.hero.title}</h1>
            <p>{content.hero.subtitle}</p>
            <div className="hero-urgency-note">
              <i className="bi bi-exclamation-triangle-fill" />
              <span>Urgence Medicale 24/7 - Reponse Immediate</span>
            </div>
            <div className="hero-actions-wrap">
              <a className="hero-action-btn hero-call-btn" href={`tel:${phoneDigits}`}>
                <i className="bi bi-telephone-fill" />
                <span>Appel Urgence</span>
              </a>
              <a className="hero-action-btn hero-wa-btn" href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">
                <i className="bi bi-whatsapp" />
                <span>WhatsApp Immediate</span>
              </a>
            </div>
            <div className="hero-secondary-action">
              <Link to="/services" className="btn btn-light">{content.hero.ctaSecondary}</Link>
            </div>
          </motion.div>
        </div>
        <div className="hero-wave" />
      </section>

      <div className="home-creative">
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Services d Assistance Medicale</h2>
          <div className="row g-4 mt-2">
            {content.services.map((service, idx) => (
              <motion.div key={service.title} className="col-12 col-md-6 col-lg-3" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="service-card h-100">
                  <i className={`bi ${service.icon} service-icon`} />
                  <h5>{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cmpf-ops-section">
        <div className="container">
          <div className="row g-4 align-items-center">
            <motion.div
              className="col-lg-7"
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
            >
              <h2 className="section-title text-start mb-3">Equipe CMPF: Surveillance, Rapidite et Fiabilite</h2>
              <p className="section-copy mb-3">
                Chez CMPF, une equipe de coordination reste active 24/7 pour suivre les ambulances en temps reel, orienter
                les trajets vers la structure de soins adaptee et reduire le temps de reponse au maximum.
              </p>
              <p className="section-copy mb-4">
                Nos ambulanciers qualifies, superviseurs terrain et cellule de dispatch travaillent ensemble avec discipline,
                serenite et sens des responsabilites pour garantir la securite du patient et la credibilite du service.
              </p>
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="ops-mini-card h-100">
                    <i className="bi bi-activity" />
                    <h6>Suivi en Temps Reel</h6>
                    <p>Controle continu des equipes et des vehicules d urgence.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ops-mini-card h-100">
                    <i className="bi bi-stopwatch-fill" />
                    <h6>Intervention Rapide</h6>
                    <p>Activation immediate des ambulances selon le niveau d urgence.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ops-mini-card h-100">
                    <i className="bi bi-shield-check" />
                    <h6>Service Fiable</h6>
                    <p>Protocoles clairs, qualite de prise en charge et securite.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ops-mini-card h-100">
                    <i className="bi bi-people-fill" />
                    <h6>Equipe Encadree</h6>
                    <p>Drari khedamin mra9bin mzyan b coordination permanente.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-5"
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <div className="ops-photo-wrap">
                <img
                  src="/7.jpeg"
                  alt="Supervision equipe CMPF"
                  className="ops-photo"
                />
                <div className="ops-photo-badge">
                  <span className="d-block">Coordination Active</span>
                  <strong>24/7</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section about-strip">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img src={content.story.image} alt="Equipe medicale CMPF" className="img-fluid about-image" />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title text-start">{content.story.heading}</h2>
              <p className="section-copy">{content.story.content}</p>
              <p className="section-copy">Chaque ambulance est connectee au dispatch GPS pour ajuster les trajets selon le trafic et la disponibilite des structures de soins.</p>
              <ul className="pill-list">
                {pillars.map((pillar) => <li key={pillar}>{pillar}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-band">
        <div className="container">
          <div className="stats-header text-center mb-4">
            <h2 className="section-title text-white mb-2">CMPF en Chiffres</h2>
            <p className="stats-subtitle mb-0">Des indicateurs reels qui montrent la rapidite, la couverture et la fiabilite de notre service ambulance.</p>
          </div>
          <div className="row g-4">
            {content.stats.map((item, index) => (
              (() => {
                const normalizedLabel = String(item.label || '').toLowerCase();
                const safeValue = normalizedLabel.includes('assistance disponible') ? '24/7' : item.value;
                return (
              <motion.div
                className="col-6 col-lg-3"
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="stat-card text-center h-100">
                  <div className="stat-icon-badge"><i className={getStatIcon(item.label, index)} /></div>
                  <div className="stat-value"><AnimatedStatValue value={safeValue} /></div>
                  <div className="stat-label">{item.label}</div>
                </div>
              </motion.div>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      <section className="section home-about-premium">
        <div className="container">
          <h2 className="section-title">Qui Sommes-Nous ?</h2>
          <p className="home-about-lead text-center">L assistance medicale CMPF englobe ambulance, avion sanitaire, taxi, rapatriement et accompagnement medical selon la gravite de la situation.</p>
          <div className="row g-4 mt-2 align-items-stretch">
            <div className="col-lg-5">
              <div className="about-photo-wrap h-100">
                <img
                  src={resolvedHeroImage}
                  alt="CMPF Assistance service"
                  className="about-photo"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-md-6"><div className="about-premium-card h-100"><span className="about-badge">Intervention</span><span className="about-card-icon"><i className="bi bi-shield-check" /></span><h5>Rapide et Structuree</h5><p>Intervention immediate vers structure de soins, avec coordination medicale et administrative.</p></div></div>
                <div className="col-md-6"><div className="about-premium-card h-100"><span className="about-badge">Equipe</span><span className="about-card-icon"><i className="bi bi-people-fill" /></span><h5>Medecin et Infirmier</h5><p>Mobilisation de medecin et/ou infirmier(e) pour les cas exigeant un encadrement medical avance.</p></div></div>
                <div className="col-md-6"><div className="about-premium-card h-100"><span className="about-badge">Hors Urgence</span><span className="about-card-icon"><i className="bi bi-globe2" /></span><h5>Suivi et Domicile</h5><p>Medecin a domicile, infirmier a domicile, hospitalisation a domicile et suivi clinique post-hospitalisation.</p></div></div>
                <div className="col-md-6"><div className="about-premium-card h-100"><span className="about-badge">Evenements</span><span className="about-card-icon"><i className="bi bi-cpu-fill" /></span><h5>Couverture Complete</h5><p>Congres, salons, sport, culture, chantiers: ambulances, infirmerie mobile et equipe medicale.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reviews-creative-section">
        <div className="container">
          <h2 className="section-title">Avis Clients</h2>
          <p className="reviews-subtitle">Avec CMPF Assistance, chaque deplacement devient une experience unique, fiable et sereine.</p>
          <div className="reviews-slider-wrap mt-4">
            <Carousel indicators controls fade interval={4200} pause="hover">
              {googleStyleReviews.map((person) => (
                <Carousel.Item key={person.name}>
                  <div className="review-google-card">
                    <div className="review-quote-mark">
                      <i className="bi bi-quote" />
                    </div>
                    <div className="review-header">
                      <img src={person.avatar} alt={person.name} className="review-avatar" />
                      <div>
                        <h6 className="mb-0">{person.name}</h6>
                        <small className="review-role">{person.role}</small>
                      </div>
                      <span className="review-badge">{person.badge}</span>
                    </div>
                    <div className="review-stars-row">
                      <span className="rating-stars"><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /></span>
                      <small>{person.date}</small>
                    </div>
                    <p className="review-text">"{person.text}"</p>
                    <div className="review-source">
                      <i className="bi bi-geo-alt-fill me-1" />
                      Avis verifie de nos beneficiaires
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Les Questions Frequentes</h2>
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              {leftFaqs.map((item, idx) => {
                const questionIndex = idx;
                const isOpen = openFaq === questionIndex;
                return (
                  <div className={`faq-item faq-clickable mb-3 ${isOpen ? 'open' : ''}`} key={item.q}>
                    <button type="button" className="faq-toggle" onClick={() => setOpenFaq(isOpen ? -1 : questionIndex)}>
                      <span>{item.q}</span>
                      <i className={`bi ${isOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`} />
                    </button>
                    {isOpen && <p className="faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
            <div className="col-md-6">
              {rightFaqs.map((item, idx) => {
                const questionIndex = idx + leftFaqs.length;
                const isOpen = openFaq === questionIndex;
                return (
                  <div className={`faq-item faq-clickable mb-3 ${isOpen ? 'open' : ''}`} key={item.q}>
                    <button type="button" className="faq-toggle" onClick={() => setOpenFaq(isOpen ? -1 : questionIndex)}>
                      <span>{item.q}</span>
                      <i className={`bi ${isOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`} />
                    </button>
                    {isOpen && <p className="faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos Villes de Couverture</h2>
          <div className="row g-3 mt-2">
            {cities.map((city) => (
              <div className="col-6 col-md-4 col-lg-3" key={city.slug}>
                <button
                  type="button"
                  className={`city-btn w-100 ${selectedCity.slug === city.slug ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCitySlug(city.slug);
                    scrollToHomeMap();
                  }}
                >
                  <span className="city-name notranslate" translate="no">{city.name}</span>
                  <small>{city.region}</small>
                </button>
              </div>
            ))}
          </div>

          <div className="row g-4 align-items-stretch mt-1" ref={homeMapSectionRef}>
            <div className="col-lg-8">
              <div className="map-frame-wrap h-100">
                <iframe
                  key={selectedCity.slug}
                  title={`${selectedCity.name} map`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="city-map-frame"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="long-card h-100 d-flex flex-column notranslate" translate="no">
                <h4>{selectedCity.code} - {selectedCity.name}</h4>
                <p className="mb-2"><strong>Region:</strong> {selectedCity.region}</p>
                <p className="mb-2"><strong>Adresse:</strong> {selectedCity.address}</p>
                <p className="section-copy mb-3">Contacts agence de la ville selectionnee.</p>
                <ul className="check-list">
                  {(selectedCity.phones || []).map((phone) => <li key={phone}><strong>Tel:</strong> {phone}</li>)}
                  <li><strong>Mobile:</strong> {selectedCity.mobile}</li>
                  <li><strong>Email:</strong> {selectedCity.email}</li>
                </ul>
                <div className="mt-auto pt-3">
                  <button
                    type="button"
                    className="btn btn-emergency w-100"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('cmpf-open-book-panel', {
                          detail: {
                            title: `Agence CMPF ${selectedCity.name}`,
                            copy: `Notre equipe locale ${selectedCity.name} est disponible 24/7 pour urgence et transfert medical.`,
                            phone: selectedCityPhone,
                            email: selectedCity.email,
                            address: selectedCity.address,
                            message: `Bonjour CMPF, besoin d assistance ambulance sur ${selectedCity.name}.`
                          }
                        })
                      )
                    }
                  >
                    Appeler l Agence
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Assistance Medicale Evenementielle</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-4"><div className="partner-card h-100"><h5>Congres et Salons</h5><p>Presence d une ou plusieurs ambulances avec equipe medicale dediee.</p></div></div>
            <div className="col-md-4"><div className="partner-card h-100"><h5>Evenements Sportifs et Culturels</h5><p>Infirmerie mobile et dispositif medical pendant toute la duree de l evenement.</p></div></div>
            <div className="col-md-4"><div className="partner-card h-100"><h5>Chantiers et Sites Professionnels</h5><p>Conventionnement pour prise en charge immediate des malades ou accidentes sur site.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container text-center">
          <h2>Besoin d une assistance immediate ?</h2>
          <p className="mb-4">La CMPF intervient rapidement pour tout besoin medical, transfert ou rapatriement.</p>
          <Link to="/contact" className="btn btn-emergency" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('cmpf-open-book-panel')); }}>Demander une Ambulance</Link>
        </div>
      </section>
      </div>
    </>
  );
}

export default HomePage;


