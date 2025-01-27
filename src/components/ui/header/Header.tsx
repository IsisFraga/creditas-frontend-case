import { useState } from 'react';
import { AppBar, Container, Toolbar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Sun, Moon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { Logo } from './Logo';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileDrawer } from './MobileDrawer';
import { useTheme as useCustomTheme } from '@/app/layout-provider';
import Link from 'next/link';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
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
        backgroundColor: theme.palette.background.paper,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" aria-label="Ir para homepage" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <DesktopNavigation
                items={NAVIGATION_ITEMS}
                currentPath={pathname}
                onNavigate={handleNavigation}
              />
              <IconButton 
                onClick={toggleTheme}
                sx={{ ml: 2 }}
                color="primary"
              >
                {mode === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </IconButton>
            </div>
          )}

          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={toggleTheme}
                color="primary"
              >
                {mode === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </IconButton>
              <IconButton
                color="primary"
                edge="end"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            </div>
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