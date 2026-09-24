"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";

export default function CreatePlanPage() {
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const session = getSession();

    if (!session.id) {
      alert("Debes iniciar sesión");
      return;
    }

    const plan = {
      name: form.get("name"),
      description: form.get("description"),
      estimatedPrice: Number(form.get("estimatedPrice")),
      estimatedTime: Number(form.get("estimatedTime")),
      recomendations: form.get("recommendations"),
      address: form.get("address"),
      image: form.get("image"),
      userId: session.id,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plans`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      }
    );

    if (response.ok) {
      router.push("/plans");
    } else {
      alert("No se pudo crear el plan");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Crear un nuevo plan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl"
      >
        <label>
          Foto del plan
          <input
            type="url"
            name="image"
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Nombre del plan
          <input
            type="text"
            name="name"
            minLength={2}
            maxLength={50}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Dirección
          <input
            type="text"
            name="address"
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Precio estimado
          <input
            type="number"
            name="estimatedPrice"
            min={1}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Duración (minutos)
          <input
            type="number"
            name="estimatedTime"
            step={1}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Descripción
          <textarea
            name="description"
            maxLength={599}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          Recomendaciones
          <input
            type="text"
            name="recommendations"
            className="border rounded p-2 w-full"
          />
        </label>

        <button
          type="submit"
          className="border rounded p-2"
        >
          Publicar plan
        </button>
      </form>
    </main>
  );
}