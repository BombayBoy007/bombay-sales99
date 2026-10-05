import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "BomBay Sales99",
  description: "Mumbai curated affiliate storefront"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
