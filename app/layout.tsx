import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext"; // <-- 1. IMPORTAMOS EL PROVIDER
import "./globals.css";

export const metadata: Metadata = {
  title: "Backoffice | Congresos Médicos",
  description: "Panel de administración para la gestión de congresos médicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          {/*-- 2. ENVOLVEMOS LA APLICACIÓN CON EL AUTHPROVIDER --*/}
          <AuthProvider>
            <div className='min-h-screen bg-background'>{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
