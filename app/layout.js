import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Kurippu",
    default: "Kurippu",
  },
  keywords: ["note app"],
  description: "Simple Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <body
        className={`h-full min-h-svh ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" forcedTheme="light">
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
