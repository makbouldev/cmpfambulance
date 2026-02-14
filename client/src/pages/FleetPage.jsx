import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildWebPageSchema } from '../seo/schemas';

const coverage = ['Agadir', 'Casablanca', 'Fes', 'Laayoune', 'Marrakech', 'Meknes', 'Nador', 'Ouarzazate', 'Oujda', 'Rabat', 'Tanger', 'Tetouan'];

function FleetPage() {
  const { content } = useSiteData();

  return (
    <>
      <Seo
        title="Flotte Ambulance et Transport Medical"
        description="La flotte CMPF comprend ambulance urgence, ambulance medicalisee et transport specialise avec couverture dans plusieurs villes du Maroc."
        path="/fleet"
        image={content.fleet[0]?.image}
        keywords="flotte ambulance, transport medical maroc, ambulance medicalisee, couverture villes cmpf"
        structuredData={[
          buildWebPageSchema({
            name: 'Flotte CMPF Assistance',
            path: '/fleet',
            description: 'Moyens de transport medical CMPF et categories de prise en charge.'
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Flotte', path: '/fleet' }
          ])
        ]}
      />
      <section className="inner-hero inner-hero-fleet">
        <div className="container">
          <h1>Moyens de Transport Medical</h1>
          <p>Ambulance, transport medicalise et solutions specialisees pour urgence et hors urgence.</p>
        </div>
      </section>

      <section className="section fleet-section">
        <div className="container">
          <h2 className="section-title">Categories de Prise en Charge</h2>
          <div className="row g-4 mt-2">
            {content.fleet.map((item, idx) => (
              <motion.div className="col-12 col-lg-4" key={item.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="fleet-card h-100">
                  <img src={item.image} alt={item.name} className="img-fluid fleet-image" />
                  <div className="p-4">
                    <h5>{item.name}</h5>
                    <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos Villes</h2>
          <div className="row g-3 mt-2">
            {coverage.map((zone) => (
              <div className="col-sm-6 col-lg-3" key={zone}>
                <div className="coverage-item"><i className="bi bi-geo-alt-fill me-2" />{zone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Moyens et Prestations</h2>
          <div className="table-responsive mt-4">
            <table className="table cmpf-table">
              <thead><tr><th>Prestation</th><th>Urgence</th><th>Hors Urgence</th><th>Evenement</th></tr></thead>
              <tbody>
                <tr><td>Ambulance Medicalisee</td><td>Oui</td><td>Sur demande</td><td>Oui</td></tr>
                <tr><td>Ambulance avec Medecin</td><td>Selon gravite</td><td>Possible</td><td>Oui</td></tr>
                <tr><td>Couveuse / Transport special</td><td>Oui</td><td>Oui</td><td>Selon besoin</td></tr>
                <tr><td>Transport Dialyse</td><td>Programme</td><td>Oui</td><td>Non</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Qualite et Fiabilite</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-4"><div className="number-card h-100"><h4>Confort</h4><p>Ambulanciers qualifies et attentifs au bien-etre du patient.</p></div></div>
            <div className="col-md-4"><div className="number-card h-100"><h4>Securite</h4><p>Vehicules conventionnes, modernes et equipes pour chaque situation.</p></div></div>
            <div className="col-md-4"><div className="number-card h-100"><h4>Serenite</h4><p>Accompagnement fiable et continu de jour comme de nuit.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container text-center">
          <h2>Besoin d un transport medical adapte ?</h2>
          <p className="mb-4">La CMPF mobilise rapidement le moyen le plus approprie a votre situation.</p>
          <Link to="/contact" className="btn btn-emergency" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('cmpf-open-book-panel')); }}>Demander une Intervention</Link>
        </div>
      </section>
    </>
  );
}

export default FleetPage;

