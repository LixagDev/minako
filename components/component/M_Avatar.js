"use client"
import {Avatar} from "react-daisyui";

export default function M_Avatar({className, src, size, onClick}){
    return <Avatar onClick={onClick} border borderColor={"secondary"} innerClassName={"rounded-xl"} className={className} src={src} size={size}/>
}