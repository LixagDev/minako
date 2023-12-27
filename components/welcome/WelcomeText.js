"use client"
import anime from "animejs";
import {useEffect} from "react";

export default function WelcomeText({session}){
    const minakoArray = Array.from("Minako");
    useEffect(() => {
        anime({
            targets: ".anime-minako",
            keyframes: [
                {translateY: -10, easing: 'easeOutExpo'},
                {translateY: 0, easing: 'easeInExpo'}
            ],
            delay: anime.stagger(400, {start: 1000}),
            duration: 400,
            loop: true
        });
    });

    if (!session){
        return (
            <div className={"flex justify-center flex-col"}>
                <h1 className={"lg:text-6xl lg:m-0 text-4xl font-black"}>Bienvenue sur</h1>
                <div className={"flex justify-center"}>
                    {minakoArray.map((letter) => {
                        return <h1 key={letter} className={"lg:text-6xl lg:m-0 text-4xl font-black anime-minako"}>{letter}</h1>
                    })}
                </div>
            </div>
        );
    }
    else{
        return (
            <div>
                <h1 className={"lg:text-6xl text-4xl font-black text-center anime-welcome"}>Bienvenue</h1>
                <h1 className={"lg:text-6xl text-4xl font-black text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent lg:pb-3 pb-2 anime-welcome"}>@{session.user.name}</h1>
            </div>
        );
    }
}