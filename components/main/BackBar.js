"use client"
import {ArrowLeft} from "react-feather";
import M_Button from "@/components/component/M_Button";
import {useRouter} from "next/navigation";

export default function BackBar({content, other}){
    const router = useRouter();
    return (
        <div className={"flex gap-3 p-4 items-center bg-base-100 rounded-xl shadow-md"}>
            <M_Button color={"primary"} onClick={() => router.back()} startIcon={<ArrowLeft size={25}/>}/>
            <div className={"flex flex-col"}>
                <h2 className={"font-bold text-lg"}>{content}</h2>
                <h3 className={"text-neutral text-sm"}>{other}</h3>
            </div>
        </div>
    );
}