import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life OS — Tu Asistente de Vida en WhatsApp",
  description: "3 agentes de IA que manejan tus finanzas, nutrición y entrenamiento directo desde WhatsApp. Probá 14 días gratis.",
  keywords: ["IA", "WhatsApp", "finanzas", "gym", "nutrición", "asistente personal", "inteligencia artificial"],
  openGraph: {
    title: "Life OS — Tu Asistente de Vida en WhatsApp",
    description: "3 agentes de IA que manejan tus finanzas, nutrición y entrenamiento directo desde WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
