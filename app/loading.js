"use client"
import {useEffect} from "react";
import anime from "animejs";

export default function loading(){
    const loadingTextArray = Array.from("Chargement...");

    useEffect(() => {
        anime({
            targets: ".anime",
            keyframes: [
                {translateY: -10},
                {translateY: 0}
            ],
            delay: anime.stagger(150),
            duration: 1000,
            loop: true
        });
    }, []);

    return(
        <div class={"h-full w-full flex flex-col justify-center items-center"}>
            <div className={"flex"}>
                {
                    loadingTextArray.map((letter) => {
                        return <h1 className={"font-bold anime"}>{letter}</h1>
                    })
                }
            </div>
        </div>
    );
}