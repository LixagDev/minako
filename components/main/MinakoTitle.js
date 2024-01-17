"use client"
import anime from "animejs";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function MinakoTitle() {
    const router = useRouter();
    const minakoArray = Array.from("minako");

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
        });
    }, []);
    const minakoVersion = "0.0.7.2";

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"flex"}>
                {
                    minakoArray.map((letter) => {
                        return(
                            <div onClick={() => router.push("/home")} className={"cursor-pointer"}>
                                <h1 className={"lg:text-6xl text-4xl font-black anime-minako"}>{letter}</h1>
                            </div>
                        );
                    })
                }
            </div>
            <h2 class={"text-xs font-mono"}>Alpha {minakoVersion}</h2>
        </div>
    );
}