import { NextResponse } from "next/server";
import { reservationSchema, type ReservationRecord } from "@/lib/reservationSchema";

const reservations: ReservationRecord[] = [];

function createReferenceId() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `RB-${year}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = reservationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const record: ReservationRecord = {
      ...parsed.data,
      id: createReferenceId(),
      createdAt: new Date().toISOString()
    };

    reservations.push(record);

    return NextResponse.json(
      {
        ok: true,
        message: "Réservation enregistrée.",
        reservation: record
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur temporaire."
      },
      { status: 500 }
    );
  }
}
