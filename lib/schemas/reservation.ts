import { z } from "zod";

export const reservationSchema = z
  .object({
    logement_id: z
      .string()
      .uuid({ message: "Veuillez sélectionner un logement valide." }),
    logement_nom: z.string().min(1),
    date_arrivee: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'arrivée invalide." }),
    date_depart: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date de départ invalide." }),
    nb_adultes: z
      .number()
      .int()
      .min(1, { message: "Au moins 1 adulte est requis." })
      .max(20, { message: "Maximum 20 adultes." }),
    nb_enfants: z
      .number()
      .int()
      .min(0)
      .max(20, { message: "Maximum 20 enfants." }),
    nom_client: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
      .max(100, { message: "Le nom est trop long." }),
    email_client: z.string().email({ message: "Adresse email invalide." }),
    telephone_client: z
      .string()
      .regex(/^[\d\s\+\-\(\)\.]{7,20}$/, {
        message: "Numéro de téléphone invalide.",
      })
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .max(2000, { message: "Le message ne peut pas dépasser 2000 caractères." })
      .optional(),
  })
  .refine((data) => new Date(data.date_depart) > new Date(data.date_arrivee), {
    message: "La date de départ doit être après la date d'arrivée.",
    path: ["date_depart"],
  })
  .refine(
    (data) => {
      const nights = Math.round(
        (new Date(data.date_depart).getTime() -
          new Date(data.date_arrivee).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return nights >= 2;
    },
    {
      message: "La durée minimale de séjour est de 2 nuits.",
      path: ["date_depart"],
    }
  )
  .refine(
    (data) => {
      const arrivee = new Date(data.date_arrivee);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return arrivee >= today;
    },
    {
      message: "La date d'arrivée ne peut pas être dans le passé.",
      path: ["date_arrivee"],
    }
  );

export type ReservationInput = z.infer<typeof reservationSchema>;
