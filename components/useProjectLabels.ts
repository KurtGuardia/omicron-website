'use client';
import {useTranslations} from 'next-intl';
import type {Project} from '@/types/project';
import {regionKey, expertiseValues, serviceValues} from '@/lib/projectLabels';
export function useProjectLabels() {
  const home = useTranslations('Home');
  const countries = useTranslations('Countries');
  const experience = useTranslations('Experience');
  const expertise = (value:string) => {const index=expertiseValues.indexOf(value);if(index<0)throw new Error(`Unknown project expertise identifier: ${value}`);return home(`expertise.items.${index}`);};
  const service = (value:string) => {const index=serviceValues.indexOf(value);if(index<0)throw new Error(`Unknown project service identifier: ${value}`);return home(`services.items.${index}`);};
  // Accepts an ISO country code or a region name (regional work is never assigned to countries).
  const geography = (value:string) => countries.has(value) ? countries(value) : regionKey[value] ? experience(regionKey[value]) : value;
  const location = (project:Project) => [...project.countries.map((name,index)=>geography(project.countryIso[index] || name)),...(project.regions || []).map(geography)].join(', ');
  return {expertise,service,geography,location};
}
