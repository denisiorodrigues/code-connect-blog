import { Aside } from "@/components/Asaid";
import "./globals.css";

export const metadata = {
  title: "Code Connect",
  description: "Rede social para desenvolvedores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="app-container">
        <Aside />
        {children}
        </div>
      </body>
    </html>
  );
}
