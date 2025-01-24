import type { NavigationItem } from '@/types/navigation.types';
import { Tabs, Tab } from '@mui/material';

interface DesktopNavigationProps {
  items: NavigationItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const DesktopNavigation = ({ 
  items, 
  currentPath, 
  onNavigate 
}: DesktopNavigationProps) => (
  <Tabs 
    value={currentPath} 
    onChange={(_e, value) => onNavigate(value)}
    sx={{ 
      '& .MuiTab-root': { 
        textTransform: 'none',
        minWidth: 'auto',
        px: 3
      }
    }}
  >
    {items.map(({ label, path }) => (
      <Tab 
        key={path}
        label={label}
        value={path}
      />
    ))}
  </Tabs>
);