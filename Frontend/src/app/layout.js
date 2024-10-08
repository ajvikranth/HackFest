import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { ReduxProvider } from "@/Redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Madimi+One&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        // className={inter.className}
        className="bg-gradient-to-br  from-orange-200  to-cyan-200 "
      >
        <ReduxProvider>
          <div>{children} </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
