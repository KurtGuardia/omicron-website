'use client';
import {useTranslations} from 'next-intl';
import type {Project} from '@/types/project';
import {countryCode, regionKey, expertiseValues, serviceValues} from '@/lib/projectLabels';
export function useProjectLabels() {
  const home = useTranslations('Home');
  const countries = useTranslations('Countries');
  const experience = useTranslations('Experience');
  const expertise = (value:string) => {const index=expertiseValues.indexOf(value);if(index<0)throw new Error(`Unknown project expertise identifier: ${value}`);return home(`expertise.items.${index}`);};
  const service = (value:string) => {const index=serviceValues.indexOf(value);if(index<0)throw new Error(`Unknown project service identifier: ${value}`);return home(`services.items.${index}`);};
  const geography = (value:string) => {const code=countryCode(value);return code?countries(code):regionKey[value]?experience(regionKey[value]):value;};
  const location = (project:Project) => [...project.countries.map((name,index)=>{const code=project.countryIso[index];return code&&countries.has(code)?countries(code):geography(name);}),...(project.regions || []).map(geography)].join(', ');
  return {expertise,service,geography,location};
}
