"use client"
import {signIn, signOut} from "next-auth/react"
import DiscordImg from "@/public/discord.png";
import Image from "next/image";
import {useRouter} from "next/navigation";
import anime from "animejs";
import M_Button from "@/components/component/M_Button";

export default function AuthComponent({session, providers}){
    const router = useRouter();

    if (session) {
        return (
            <div class={"w-80 flex flex-col justify-center gap-2"}>
                <h1 class={"text-center"}>Vous êtes déjà connecté !</h1>
                <M_Button className={"text-white w-full"} onClick={() => router.push("/home")} color={"primary"} text={"Accéder à Minako"}/>
                <M_Button className={"w-full anime-button"} onClick={() => signOut()} text={"Ou se déconnecter"}/>
            </div>
        );
    }
    else{
        return (
            <div className={"w-80 flex flex-col justify-center"}>
                <M_Button onClick={() => signIn(providers.discord.id)} className={"anime-button"} startIcon={<Image src={DiscordImg} width={25} alt={providers.discord.name}/>} text={`Se connecter avec ${providers.discord.name}`} />
            </div>
        );
    }
}