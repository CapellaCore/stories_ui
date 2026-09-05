import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import {useTranslation} from "next-i18next";
import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateContactHreflangLinks, generateContactCanonicalUrl } from '../src/utils/hreflang';

interface ContactPageProps {
  locale?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ locale }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  
  // Generate hreflang links and canonical URL for SEO
  const hreflangLinks = generateContactHreflangLinks(currentLocale);
  const canonicalUrl = generateContactCanonicalUrl(currentLocale);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Supabase using the contact requests API
      const { contactRequestsApi } = await import('../src/services/supabase');
      await contactRequestsApi.create({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('contact.title')}</title>
        <meta name="title" content={t('contact.title')} />
        <meta name="description" content={t('contact.description')} />
        <meta name="keywords" content={t('contact.keywords')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links for SEO */}
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={t('contact.title')} />
        <meta property="og:description" content={t('contact.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Time to Sleep" />
        <meta property="og:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('contact.title')} />
        <meta property="twitter:description" content={t('contact.description')} />
        <meta property="twitter:site" content="@timetosleep" />
        <meta property="twitter:image" content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="author" content="Konstantin Dylko" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={currentLocale} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Us - Time to Sleep",
              "description": "Get in touch with us. We'd love to hear from you about our bedtime stories or any questions you might have.",
              "url": canonicalUrl,
              "mainEntity": {
                "@type": "Organization",
                "name": "Time to Sleep",
                "email": "timetosleep.org@gmail.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "timetosleep.org@gmail.com"
                }
              }
            })
          }}
        />

        {/* Breadcrumbs Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": t("common.home"),
                  "item": "https://timetosleep.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t("common.contact"),
                  "item": canonicalUrl
                }
              ]
            })
          }}
        />
      </Head>

      <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <SimpleHeader />
          
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              {/* Breadcrumbs */}
              <div className="px-4 py-3">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                          {t("common.home")}
                      </Link>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{t("common.contact")}</span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
              
              {/* Page Header */}
              <div className="px-4 mb-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {t("contact.pageTitle")}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {t("contact.joinUsDescription")}
                  </p>
                </div>
              </div>
              
              <div className="px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("contact.form.send")}</h2>
                    
                    {submitStatus === 'success' && (
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-800">{t("contact.form.successMessage")}</p>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-800">{t("contact.form.error")}</p>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("contact.form.nameLabel")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("contact.form.emailLabel")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("contact.form.subjectLabel")}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">{t("contact.subjectOptions.select")}</option>
                          <option value="general">{t("contact.subjectOptions.general")}</option>
                          <option value="feedback">{t("contact.subjectOptions.feedback")}</option>
                          <option value="suggestion">{t("contact.subjectOptions.suggestions")}</option>
                          <option value="technical">{t("contact.subjectOptions.technical")}</option>
                          <option value="partnership">{t("contact.subjectOptions.partnership")}</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("contact.form.messageLabel")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t("contact.form.messagePlaceholder")}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {isSubmitting ? t("contact.form.submitting") : t("contact.form.submitButton")}
                      </button>
                    </form>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("contact.info.getInTouch")}</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{t("contact.form.email")}</h3>
                          <p className="text-sm text-gray-600">timetosleep.org@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Owner</h3>
                          <p className="text-sm text-gray-600">Konstantin Dylko</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{t("contact.info.responseTime")}</h3>
                          <p className="text-sm text-gray-600">{t("contact.info.responseTimeValue")}</p>
                        </div>
                      </div>
                    </div>

                      <div className="mt-8 p-4 bg-gray-50 rounded-md">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                              {t("contact.help.title")}
                          </h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                              <li>• {t("contact.help.items.storySuggestions")}</li>
                              <li>• {t("contact.help.items.technicalIssues")}</li>
                              <li>• {t("contact.help.items.partnership")}</li>
                              <li>• {t("contact.help.items.generalQuestions")}</li>
                              <li>• {t("contact.help.items.privacyConcerns")}</li>
                          </ul>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
    return {
        props: {
            locale: locale || 'en',
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        }
    };
};


export default ContactPage;
