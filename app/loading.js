"use client"
import {Loading} from "react-daisyui";

export default function Loader(){
    return(
        <div class={"h-full flex justify-center items-center"}>
            <Loading variant={"dots"} size={"lg"}></Loading>
        </div>
    )
}