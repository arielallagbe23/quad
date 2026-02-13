import { z } from "zod";

export const reservationSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  phone: z
    .string()
    .min(8, "Le téléphone est requis.")
    .regex(/^[+0-9\s().-]+$/, "Format de téléphone invalide."),
  email: z.string().email("Adresse email invalide."),
  reservationType: z.enum(["location", "circuit", "club"]),
  duration: z.enum(["3H", "6H", "Demi-journée", "Journée"]),
  date: z.string().min(1, "La date est requise."),
  time: z.string().min(1, "L'heure est requise."),
  departure: z.string().min(2, "Le lieu de départ est requis."),
  message: z.string().max(600, "Message trop long.").optional().or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la convention de location." })
  })
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export type ReservationRecord = ReservationInput & {
  id: string;
  createdAt: string;
};
