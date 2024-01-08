"use client"
import M_Button from "@/components/component/M_Button";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "react-feather";

export default function NotFoundPage(){
    const router = useRouter();
    return(
        <div className={"w-full h-full flex flex-col gap-3 justify-center items-center"}>
            <h1 className={"md:text-3xl text-xl font-bold text-center"}>Mmmmhhh... Nous avons rien trouvé, désolé !</h1>
            <M_Button color={"primary"} onClick={() => router.back()} startIcon={<ArrowLeft/>} text={"Revenir en arrière"} />
        </div>
    );
}