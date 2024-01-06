import {Badge, Tooltip} from "react-daisyui";

export default function PremiumBadge({size, username, mini}){
    return(
        <Tooltip color={"accent"} message={`${username} est un membre Premium.`}>
            <Badge className={"cursor-pointer select-none rounded-xl shadow-md"} color={"accent"} size={size}>{ mini ? "P" : "Premium" }</Badge>
        </Tooltip>
    );
}