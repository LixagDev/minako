import {Button} from "react-daisyui";
import {ArrowLeft} from "react-feather";

export default function Divider({content}){
    return (
        <div className={"flex gap-3 shadow-md rounded-xl p-4 items-center justify-center bg-base-100"}>
            <h2 className={"font-bold text-lg"}>{content}</h2>
        </div>
    );
}