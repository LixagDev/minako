"use client"
import {Button} from "react-daisyui";

export default function M_Button({size, color, text, onClick, disabled, loading, className, startIcon, active}){
    return <Button active={active} startIcon={startIcon} className={`shadow-md ${className}`} size={size} color={color} onClick={onClick} disabled={disabled} loading={loading}>{text}</Button>
}