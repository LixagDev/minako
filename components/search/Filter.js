"use client"
import {Radio} from "react-daisyui";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Filter({query}){
    const router = useRouter();
    const [wantMostRecent, setWantMostRecent] = useState(true);

    return(
        <div className={"flex flex-col items-center w-full h-hit bg-base-100 rounded-xl shadow-md p-4 gap-2"}>
            <h1 className={"font-bold text-xl"}>Filtre de recherche</h1>
            <div className={"flex flex-col justify-center gap-1 w-full"}>
                <h2 className={"font-bold"}>Par date de création</h2>
                <div className={"flex items-center"}>
                    <h3 className={"w-1/2"}>Le plus récent</h3>
                    <div className={"w-1/2 flex flex-row-reverse"}>
                        <Radio checked={wantMostRecent} onClick={() => {
                            setWantMostRecent(true);
                            router.push(`?q=${query}&r=desc`);
                        }}/>
                    </div>
                </div>
                <div className={"flex items-center"}>
                    <h3 className={"w-1/2"}>Le plus vieux</h3>
                    <div className={"w-1/2 flex flex-row-reverse"}>
                        <Radio checked={!wantMostRecent} onClick={() => {
                            setWantMostRecent(false);
                            router.push(`?q=${query}&r=asc`);
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}