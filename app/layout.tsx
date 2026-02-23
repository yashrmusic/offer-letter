import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StructCrew | Human Capital Platform",
  description: "Advanced recruitment intelligence for architecture and construction. AI-powered offer automation and candidate management.",
  keywords: ["recruitment", "architecture", "construction", "hiring", "AEC", "human capital", "AI HR"],
  openGraph: {
    title: "StructCrew Platform",
    description: "Intelligent recruitment automation for the AEC industry.",
    type: "website",
    url: "https://structcrew.online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body>
        <div className="gradient-bg" />
        <div className="grid-pattern" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
