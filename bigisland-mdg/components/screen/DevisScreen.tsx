'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function DevisScreen() {
  const { t } = useTranslation('common');

  const initialValues = {
    fullName: '',
    email: '',
    company: '',
    message: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required(t('form.fullNameRequired', 'Nom complet requis')),
    email: Yup.string()
      .email(t('form.invalidEmail', 'Adresse email invalide'))
      .required(t('form.emailRequired', 'Adresse email requise')),
    company: Yup.string()
      .required(t('form.companyRequired', 'Entreprise requise')),
    message: Yup.string()
      .required(t('form.messageRequired', 'Message requis')),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    // Simuler une requête API
    console.log('Demande de devis envoyée :', values);
    alert('Votre demande a bien été envoyée !');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-24">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          {t('navbar.requestQuote')}
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-gray-700">
                {t('form.fullName', 'Nom complet')}
              </label>
              <Field
                id="fullName"
                name="fullName"
                className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              />
              <ErrorMessage name="fullName" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700">
                {t('form.email', 'Adresse email')}
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="company" className="block text-gray-700">
                {t('form.company', 'Entreprise')}
              </label>
              <Field
                id="company"
                name="company"
                className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              />
              <ErrorMessage name="company" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700">
                {t('form.message', 'Message')}
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              />
              <ErrorMessage name="message" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                {t('form.send', 'Envoyer')}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
