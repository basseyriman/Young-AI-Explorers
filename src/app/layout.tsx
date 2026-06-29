import type { Metadata } from "next";
import { Inter, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AIAssistantLoader } from "@/components/AIAssistantLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Young AI Explorers",
  description: "Exploring the Future, One Idea at a Time. The ultimate educational ecosystem for the next generation of innovators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline theme init: reads localStorage before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream transition-colors duration-300 overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider defaultTheme="light">
          {children}
          <AIAssistantLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
