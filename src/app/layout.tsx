import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharvil (Shivi)'s 1st Birthday! 🐾🎂 | Bluey Theme Invitation",
  description: "Main 29th ko 1 saal ka hone ja raha hu, mere birthday par aap zaroor padhare! Sunday, Nov 29, 2026 at Kesarinandan Parkway, Udaipur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-blue-300 selection:text-blue-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
