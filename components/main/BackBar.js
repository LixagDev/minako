"use client"
import {Button} from "react-daisyui";
import {ArrowLeft} from "react-feather";
import {useRouter} from "next/navigation";

export default function BackBar({content, other}){
    const router = useRouter();
    return (
        <div className={"flex gap-3 border-b border-t md:border-t-0 border-neutral p-4 items-center bg-base-300"}>
            <Button color={"secondary"} onClick={() => router.back()}><ArrowLeft size={25}/></Button>
            <div className={"flex flex-col"}>
                <h2 className={"font-bold text-lg"}>{content}</h2>
                <h3 className={"text-neutral-content text-sm"}>{other}</h3>
            </div>
        </div>
    );
}