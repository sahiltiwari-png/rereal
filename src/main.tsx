import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import { Toaster as AppToaster } from './components/ui/toaster.tsx';
import { Toaster as SonnerToaster } from './components/ui/sonner.tsx';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ContactPage from './components/ContactPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import './index.css';
// AOS for subtle entrance animations
import 'aos/dist/aos.css';
import AOS from 'aos';
import TermsPage from './components/TermsPage.tsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.tsx';
import Joga from './components/Joga.tsx';
import OffPlanPage from './components/OffPlanPage.tsx';
import BuyPropertyPage from './components/BuyPropertyPage.tsx';
import ReadyToMovePage from './components/ReadyToMovePage.tsx';
import PropertyDetailsRoute from './components/PropertyDetailsRoute.tsx';
import RentPropertyPage from './components/RentPropertyPage.tsx';
import InternationalPropertiesPage from './components/InternationalPropertiesPage.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import GuidePage from './components/GuidePage.tsx';
import { AdminLayout } from './components/AdminLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Properties from './pages/Properties.tsx';
import AddProperty from './pages/AddProperty.tsx';
import Queries from './pages/Queries.tsx';
import NotFound from './pages/NotFound.tsx';
import Login from './pages/Login.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppToaster />
        <SonnerToaster />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          {/* Admin routes wrapped with AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/queries" element={<Queries />} />
          </Route>
        <Route
          path="/offplan"
          element={
            <>
              <OffPlanPage />
            </>
          }
        />
        <Route
          path="/buyproperty"
          element={
            <>
              <BuyPropertyPage />
            </>
          }
        />
        <Route
          path="/property/:slug"
          element={
            <>
              <PropertyDetailsRoute />
            </>
          }
        />
        <Route
          path="/readytomove"
          element={
            <>
              <ReadyToMovePage />
            </>
          }
        />
        <Route
          path="/rent"
          element={
            <>
              <RentPropertyPage />
            </>
          }
        />
        <Route
          path="/international"
          element={
            <>
              <InternationalPropertiesPage />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <ServicesPage />
            </>
          }
        />
        <Route
          path="/guide"
          element={
            <>
              <GuidePage />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <Navbar />
              <TermsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy"
          element={
            <>
              <Navbar />
              <PrivacyPolicyPage />
              <Footer />
            </>
          }
        />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    {/* <Joga/> */}
  </StrictMode>
);

// Initialize AOS with sensible defaults (no style changes)
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: false,
});
