import React from 'react';
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TranslationProvider } from './contexts/TranslationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import StoriesPage from './pages/StoriesPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import Sitemap from './components/Sitemap';
import ErrorBoundary from './components/ErrorBoundary';
import StoriesByTagSection from "./pages/StoriesByTagPage";

const StoriesByTagWrapper = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  return <StoriesByTagSection tagSlug={tagSlug!} showAll={true} />;
};

function App() {
  return (
    <TranslationProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <Router>
            <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
              <div className="layout-container flex h-full grow flex-col">
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/stories" element={<StoriesPage />} />
                  <Route path="/stories/:tagSlug" element={<StoriesByTagWrapper />} />
                  <Route path="/stories/:tagSlug/:storySlug" element={<StoryPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/sitemap.xml" element={<Sitemap format="xml" />} />
                  <Route path="/sitemap.json" element={<Sitemap format="json" />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </Router>
        </ErrorBoundary>
      </HelmetProvider>
    </TranslationProvider>
  );
}

export default App; 