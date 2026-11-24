import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liam's 5th Birthday Invitation! 🎈🎂",
  description: "You are invited to Liam's 5th Birthday Adventure! Watch the video invite and RSVP.",
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
      <body className="antialiased selection:bg-pink-300 selection:text-pink-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
