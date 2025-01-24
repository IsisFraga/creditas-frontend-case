import type { NavigationItem } from '@/types/navigation.types';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface DrawerContentProps {
  items: NavigationItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const DrawerContent = ({ 
  items, 
  currentPath, 
  onNavigate 
}: DrawerContentProps) => (
  <List>
    {items.map(({ Icon, label, path }) => (
      <ListItem 
        key={path}
        onClick={() => onNavigate(path)}
        sx={{ 
          cursor: 'pointer',
          bgcolor: currentPath === path ? 'action.selected' : 'transparent'
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    ))}
  </List>
);