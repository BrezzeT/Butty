import type { Metadata } from "next";
import "./globals.css"
import React from "react";

export const metadata: Metadata = {
  title: "Манхетен Прилуки | Butty Space | Салон краси | Manhetten",
  description: "Простор краси та уходу"
}

export default function RootLayout({ children}:Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="uk">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}