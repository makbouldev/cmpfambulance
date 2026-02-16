import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from '../seo/schemas';

const serviceCatalog = [
  {
    title: 'Ambulance Medicalisee',
    icon: 'bi-heart-pulse-fill',
    category: 'Urgence',
    image: '1.jpeg',
    description: 'Ambulance equipee pour prise en charge immediate et surveillance medicale continue.'
  },
  {
    title: 'Ambulance avec Medecin',
    icon: 'bi-hospital-fill',
    category: 'Urgence',
    image: '2.jpeg',
    description: 'Intervention avec medecin et/ou infirmier selon la gravite et la situation du patient.'
  },
  {
    title: 'Medecin d Urgence',
    icon: 'bi-prescription2',
    category: 'Urgence',
    image: '3.jpeg',
    description: 'Mobilisation rapide d un medecin pour evaluation clinique et orientation therapeutique.'
  },
  {
    title: 'Rapatriement Sanitaire',
    icon: 'bi-airplane-fill',
    category: 'Transport Medical',
    image: '4.jpeg',
    description: 'Organisation complete du rapatriement avec equipe medicale et logistique administrative.'
  },
  {
    title: 'Transport Ambulance',
    icon: 'bi-truck',
    category: 'Transport Medical',
    image: '5.jpeg',
    description: 'Transport securise pour hospitalisation, consultation, retour domicile ou transfert inter-hopital.'
  },
  {
    title: 'Transport pour Dialyse',
    icon: 'bi-arrow-left-right',
    category: 'Transport Medical',
    image: '6.jpeg',
    description: 'Trajets programmes et ponctuels vers les centres de dialyse avec confort et ponctualite.'
  },
  {
    title: 'Couveuse',
    icon: 'bi-heart-fill',
    category: 'Transport Medical',
    image: '7.jpeg',
    description: 'Transport neonatal en couveuse avec supervision adaptee aux besoins du nouveau-ne.'
  },
  {
    title: 'Medecin a Domicile',
    icon: 'bi-house-heart-fill',
    category: 'Domicile',
    image: '8.jpeg',
    description: 'Consultation medicale a domicile pour cas non deplacables ou suivi post-hospitalisation.'
  },
  {
    title: 'Infirmier a Domicile',
    icon: 'bi-bandaid-fill',
    category: 'Domicile',
    image: '9.jpeg',
    description: 'Soins infirmiers a domicile: pansements, injections, surveillance et accompagnement quotidien.'
  },
  {
    title: 'Hospitalisation a Domicile',
    icon: 'bi-hospital',
    category: 'Domicile',
    image: '10.jpeg',
    description: 'Mise en place d un parcours de soins a domicile encadre par des intervenants qualifies.'
  },
  {
    title: 'Assistance a l Hospitalisation',
    icon: 'bi-clipboard2-check-fill',
    category: 'Domicile',
    image: '1.jpeg',
    description: 'Coordination avant, pendant et apres hospitalisation pour fluidifier la prise en charge.'
  },
  {
    title: 'Contre-visite',
    icon: 'bi-search-heart-fill',
    category: 'Domicile',
    image: '2.jpeg',
    description: 'Evaluation medicale complementaire selon la demande des familles ou des organismes partenaires.'
  },
  {
    title: 'Intervenants Paramedicaux',
    icon: 'bi-people-fill',
    category: 'Paramedical',
    image: '3.jpeg',
    description: 'Mobilisation de profils paramedicaux adaptes au besoin clinique et au plan therapeutique.'
  },
  {
    title: 'Materiel Paramedical',
    icon: 'bi-capsule-pill',
    category: 'Paramedical',
    image: '4.jpeg',
    description: 'Mise a disposition de materiel paramedical pour optimiser le suivi et le confort du patient.'
  },
  {
    title: 'Location Materiel Medical',
    icon: 'bi-clipboard2-pulse-fill',
    category: 'Paramedical',
    image: '5.jpeg',
    description: 'Location de materiel medical avec accompagnement sur l installation et l utilisation.'
  },
  {
    title: 'Evenements Sportifs ou Culturels',
    icon: 'bi-trophy-fill',
    category: 'Evenementiel',
    image: '6.jpeg',
    description: 'Dispositif medical complet sur site: ambulance, infirmerie mobile et equipe encadrante.'
  }
];

const categories = ['Urgence', 'Transport Medical', 'Domicile', 'Paramedical', 'Evenementiel'];

const faqs = [
  { q: 'Intervenez-vous 24/7 ?', a: 'Oui, la CMPF assure une disponibilite continue pour les urgences et les besoins planifies.' },
  { q: 'Proposez-vous transport dialyse et rapatriement ?', a: 'Oui, transport dialyse programme et rapatriement sanitaire avec encadrement medical.' },
  { q: 'Pouvez-vous couvrir des evenements ?', a: 'Oui, sportifs, culturels, salons et chantiers avec dispositif medical adapte.' },
  { q: 'Avez-vous des services a domicile ?', a: 'Oui: medecin a domicile, infirmier a domicile, hospitalisation et assistance a l hospitalisation.' }
];

function ServicesPage() {
  const { content } = useSiteData();

  return (
    <>
      <Seo
        title="Services Ambulance et Assistance Medicale"
        description="Tous les services CMPF: ambulance medicalisee, medecin a domicile, couveuse, dialyse, paramedical, rapatriement sanitaire et evenementiel."
        path="/services"
        image={content.hero.backgroundImage}
        keywords="ambulance medicalisee, transport ambulance, medecin urgence, dialyse, rapatriement sanitaire, infirmier domicile"
        structuredData={[
          buildWebPageSchema({
            name: 'Services CMPF Assistance',
            path: '/services',
            description: 'Catalogue complet des services CMPF Assistance.'
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/services' }
          ]),
          buildFaqSchema(faqs)
        ]}
      />

      <section className="inner-hero">
        <div className="container">
          <h1>Ambulance et Assistance Medicale</h1>
          <p>Des services complets, rapides et structures pour urgence, domicile, transport et evenementiel.</p>
        </div>
      </section>

      <section className="section services-intro-creative">
        <div className="container">
          <div className="service-intro-panel">
            <h2 className="section-title text-start mb-3">Catalogue de Services CMPF</h2>
            <p className="section-copy mb-4">
              Nos prestations couvrent l urgence medicale, le transport specialise, les soins a domicile, le paramedical
              et la couverture des evenements. Chaque service est active selon un protocole de qualite, securite et rapidite.
            </p>
            <div className="transport-chip-wrap">
              {categories.map((item) => (
                <span key={item} className="transport-chip">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section service-catalog-section">
        <div className="container">
          {categories.map((category) => (
            <div className="service-catalog-group mb-5" key={category}>
              <h3 className="service-catalog-title">{category}</h3>
              <div className="row g-4 mt-1">
                {serviceCatalog.filter((item) => item.category === category).map((item, idx) => (
                  <motion.div
                    className="col-md-6 col-xl-4"
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="service-catalog-card h-100">
                      <img src={item.image} alt={item.title} className="service-catalog-image" />
                      <div className="service-catalog-body">
                        <span className="service-catalog-icon"><i className={`bi ${item.icon}`} /></span>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Questions Frequentes</h2>
          <div className="row g-3 mt-2">
            {faqs.map((item) => (
              <div className="col-md-6" key={item.q}>
                <div className="faq-item h-100">
                  <h6>{item.q}</h6>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container text-center">
          <h2>Besoin d un service specifique ?</h2>
          <p className="mb-4">Notre equipe vous oriente rapidement vers le service medical le plus adapte.</p>
          <Link to="/contact" className="btn btn-emergency" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('cmpf-open-book-panel')); }}>
            Demander une Prise en Charge
          </Link>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;



