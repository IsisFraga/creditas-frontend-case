import type { NavigationItem } from '@/types/navigation.types';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Simulador', path: '/', Icon: HomeIcon },
  { label: 'Análises', path: '/analysis', Icon: InsightsIcon },
];