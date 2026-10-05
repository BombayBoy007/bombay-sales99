import "./globals.css";

export const metadata = {
  title: "BomBay Sales99",
  description: "Mumbai curated affiliate storefront"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
