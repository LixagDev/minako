import {Badge, Tooltip} from "react-daisyui";

export default function PremiumBadge({size, username, mini}){
    return(
        <Tooltip message={`${username} est un membre Premium.`}>
            <Badge className={"cursor-pointer select-none"} color={"secondary"} size={size}>{ mini ? "P" : "Premium" }</Badge>
        </Tooltip>
    );
}