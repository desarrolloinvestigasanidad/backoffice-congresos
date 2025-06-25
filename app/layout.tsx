import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
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
          <div className='min-h-screen bg-background'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
