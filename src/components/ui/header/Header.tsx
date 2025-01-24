import { useState } from 'react';
import { AppBar, Container, Toolbar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { Logo } from './Logo';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileDrawer } from './MobileDrawer';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Logo />
          
          {!isMobile && (
            <DesktopNavigation
              items={NAVIGATION_ITEMS}
              currentPath={pathname}
              onNavigate={handleNavigation}
            />
          )}

          {isMobile && (
            <IconButton
              color="primary"
              edge="end"
              onClick={toggleMobileMenu}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <MobileDrawer
        items={NAVIGATION_ITEMS}
        isOpen={isMobileMenuOpen}
        currentPath={pathname}
        onClose={toggleMobileMenu}
        onNavigate={handleNavigation}
      />
    </AppBar>
  );
};