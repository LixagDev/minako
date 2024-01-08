import "@/app/globals.css";

export const metadata = {
    title: "minako",
    description: "Le réseau social open source minako parce que pourquoi pas.",
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
            </head>
            <body className={"relative"}>{children}</body>
        </html>
    );
}
