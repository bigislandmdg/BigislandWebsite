import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span>contact@bigislandmdg.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-blue-400" />
                <span>+261 34 00 000 00</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Antananarivo, Madagascar</span>
              </div>
            </div>
          </div>

          {/* EXPERTISE */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Expertise</h3>
            <ul className="space-y-2 text-sm">
              <li>Solutions IT</li>
              <li>Location de voitures</li>
              <li>Call center & Externalisation</li>
              <li>Fournisseurs de produits divers</li>
            </ul>
          </div>

          {/* ENTREPRISE */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-blue-400">Blog</a></li>
              <li><a href="/services" className="hover:text-blue-400">Services</a></li>
              <li><a href="/temoignages" className="hover:text-blue-400">Témoignages</a></li>
              <li><a href="/projets" className="hover:text-blue-400">Projets</a></li>
              <li><a href="/cgu" className="hover:text-blue-400">CGU</a></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Inscrivez-vous à notre newsletter</h3>
             <form className="flex flex-row items-center space-x-2">
  <input
    type="email"
    placeholder="Votre adresse email"
    className="p-1 rounded-md text-gray-800 flex-1 w-40"
  />
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm whitespace-nowrap"
  >
    S'abonner
  </button>
</form>

            <div className="flex justify-start space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="text-center mt-10 text-sm text-gray-400 border-t pt-4 border-gray-600">
          © {new Date().getFullYear()} BigIslandMDG. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
