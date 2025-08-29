'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function DevisScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const initialValues = {
    fullName: '',
    email: '',
    company: '',
    message: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('form.fullNameRequired', 'Nom complet requis')),
    email: Yup.string()
      .email(t('form.invalidEmail', 'Adresse email invalide'))
      .required(t('form.emailRequired', 'Adresse email requise')),
    company: Yup.string().required(t('form.companyRequired', 'Entreprise requise')),
    message: Yup.string().required(t('form.messageRequired', 'Message requis')),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Demande de devis envoyée :', values);
    alert('Votre demande a bien été envoyée !');
  };

  return (
    <main className="bg-white min-h-screen">
      {/* ===== Hero Banner ===== */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-blue-500 flex items-center justify-center text-center">
        <div className="px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t('navbar.requestQuote')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {t('quotePage.subtitle', 'Obtenez une estimation rapide et adaptée à vos besoins.')}
          </motion.p>
        </div>
      </div>

      {/* ===== Quote Section Split ===== */}
      <section className="relative isolate bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 shadow-xl rounded-2xl overflow-hidden">
          {/* Left Panel - Infos */}
          <div className="relative bg-blue-600 px-6 py-12 sm:py-16 sm:px-12 lg:px-16 flex flex-col justify-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-90"></div>
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t('quotePage.title', 'Demande de Devis')}
              </h2>
              <p className="mt-4 text-base leading-7 text-blue-100">
                {t('quotePage.description', 'Nous vous aidons à trouver la solution idéale pour votre entreprise.')}
              </p>

              <dl className="mt-8 space-y-6 text-base leading-7 text-blue-100">
                <div className="flex gap-x-4">
                  <dd>📧 devis@exemple.com</dd>
                </div>
                <div className="flex gap-x-4">
                  <dd>📞 +261 34 12 345 67</dd>
                </div>
                <div className="flex gap-x-4">
                  <dd>📍 Antananarivo, Madagascar</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Panel - Form */}
          <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white px-6 py-12 sm:py-16 sm:px-12 lg:px-16"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">
                    {t('form.fullName', 'Nom complet')}
                  </label>
                  <Field
                    name="fullName"
                    placeholder="John Doe"
                    className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">
                    {t('form.email', 'Adresse email')}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-gray-900">
                    {t('form.company', 'Entreprise')}
                  </label>
                  <Field
                    name="company"
                    placeholder="Nom de l’entreprise"
                    className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="company" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-gray-900">
                    {t('form.message', 'Message')}
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Votre demande..."
                    className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="message" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div className="sm:col-span-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-700"
                  >
                    {t('form.send', 'Envoyer')}
                  </motion.button>
                </div>
              </Form>
            </Formik>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

