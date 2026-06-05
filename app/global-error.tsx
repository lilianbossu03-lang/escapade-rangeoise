"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur globale capturée:", error);
  }, [error]);

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Erreur — L'Escapade Rangeoise</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: "0 16px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#efe3c9",
          fontFamily: "system-ui, sans-serif",
          color: "#232951",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          {/* Logo texte de secours */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e3a637",
              marginBottom: 32,
            }}
          >
            L'Escapade Rangeoise
          </p>

          {/* Icon triangle */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(227,166,55,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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

          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            Une vague imprévue est passée par là
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Quelque chose n'a pas fonctionné. Essayez de recharger la page ou
            revenez à l'accueil.
          </p>

          {error.digest && (
            <p style={{ fontSize: 11, color: "#bbb", marginBottom: 28 }}>
              Code de référence : {error.digest}
            </p>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button
              onClick={reset}
              style={{
                background: "#e3a637",
                color: "#232951",
                border: "none",
                borderRadius: 99,
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                minWidth: 180,
                minHeight: 44,
              }}
            >
              Réessayer
            </button>
            <a
              href="/"
              style={{
                color: "#232951",
                fontSize: 14,
                textDecoration: "underline",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
              }}
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
