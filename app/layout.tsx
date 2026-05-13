import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/navigation/Sidebar";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: {
    default: "Basic64 School — Learn Commodore 64 BASIC",
    template: "%s — Basic64 School",
  },
  description: "Learn Commodore 64 BASIC through interactive browser lessons with a built-in emulator.",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="c64-theme">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#008000" />
      </head>
      <body>
        <AuthProvider>
          <div className="c64-layout-wrapper">
            <Sidebar />
            <main className="c64-main-content">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
