import { Drawer } from '@mui/material';
import { DRAWER_WIDTH } from '@/constants/theme';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContent } from './DrawerContent';
import type { NavigationItem } from '@/types/navigation.types';

interface MobileDrawerProps {
  items: NavigationItem[];
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const MobileDrawer = ({ 
  items, 
  isOpen, 
  currentPath, 
  onClose, 
  onNavigate 
}: MobileDrawerProps) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={onClose}
    ModalProps={{ keepMounted: true }}
    sx={{
      display: { xs: 'block', sm: 'none' },
      '& .MuiDrawer-paper': { width: DRAWER_WIDTH }
    }}
  >
    <DrawerHeader onClose={onClose} />
    <DrawerContent 
      items={items} 
      currentPath={currentPath} 
      onNavigate={onNavigate} 
    />
  </Drawer>
);