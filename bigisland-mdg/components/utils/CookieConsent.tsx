"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";

export default function CookieConsent() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-0 max-w-lg w-full sm:w-[400px] px-4 z-50"
        >
          <div className="bg-white border border-zinc-300 rounded-2xl shadow-lg p-4 flex items-start justify-between gap-4">
            {/* Texte */}
            <div className="flex items-start gap-2">
              <Cookie className="h-10 w-10 text-amber-300 mt-1" />
              <p className="text-sm text-gray-700">
                {t("cookie.message")}{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("cookie.policy")}
                </a>.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={acceptCookies}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                {t("cookie.accept")}
              </button>
              <button
                onClick={() => setVisible(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label={t("cookie.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

