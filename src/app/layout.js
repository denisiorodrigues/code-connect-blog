import { Prompt } from 'next/font/google'
import { Aside } from "@/components/Asaid";
import { SearchForm } from '@/components/SearchForm'
import "./globals.css";

export const metadata = {
  title: "Code Connect",
  description: "Rede social para desenvolvedores",
};

const prompt = Prompt({
  weight: ['400', '500','600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <div className="app-container">
          <div>
            <Aside />
          </div>
          <div className='main-content'>
            <SearchForm />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
