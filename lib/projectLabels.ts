import {mapCountries} from '@/data/mapCountries';
export const countryCode = (name: string) => Object.entries(mapCountries).find(([,country]) => country.queryCountry === name)?.[0];
export const regionKey: Record<string,string> = {'Región Andina':'regionAndean',Centroamérica:'regionCentral',Caribe:'regionCaribbean','América Latina':'regionLatinAmerica',Asia:'regionAsia','África':'regionAfrica'};
// Canonical V4 taxonomy values remain untouched in project records and URLs.
// Index i is labelled by Home.expertise.items.i / Home.services.items.i; order is the Home and filter display order.
export const expertiseValues = ['Climate, Natural Resources & Water','Sustainable Trade, Competitiveness & Value Chains','Rural & Territorial Development','Sustainable Finance','Responsible Mining','Renewable Energy','Infrastructure & Basic Services','Governance & Institutional Development'];
export const serviceValues = ['Strategy & Project Design','Monitoring, Evaluation & Learning','Institutional & Organizational Development','Technical Assistance & Implementation','Facilitation & Participatory Processes','Knowledge Management & Capacity Building','Digital Transformation & Solutions','Financial Structuring'];
