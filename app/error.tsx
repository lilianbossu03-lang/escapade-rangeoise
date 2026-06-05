"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur capturée:", error);
  }, [error]);

  return (
    <div
      className="min-h-[100dvh] bg-sand flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "var(--font-lato, system-ui, sans-serif)" }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8" aria-hidden="true">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e3a637"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-playfair text-3xl sm:text-4xl text-primary font-bold mb-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          Une vague imprévue
          <br />
          <span className="italic font-normal text-2xl sm:text-3xl">
            est passée par là
          </span>
        </h1>

        {/* Message */}
        <p
          className="font-lato text-gray-600 text-base leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-lato, system-ui, sans-serif)" }}
        >
          Quelque chose n'a pas fonctionné comme prévu. Ce n'est pas de votre
          faute — nous travaillons à remettre tout en ordre. En attendant,
          essayez de recharger la page ou revenez à l'accueil.
        </p>

        {/* Digest discret */}
        {error.digest && (
          <p className="font-lato text-xs text-gray-300 mb-8">
            Code de référence : {error.digest}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-[#cc9430] transition-all duration-200 hover:scale-105 min-h-[44px] cursor-pointer"
            style={{ fontFamily: "var(--font-lato, system-ui, sans-serif)" }}
          >
            Réessayer
          </button>
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary/30 text-primary font-semibold px-8 py-3.5 rounded-full hover:border-primary transition-all duration-200 min-h-[44px]"
            style={{ fontFamily: "var(--font-lato, system-ui, sans-serif)" }}
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
