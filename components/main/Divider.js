import {Button} from "react-daisyui";
import {ArrowLeft} from "react-feather";

export default function Divider({content}){
    return (
        <div className={"flex gap-3 border-b border-t md:border-t-0 border-neutral p-4 items-center justify-center bg-base-200"}>
            <h2 className={"font-bold text-lg"}>{content}</h2>
        </div>
    );
}