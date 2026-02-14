import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import logo from '../assets/logo.png';
import { cityAgencies } from '../data/cityAgencies';
import ChatAssistant from './ChatAssistant';

function SiteShell() {
  const { content } = useSiteData();
  const location = useLocation();
  const [showQuickBook, setShowQuickBook] = useState(false);
  const [quickBookData, setQuickBookData] = useState(null);
  const [siteLang, setSiteLang] = useState(() => localStorage.getItem('cmpf_lang') || 'fr');
  const phones = Array.isArray(content.phones) && content.phones.length ? content.phones : [content.phone];
  const phoneRaw = content.phone || '';
  const phoneDigits = phoneRaw.replace(/[^\d+]/g, '');
  const whatsappDigits = phoneRaw.replace(/\D/g, '');
  const activeBookPhone = quickBookData?.phone || content.phone || '';
  const activeBookEmail = quickBookData?.email || content.email || '';
  const activeBookAddress = quickBookData?.address || '';
  const activeBookMessage = quickBookData?.message || 'Intervention immediate demandee.';
  const activeBookPhoneDigits = activeBookPhone.replace(/[^\d+]/g, '');
  const activeBookWhatsappDigits = activeBookPhone.replace(/\D/g, '');
  const activeBookTitle = quickBookData?.title || 'Cellule de Prise en Charge';
  const activeBookCopy =
    quickBookData?.copy ||
    'Appelez-nous ou ecrivez sur WhatsApp. Notre standard est disponible 24/7 pour une assistance immediate.';
  const applyGoogleTranslate = (lang) => {
    const tryApply = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (!tryApply()) {
      setTimeout(() => tryApply(), 600);
    }
  };

  const quickLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Galerie' },
    { to: '/cities-map', label: 'Nos Villes' },
    { to: '/contact', label: 'Contact' }
  ];

  const serviceLinks = [
    'Ambulance medicalisee',
    'Ambulance avec medecin',
    'Medecin et infirmier a domicile',
    'Transport dialyse',
    'Assistance evenementielle'
  ];

  const cityLinks = ['Agadir', 'Casablanca', 'Fes', 'Laayoune', 'Marrakech', 'Meknes', 'Nador', 'Ouarzazate', 'Oujda', 'Rabat', 'Tanger', 'Tetouan'];
  const cityLinksLeft = cityLinks.slice(0, Math.ceil(cityLinks.length / 2));
  const cityLinksRight = cityLinks.slice(Math.ceil(cityLinks.length / 2));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const selector = '.service-card, .long-card, .partner-card, .faq-item, .fleet-card, .review-google-card, .number-card, .about-premium-card, .timeline-card, .testimonial-card, .blog-card';
    const nodes = Array.from(document.querySelectorAll(selector));

    nodes.forEach((node) => node.classList.add('scroll-fade-up'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const openQuickBook = (event) => {
      setQuickBookData(event?.detail || null);
      setShowQuickBook(true);
    };
    window.addEventListener('cmpf-open-book-panel', openQuickBook);
    return () => window.removeEventListener('cmpf-open-book-panel', openQuickBook);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', siteLang);
    localStorage.setItem('cmpf_lang', siteLang);
    applyGoogleTranslate(siteLang);
  }, [siteLang]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'fr,en,ar',
          autoDisplay: false
        },
        'google_translate_element'
      );
      applyGoogleTranslate(siteLang);
    };

    if (!document.querySelector('script[data-cmpf-google-translate]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.setAttribute('data-cmpf-google-translate', 'true');
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  return (
    <div className="cmpf-site">
      <header className="top-bar py-2">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span><i className="bi bi-telephone me-2" />{phones.join(' | ')}</span>
          <span><i className="bi bi-envelope me-2" />{content.email}</span>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg sticky-top cmpf-nav">
        <div className="container">
          <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img src={logo} alt={`${content.company} logo`} className="brand-logo" />
            <span className="notranslate" translate="no">CMPF Assistance</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cmpfMenu">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="cmpfMenu">
            <ul className="navbar-nav ms-auto gap-lg-2">
              <li className="nav-item"><NavLink className="nav-link" to="/">Accueil</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services aux Entreprises
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/services-entreprises/medicalisation-sites-industriels">
                      Medicalisation des Sites Industriels
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services-entreprises/contre-visite-medicale">
                      Contre Visite Medicale
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item"><NavLink className="nav-link" to="/gallery">Galerie</NavLink></li>
              <li className="nav-item dropdown city-group-nav">
                <a className="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Nos Agences
                </a>
                <ul className="dropdown-menu city-group-menu">
                  <li><Link className="dropdown-item" to="/cities-map">Carte des Villes</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  {cityAgencies.map((city) => (
                    <li key={city.slug}>
                      <Link className="dropdown-item" to={`/agences/${city.slug}`}>
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className="dropdown ms-lg-2 mt-3 mt-lg-0">
              <button
                className="lang-switch-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Changer la langue"
              >
                <i className="bi bi-globe2" />
                <span>{siteLang.toUpperCase()}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end lang-switch-menu">
                <li><button type="button" className={`dropdown-item ${siteLang === 'fr' ? 'active' : ''}`} onClick={() => setSiteLang('fr')}>Francais</button></li>
                <li><button type="button" className={`dropdown-item ${siteLang === 'ar' ? 'active' : ''}`} onClick={() => setSiteLang('ar')}>Arabe</button></li>
                <li><button type="button" className={`dropdown-item ${siteLang === 'en' ? 'active' : ''}`} onClick={() => setSiteLang('en')}>Anglais</button></li>
              </ul>
            </div>
            <NavLink className="nav-contact-cta ms-lg-3 mt-3 mt-lg-0" to="/contact">
              <i className="bi bi-telephone-fill" />
              <span>Contact</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="site-footer-creative">
        <div className="footer-glow footer-glow-left" />
        <div className="footer-glow footer-glow-right" />
        <div className="container position-relative">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-brand-card h-100">
                <div className="footer-logo-wrap">
                  <img src={logo} alt={`${content.company} logo`} className="footer-logo-img" />
                  <div>
                    <h4 className="mb-0 notranslate" translate="no">CMPF Assistance</h4>
                    <small>Ambulance et Assistance Medicale</small>
                  </div>
                </div>
                <p className="mt-3 mb-3">Assistance medicale complete: urgence, hors urgence, rapatriement sanitaire et couverture evenementielle.</p>
                <div className="footer-socials">
                  <a href="#!" aria-label="facebook"><i className="bi bi-facebook" /></a>
                  <a href="#!" aria-label="instagram"><i className="bi bi-instagram" /></a>
                  <a href="#!" aria-label="youtube"><i className="bi bi-youtube" /></a>
                  <a href="#!" aria-label="whatsapp"><i className="bi bi-whatsapp" /></a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2">
              <h6 className="footer-title">Liens Rapides</h6>
              <ul className="footer-links">
                {quickLinks.map((item) => (
                  <li key={item.to}><NavLink to={item.to}>{item.label}</NavLink></li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 col-lg-3">
              <h6 className="footer-title">Services CMPF</h6>
              <ul className="footer-links">
                {serviceLinks.map((item) => (
                  <li key={item}><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 col-lg-3">
              <h6 className="footer-title">Villes</h6>
              <div className="footer-cities-row">
                <div className="footer-cities-list-wrap">
                  <ul className="footer-links footer-cities-list">
                    {cityLinksLeft.map((city) => (
                      <li key={city}><span>{city}</span></li>
                    ))}
                  </ul>
                  <ul className="footer-links footer-cities-list">
                    {cityLinksRight.map((city) => (
                      <li key={city}><span>{city}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>(c) {new Date().getFullYear()} {content.company}. Tous droits reserves.</span>
            <span>Ambulance, assistance et transport medical 24/7.</span>
          </div>
        </div>
      </footer>
      <div id="google_translate_element" className="google-translate-hidden" />

      <div className="floating-actions">
        <a className="floating-btn whatsapp-btn" href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
          <i className="bi bi-whatsapp" />
        </a>
        <a className="floating-btn call-btn" href={`tel:${phoneDigits}`} aria-label="Appeler" title="Appeler">
          <i className="bi bi-telephone-fill" />
        </a>
      </div>

      {showQuickBook && (
        <div className="quick-book-overlay" onClick={() => setShowQuickBook(false)}>
          <section className="quick-book-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="quick-book-close" onClick={() => setShowQuickBook(false)} aria-label="Fermer">
              <i className="bi bi-x-lg" />
            </button>
            <h4>{activeBookTitle}</h4>
            <p className="quick-book-copy">{activeBookCopy}</p>
            <div className="quick-book-row">
              <i className="bi bi-telephone-fill" />
              <a href={`tel:${activeBookPhoneDigits}`}>{activeBookPhone}</a>
            </div>
            <div className="quick-book-row">
              <i className="bi bi-envelope-fill" />
              <a href={`mailto:${activeBookEmail}`}>{activeBookEmail}</a>
            </div>
            {activeBookAddress && (
              <div className="quick-book-row">
                <i className="bi bi-geo-alt-fill" />
                <span>{activeBookAddress}</span>
              </div>
            )}
            <div className="quick-book-row">
              <i className="bi bi-chat-dots-fill" />
              <span>{activeBookMessage}</span>
            </div>
            <div className="quick-book-actions">
              <a className="quick-btn quick-wa" href={`https://wa.me/${activeBookWhatsappDigits}`} target="_blank" rel="noreferrer">
                <i className="bi bi-whatsapp" /> WhatsApp
              </a>
              <a className="quick-btn quick-call" href={`tel:${activeBookPhoneDigits}`}>
                <i className="bi bi-telephone-fill" /> Appeler
              </a>
            </div>
            <p className="quick-book-note mb-0">Chaque minute compte. La CMPF repond avec rapidite, confort et securite.</p>
          </section>
        </div>
      )}

      <ChatAssistant />
    </div>
  );
}

export default SiteShell;
