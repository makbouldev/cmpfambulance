import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildWebPageSchema } from '../seo/schemas';

const missions = [
  { city: 'Casablanca', type: 'Transfert vers structure de soins', time: 'Rapide' },
  { city: 'Rabat', type: 'Rapatriement sanitaire avec equipe medicale', time: 'Coordonne' },
  { city: 'Marrakech', type: 'Transport dialyse programme', time: 'Ponctuel' },
  { city: 'Tanger', type: 'Couverture evenementielle medicale', time: 'Continu' }
];

function GalleryPage() {
  const { content, apiBaseUrl } = useSiteData();
  const resolveImage = (value) => {
    if (!value) return '/5.jpeg';
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  return (
    <>
      <Seo
        title="Galerie Interventions Ambulance"
        description="Galerie des interventions CMPF Assistance: transport medical, assistance sur site, rapatriement et missions medicales au Maroc."
        path="/gallery"
        image={content.gallery[0]}
        keywords="galerie ambulance, interventions medicales, cmpf photos, ambulance maroc"
        structuredData={[
          buildWebPageSchema({
            name: 'Galerie CMPF Assistance',
            path: '/gallery',
            description: 'Photos et missions realisees par CMPF Assistance.'
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Galerie', path: '/gallery' }
          ])
        ]}
      />
      <section className="inner-hero inner-hero-gallery">
        <div className="container">
          <h1>Galerie et Interventions</h1>
          <p>Exemples d interventions medicales, transport et assistance assures par la CMPF.</p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <h2 className="section-title">Scenes d Intervention</h2>
          <div className="gallery-grid mt-4">
            {content.gallery.concat(content.gallery).map((image, idx) => (
              <motion.div className="gallery-item" key={`${image}-${idx}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx % 6) * 0.05 }}>
                <img src={resolveImage(image)} alt={`Intervention CMPF ${idx + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Missions Realisees</h2>
          <div className="row g-4 mt-2">
            {missions.map((mission) => (
              <div key={`${mission.city}-${mission.type}`} className="col-md-6 col-lg-3">
                <div className="timeline-card h-100">
                  <h6>{mission.city}</h6>
                  <p>{mission.type}</p>
                  <span className="timeline-no">{mission.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Temoignages</h2>
          <div className="row g-4 mt-2">
            {content.testimonials.map((person) => (
              <div className="col-12 col-lg-4" key={person.name}>
                <div className="testimonial-card h-100">
                  <p>"{person.text}"</p>
                  <h6>{person.name}</h6>
                  <small>{person.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container text-center">
          <h2>Besoin d une intervention CMPF ?</h2>
          <p className="mb-4">La CMPF assure une prise en charge medicale immediate sur simple appel.</p>
          <Link to="/contact" className="btn btn-emergency" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('cmpf-open-book-panel')); }}>Contacter le Standard</Link>
        </div>
      </section>
    </>
  );
}

export default GalleryPage;

