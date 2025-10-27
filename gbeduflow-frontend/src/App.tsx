import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import { useAuthStore } from './stores/authStore';

// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ArtistRegistration = lazy(() => import('./pages/ArtistRegistration'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Monetization = lazy(() => import('./pages/Monetization'));
const StudentOnboarding = lazy(() => import('./components/auth/StudentOnboarding'));

function App() {
  const { } = useAuthStore();
  const [currentPage, setCurrentPage] = useState('landing');

  // Simple routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'landing');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'monetization':
        return <Monetization />;
      case 'artists/register':
        return <ArtistRegistration />;
      case 'onboarding':
        return <StudentOnboarding />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <LoadingSpinner size="lg" text="Loading page..." className="min-h-[400px]" />
        }>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;