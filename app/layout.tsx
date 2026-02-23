import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StructCrew — Architecture & Construction Recruitment",
  description: "Elite recruitment for architects, engineers, and construction professionals. Building the infrastructure of human capital.",
  keywords: ["recruitment", "architecture", "construction", "hiring", "AEC", "staffing"],
  openGraph: {
    title: "StructCrew — Architecture & Construction Recruitment",
    description: "Elite recruitment for architects, engineers, and construction professionals.",
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
