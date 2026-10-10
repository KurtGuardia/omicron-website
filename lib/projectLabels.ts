import {mapCountries} from '@/data/mapCountries';
export const countryCode = (name: string) => Object.entries(mapCountries).find(([,country]) => country.queryCountry === name)?.[0];
export const regionKey: Record<string,string> = {'Región Andina':'regionAndean',Centroamérica:'regionCentral',Caribe:'regionCaribbean'};
