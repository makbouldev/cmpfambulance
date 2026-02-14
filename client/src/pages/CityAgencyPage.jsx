import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildWebPageSchema } from '../seo/schemas';
import { cityAgencies, getCityAgencyBySlug } from '../data/cityAgencies';

function CityAgencyPage() {
  const { citySlug } = useParams();
  const city = useMemo(() => getCityAgencyBySlug(citySlug), [citySlug]);

  if (!city) {
    return <Navigate to="/cities-map" replace />;
  }

  const mapQuery = city.address || `${city.name}, Morocco`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`;
  const telMain = city.phones?.[0] || city.mobile;
  const telMainDigits = (telMain || '').replace(/[^\d+]/g, '');
  const mobileDigits = (city.mobile || '').replace(/[^\d+]/g, '');

  return (
    <>
      <Seo
        title={`Agence CMPF ${city.name}`}
        description={`Agence CMPF Assistance ${city.name}: assistance medicale 24/7, intervention rapide, transport medical et rapatriement sanitaire.`}
        path={`/agences/${city.slug}`}
        image={city.heroImage}
        keywords={`ambulance ${city.name.toLowerCase()}, agence cmpf ${city.name.toLowerCase()}, transport medical ${city.name.toLowerCase()}`}
        structuredData={[
          buildWebPageSchema({
            name: `Agence CMPF ${city.name}`,
            path: `/agences/${city.slug}`,
            description: `Informations de l agence CMPF a ${city.name}.`
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Agences', path: '/cities-map' },
            { name: city.name, path: `/agences/${city.slug}` }
          ])
        ]}
      />

      <section className="inner-hero city-agency-hero" style={{ backgroundImage: `url(${city.heroImage})` }}>
        <div className="city-agency-hero-overlay" />
        <div className="container position-relative">
          <h1>Agence CMPF {city.name}</h1>
          <p>Assistance medicale rapide, equipe encadree et intervention 24/7 dans la region {city.region}.</p>
        </div>
      </section>

      <section className="section city-agency-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="agency-main-card h-100">
                <h2 className="section-title text-start mb-3">Agence {city.code} - {city.name}</h2>
                <p className="section-copy mb-3">
                  Notre agence CMPF a {city.name} coordonne les interventions d urgence et hors urgence avec une cellule
                  de dispatch active 24/7, des ambulanciers qualifies et des moyens adaptes a chaque situation.
                </p>
                <ul className="check-list mb-3">
                  <li><strong>Region:</strong> {city.region}</li>
                  <li><strong>Adresse:</strong> {city.address}</li>
                  <li><strong>Temps moyen de reponse:</strong> {city.responseTime}</li>
                  <li><strong>Services:</strong> ambulance medicalisee, medecin/infirmier, transport dialyse, rapatriement</li>
                </ul>
                <div className="agency-contact-row">
                  <button
                    type="button"
                    className="btn btn-emergency"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('cmpf-open-book-panel', {
                          detail: {
                            title: `Agence CMPF ${city.name}`,
                            copy: `Contactez immediatement l agence de ${city.name}. Notre equipe locale repond 24/7 pour urgence, transfert et assistance medicale.`,
                            phone: telMain,
                            email: city.email
                          }
                        })
                      )
                    }
                  >
                    <i className="bi bi-telephone-fill me-2" />Appeler l Agence
                  </button>
                  <a href={`https://wa.me/${mobileDigits.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-success">
                    <i className="bi bi-whatsapp me-2" />WhatsApp Mobile
                  </a>
                  <a href={`mailto:${city.email}`} className="btn btn-outline-primary">
                    <i className="bi bi-envelope-fill me-2" />Email Agence
                  </a>
                  <a href={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer" className="btn btn-outline-secondary">
                    <i className="bi bi-geo-alt-fill me-2" />Localiser
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="agency-side-card h-100">
                <h5 className="mb-3">Contact Local</h5>
                <p className="mb-2"><i className="bi bi-geo-alt-fill me-2" />{city.address}</p>
                {city.phones?.map((phone) => (
                  <p className="mb-2" key={phone}>
                    <i className="bi bi-telephone-fill me-2" />
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                  </p>
                ))}
                <p className="mb-2"><i className="bi bi-phone-fill me-2" /><a href={`tel:${mobileDigits}`}>{city.mobile}</a></p>
                <p className="mb-2"><i className="bi bi-envelope-fill me-2" />{city.email}</p>
                <p className="mb-0"><i className="bi bi-clock-fill me-2" />Disponibilite 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-area">
        <div className="container">
          <h2 className="section-title">Carte de Couverture - {city.name}</h2>
          <div className="map-frame-wrap mt-4">
            <iframe title={`Carte ${city.name}`} src={mapSrc} className="city-map-frame" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Autres Agences CMPF</h2>
          <div className="row g-3 mt-2">
            {cityAgencies.filter((item) => item.slug !== city.slug).map((item) => (
              <div className="col-6 col-md-4 col-lg-3" key={item.slug}>
                <Link to={`/agences/${item.slug}`} className="city-btn w-100 text-decoration-none">
                  <span className="city-name">{item.name}</span>
                  <small>{item.region}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CityAgencyPage;

