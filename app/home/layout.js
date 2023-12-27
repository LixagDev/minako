import "@/app/globals.css";

export const metadata = {
    title: "Minako - Acceuil",
    description: "Le réseau social Minako créé par Valentin Arnould",
    charset: "utf-8",
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
            </head>
            <body className={"relative"}>{children}</body>
        </html>
    );
}
