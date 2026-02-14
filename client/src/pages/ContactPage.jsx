import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSiteData } from '../context/SiteDataContext';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from '../seo/schemas';

const faqs = [
  { q: 'Intervenez-vous uniquement en urgence ?', a: 'Non, la CMPF intervient aussi pour les cas hors urgence et les besoins programmes.' },
  { q: 'Proposez-vous medecin/infirmier a domicile ?', a: 'Oui, selon besoin nous mobilisons medecin, infirmier(e) et intervenants paramedicaux.' },
  { q: 'Assurez-vous la couverture des evenements ?', a: 'Oui, avec ambulance(s), infirmerie mobile et equipe medicale sur toute la duree.' },
  { q: 'Pouvez-vous traiter un dossier administratif rapidement ?', a: 'Oui, nous procedons avec rapidite pour reunir les pieces et finaliser les demarches.' }
];

function ContactPage() {
  const { content, apiBaseUrl } = useSiteData();
  const phones = Array.isArray(content.phones) && content.phones.length ? content.phones : [content.phone];
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const onInput = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post(`${apiBaseUrl}/api/contact`, formState);
      setStatusMessage(response.data.message);
      setFormState({ name: '', phone: '', message: '' });
    } catch (error) {
      setStatusMessage(error?.response?.data?.message || 'Echec de la demande. Merci de nous appeler directement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Ambulance 24/7"
        description="Contactez CMPF Assistance pour une prise en charge medicale urgente ou programmee. Appel et WhatsApp disponibles 24/7."
        path="/contact"
        keywords="contact ambulance, numero ambulance cmpf, urgence medicale maroc, assistance 24 7"
        structuredData={[
          buildWebPageSchema({
            name: 'Contact CMPF Assistance',
            path: '/contact',
            description: 'Formulaire et coordonnees pour demander une assistance medicale immediate.'
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Contact', path: '/contact' }
          ]),
          buildFaqSchema(faqs)
        ]}
      />
      <section className="inner-hero inner-hero-contact">
        <div className="container">
          <h1>Contact et Demande de Prise en Charge</h1>
          <p>Sur simple appel, la CMPF active l assistance medicale adaptee a votre situation.</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title text-start">Formulaire d Assistance</h2>
              <p className="section-copy">Decrivez le besoin (urgence, transfert, domicile, evenement). Notre equipe vous contacte rapidement.</p>
              <div className="contact-info">
                {phones.map((phone) => (
                  <div key={phone}><i className="bi bi-telephone-fill me-2" />{phone}</div>
                ))}
                <div><i className="bi bi-envelope-fill me-2" />{content.email}</div>
                <div><i className="bi bi-clock-fill me-2" />Disponibilite continue 24/7</div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-form" onSubmit={onSubmit}>
                <input name="name" value={formState.name} onChange={onInput} placeholder="Nom Complet" required />
                <input name="phone" value={formState.phone} onChange={onInput} placeholder="Telephone" required />
                <textarea name="message" value={formState.message} onChange={onInput} placeholder="Type de besoin / adresse / informations medicales utiles" rows="5" />
                <button type="submit" className="btn btn-emergency w-100" disabled={loading}>{loading ? 'Envoi en cours...' : 'Envoyer la Demande'}</button>
                {statusMessage && <div className="status-message mt-3">{statusMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Apres Votre Demande</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-4"><div className="long-card h-100"><h5>1. Evaluation</h5><p>Notre equipe evalue l urgence et prepare le type d intervention approprie.</p></div></div>
            <div className="col-md-4"><div className="long-card h-100"><h5>2. Mobilisation</h5><p>Ambulance, medecin, infirmier, transport special ou dispositif evenementiel.</p></div></div>
            <div className="col-md-4"><div className="long-card h-100"><h5>3. Suivi</h5><p>Accompagnement du patient, demarches administratives et coordination medicale.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Questions Courantes</h2>
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
          <h2>Besoin d informations sur nos moyens ?</h2>
          <p className="mb-4">Consultez la page flotte pour voir les categories de prise en charge et la couverture.</p>
          <Link to="/fleet" className="btn btn-emergency">Voir la Flotte</Link>
        </div>
      </section>
    </>
  );
}

export default ContactPage;

