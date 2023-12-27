"use client"
import anime from "animejs";
import {useEffect} from "react";

export default function MinakoTitle() {
    const minakoArray = Array.from("Minako");

    useEffect(() => {
        anime({
            targets: ".anime-minako",
            keyframes: [
                {translateY: -10, easing: 'easeOutExpo'},
                {translateY: 0, easing: 'easeInExpo'}
            ],
            delay: anime.stagger(400, {start: 5000}),
            duration: 400,
            loop: true
        })
    }, []);

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"flex"}>
                {
                    minakoArray.map((letter) => {
                        return(
                            <h1 className={"lg:text-6xl text-4xl font-black anime-minako"}>{letter}</h1>
                        );
                    })
                }
            </div>
            <h2 class={"text-xs font-mono"}>Ver.</h2>
        </div>
    );
}