import "@/app/globals.css";

export const metadata = {
    title: "Minako",
    description: "Le réseau social Minako créé par Valentin Arnould",
    charset: "utf-8",
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={"relative"}>{children}</body>
        </html>
    );
}
