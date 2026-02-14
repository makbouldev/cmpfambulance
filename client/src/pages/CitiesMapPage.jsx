import { useMemo, useRef, useState } from 'react';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, buildWebPageSchema } from '../seo/schemas';
import { cityAgencies } from '../data/cityAgencies';

function CitiesMapPage() {
  const [selectedCitySlug, setSelectedCitySlug] = useState(() => cityAgencies[0]?.slug || '');
  const citiesMapSectionRef = useRef(null);
  const selectedCity = useMemo(() => cityAgencies.find((city) => city.slug === selectedCitySlug) || cityAgencies[0], [selectedCitySlug]);
  const selectedPhone = selectedCity.phones?.[0] || selectedCity.mobile || '';

  const mapSrc = useMemo(() => {
    const query = encodeURIComponent(selectedCity.address || `${selectedCity.name}, Morocco`);
    return `https://www.google.com/maps?q=${query}&z=11&output=embed`;
  }, [selectedCity]);

  const scrollToCityMap = () => {
    requestAnimationFrame(() => {
      citiesMapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <Seo
        title="Villes Couverte et Carte"
        description="Consultez les villes couvertes par CMPF Assistance et la carte de couverture medicale pour chaque ville au Maroc."
        path="/cities-map"
        keywords="villes ambulance maroc, carte couverture ambulance, cmpf agadir casablanca rabat"
        structuredData={[
          buildWebPageSchema({
            name: 'Carte de Couverture CMPF',
            path: '/cities-map',
            description: 'Carte de couverture medicale par ville pour les interventions CMPF.'
          }),
          buildBreadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Nos Villes', path: '/cities-map' }
          ])
        ]}
      />
      <section className="inner-hero inner-hero-map">
        <div className="container">
          <h1>Carte de Couverture Medicale</h1>
          <p>Selectionnez une ville et visualisez la zone de prise en charge de la CMPF.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Selectionner une Ville</h2>
          <div className="row g-3 mt-2">
            {cityAgencies.map((city) => (
              <div className="col-6 col-md-4 col-lg-3" key={city.slug}>
                <button
                  type="button"
                  className={`city-btn w-100 ${selectedCity.slug === city.slug ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCitySlug(city.slug);
                    scrollToCityMap();
                  }}
                >
                  <span className="city-name notranslate" translate="no">{city.name}</span>
                  <small>{city.region}</small>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-area" ref={citiesMapSectionRef}>
        <div className="container">
          <div className="row g-4 align-items-stretch">
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
                <p className="section-copy mb-3">
                  Contacts directs de l agence CMPF pour la prise en charge immediate.
                </p>
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
                            copy: `Contact immediate avec l agence de ${selectedCity.name}.`,
                            phone: selectedPhone,
                            email: selectedCity.email,
                            address: selectedCity.address,
                            message: `Bonjour CMPF, j ai besoin d une ambulance a ${selectedCity.name}.`
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
          <h2 className="section-title">Notes de Couverture</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-4"><div className="partner-card h-100"><h5>Prise en Charge Locale</h5><p>Intervention rapide vers les structures de soins de proximite.</p></div></div>
            <div className="col-md-4"><div className="partner-card h-100"><h5>Rapatriement Sanitaire</h5><p>Organisation d evacuations locoregionales ou rapatriements si la situation l exige.</p></div></div>
            <div className="col-md-4"><div className="partner-card h-100"><h5>Assistance Evenementielle</h5><p>Dispositif medical pour congres, salons, evenements sportifs, culturels et chantiers.</p></div></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CitiesMapPage;

