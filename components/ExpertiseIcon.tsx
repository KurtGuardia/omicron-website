import {Building2, Coins, Landmark, Leaf, Network, Pickaxe, Sprout, Sun} from 'lucide-react';
const icons: Record<string, typeof Leaf> = {
  'Climate, Natural Resources & Water': Leaf,
  'Sustainable Trade, Competitiveness & Value Chains': Network,
  'Rural & Territorial Development': Sprout,
  'Sustainable Finance': Coins,
  'Responsible Mining': Pickaxe,
  'Renewable Energy': Sun,
  'Infrastructure & Basic Services': Building2,
  'Governance & Institutional Development': Landmark,
};
export function ExpertiseIcon({subject, size = 16}: {subject: string; size?: number}) {
  const Icon = icons[subject] || Leaf;
  return <Icon size={size} aria-hidden="true"/>;
}
