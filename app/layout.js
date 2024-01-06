import "@/app/globals.css";

export const metadata = {
    title: "minako",
    description: "Le réseau social Minako créé par Valentin Arnould",
    charset: "utf-8",
    icons: {
        icon: './favicon.ico',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/favicon.png"/>
                <meta name="apple-mobile-web-app-title" content="minako"/>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes"/>
            </head>
            <body className={"relative"}>{children}</body>
        </html>
    );
}
