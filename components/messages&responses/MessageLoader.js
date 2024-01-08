"use client"
import M_Button from "@/components/component/M_Button";
import {useRouter} from "next/navigation";

export default function MessageLoader({messages, messageListDiv}){
    const router = useRouter();

    const loadMore = () => {
        router.push(`?skip=${Number(skip)+10}`);
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }
    const backUp = () => {
        router.push("?");
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return(
        <>
            {
                messages.length < 10 ? <M_Button onClick={backUp} color={"primary"} className={"w-1/3"} text={"Revenir au début"} />
                    :
                    <M_Button onClick={loadMore} color={"primary"} className={"w-1/3"} text={"Charger plus"} />
            }
        </>
    )
}