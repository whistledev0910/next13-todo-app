import { Nunito } from "next/font/google";
import ClientOnly from "./components/clientOnly";
import Header from "./components/layout/Header";
import AddTodoModal from "./components/modal/addTodo";
import ToasterProvider from "./components/toastProvider";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Todo App",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <ClientOnly>
          <ToasterProvider />
          <AddTodoModal />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  );
}
