import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ContactPage from './components/ContactPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import './index.css';
import TermsPage from './components/TermsPage.tsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.tsx';
import Joga from './components/Joga.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
      </Routes>
    </BrowserRouter> */}
    <Joga/>
  </StrictMode>
);
