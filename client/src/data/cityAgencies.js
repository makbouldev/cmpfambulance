export const cityAgencies = [
  {
    slug: 'agadir',
    code: '01',
    name: 'Agadir',
    region: 'Souss-Massa',
    address: '4, Bd Mohammed V - Immeuble Mauritania - Agadir',
    phones: ['+212 5 28 84 06 26', '+212 5 28 82 44 96', '+212 5 28 84 78 94'],
    mobile: '+212 6 62 02 82 49',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '8-12 min',
    heroImage: ''
  },
  {
    slug: 'casablanca',
    code: '02',
    name: 'Casablanca',
    region: 'Casablanca-Settat',
    address: '56, Avenue Mers Sultan - Casablanca',
    phones: ['+212 5 22 49 16 16'],
    mobile: '+212 6 61 50 27 63',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '7-10 min',
    heroImage: ''
  },
  {
    slug: 'fes',
    code: '03',
    name: 'Fes',
    region: 'Fes-Meknes',
    address: '1, Bd Moulay Rachid Route De Sefrou - Fes',
    phones: ['+212 5 35 73 42 38', '+212 5 35 76 66 32'],
    mobile: '+212 6 61 79 95 69',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '10-14 min',
    heroImage: ''
  },
  {
    slug: 'laayoune',
    code: '04',
    name: 'Laayoune',
    region: 'Laayoune-Sakia El Hamra',
    address: '19, Bd Brahim El Mazini Hay El Fath - Laayoune',
    phones: ['+212 5 28 99 76 01', '+212 5 28 89 25 04'],
    mobile: '+212 6 78 98 90 04',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '12-16 min',
    heroImage: ''
  },
  {
    slug: 'marrakech',
    code: '05',
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    address: '18, Rue Tarek Ibnou Zyad Gueliz - Marrakech',
    phones: ['+212 5 24 44 84 51', '+212 5 24 43 18 55', '+212 5 24 37 90 57'],
    mobile: '+212 6 62 01 81 98',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '8-12 min',
    heroImage: ''
  },
  {
    slug: 'meknes',
    code: '06',
    name: 'Meknes',
    region: 'Fes-Meknes',
    address: '8, Rue Antsirabe Hamria - Meknes',
    phones: ['+212 5 35 52 09 14', '+212 5 35 51 73 87', '+212 5 35 52 01 94'],
    mobile: '+212 6 62 03 14 97',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '10-14 min',
    heroImage: ''
  },
  {
    slug: 'nador',
    code: '07',
    name: 'Nador',
    region: 'Oriental',
    address: '6, Rte Zghanghane Quartier Ouled Mimoun - Nador',
    phones: ['+212 5 36 32 08 77', '+212 5 36 33 01 28'],
    mobile: '+212 6 62 03 01 79',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '11-15 min',
    heroImage: ''
  },
  {
    slug: 'ouarzazate',
    code: '08',
    name: 'Ouarzazate',
    region: 'Draa-Tafilalet',
    address: '60, Lot Centre - Ouarzazate',
    phones: ['+212 5 24 88 56 67', '+212 5 24 88 44 31', '+212 5 24 88 56 68'],
    mobile: '+212 6 61 85 65 13',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '12-16 min',
    heroImage: ''
  },
  {
    slug: 'oujda',
    code: '09',
    name: 'Oujda',
    region: 'Oriental',
    address: '5, Rue Ibnou Nafiss - Oujda',
    phones: ['+212 5 36 70 30 25', '+212 5 36 70 30 21'],
    mobile: '+212 6 61 08 84 13',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '10-14 min',
    heroImage: ''
  },
  {
    slug: 'rabat',
    code: '10',
    name: 'Rabat',
    region: 'Rabat-Sale-Kenitra',
    address: '5, Rue Soussa - Rabat',
    phones: ['+212 5 37 70 60 17', '+212 5 37 73 61 01', '+212 5 37 73 47 02'],
    mobile: '+212 6 61 08 84 44',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '7-10 min',
    heroImage: ''
  },
  {
    slug: 'tanger',
    code: '11',
    name: 'Tanger',
    region: 'Tanger-Tetouan-Al Hoceima',
    address: '42, Rue Al Mansour Addahbi - Tanger',
    phones: ['+212 5 39 94 10 27', '+212 5 39 94 11 97'],
    mobile: '+212 6 61 08 84 40',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '8-12 min',
    heroImage: ''
  },
  {
    slug: 'tetouan',
    code: '12',
    name: 'Tetouan',
    region: 'Tanger-Tetouan-Al Hoceima',
    address: '30, Residence Ennasr Rue Saadia Hay Touta - Tetouan',
    phones: ['+212 5 39 97 40 88', '+212 5 39 99 18 18', '+212 5 39 97 14 82'],
    mobile: '+212 6 62 02 21 08',
    email: 'cmpfcasa@cmpfassistance.ma',
    responseTime: '10-14 min',
    heroImage: ''
  }
];

export const getCityAgencyBySlug = (slug) => cityAgencies.find((city) => city.slug === slug);

