import {Badge, Tooltip} from "react-daisyui";

export default function PremiumBadge({size, username, mini}){
    return(
        <Tooltip color={"accent"} message={`${username} est un membre Premium.`}>
            {
                !mini ? <div><Badge className={"cursor-pointer select-none rounded-xl shadow-md hidden md:flex"} color={"accent"} size={size}>Premium</Badge>
                        <Badge className={"cursor-pointer select-none rounded-xl shadow-md md:hidden flex"} color={"accent"} size={size}>P</Badge></div>
                    : <Badge className={"cursor-pointer select-none rounded-xl shadow-md"} color={"accent"} size={size}>P</Badge>
            }

        </Tooltip>
    );
}