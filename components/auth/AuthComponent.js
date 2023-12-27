"use client"
import {signIn, signOut} from "next-auth/react"
import {Button} from "react-daisyui"
import DiscordImg from "@/public/discord.png";
import Image from "next/image";
import {useRouter} from "next/navigation";
import anime from "animejs";

export default function AuthComponent({session, providers}){
    const router = useRouter();
    const signInDiscord = () => {
        anime({
            targets: ".anime-button",
            scale: 1.15,
            backgroundColor: ["#ffffff", "rgba(255,255,255,0)"],
            complete: function(){
                signIn(providers.discord.id);
            }
        });
    }

    const enterOnHover = () => {
        anime({
            targets: ".anime-button-enter",
            scale: 1.05,
            backgroundColor: ["#ffffff", "rgba(255,255,255,0)"],
        });
    }

    const enterOnLeave = () => {
        anime({
            targets: ".anime-button-enter",
            scale: 1,
            backgroundColor: ["#ffffff", "rgba(255,255,255,0)"],
        });
    }

    const onSignOut = () => {
        anime({
            targets: ".anime-button",
            scale: 1.15,
            backgroundColor: ["#ffffff", "rgba(255,255,255,0)"],
            complete: function(){
                signOut();
            }
        });
    }

    if (session) {
        return (
            <div class={"w-80 flex flex-col justify-center gap-2"}>
                <h1 class={"text-center"}>Vous êtes déjà connecté !</h1>
                <Button onMouseEnter={enterOnHover} onMouseLeave={enterOnLeave} className={"bg-gradient-to-r from-primary via-secondary to-accent text-white w-full anime-button-enter"} onClick={() => router.push("/home")}>Accéder à Minako</Button>
                <Button className={"text-white w-full anime-button"} onClick={onSignOut}>Ou se déconnecter</Button>
            </div>
        );
    } else{
        return (
            <div className={"w-80 flex flex-col justify-center"}>
                <Button onClick={signInDiscord} className={"anime-button"}><Image src={DiscordImg} width={25} alt={providers.discord.name}/>Se connecter avec {providers.discord.name}</Button>
            </div>
        );
    }
}