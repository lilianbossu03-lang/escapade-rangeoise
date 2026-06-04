"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../actions";
import { Anchor, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gold text-primary font-lato font-bold py-3 rounded-xl hover:bg-[#cc9430] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Connexion…
        </>
      ) : (
        "Se connecter"
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, { error: null });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Anchor className="w-8 h-8 text-gold" />
            <span className="font-playfair text-2xl font-bold text-primary">
              L'Escapade Rangeoise
            </span>
          </div>
          <p className="font-lato text-sm text-gray-500">Espace administration</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="font-playfair text-2xl text-primary mb-6">Connexion</h1>

          <form action={formAction} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@escapade.fr"
                  defaultValue=""
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-lato text-base focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl font-lato text-base focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-lato text-sm rounded-xl px-4 py-3">
                {state.error}
              </div>
            )}

            <SubmitButton />
          </form>
        </div>

        <p className="text-center font-lato text-xs text-gray-400 mt-6">
          Accès réservé à l'administratrice du site
        </p>
      </div>
    </div>
  );
}
