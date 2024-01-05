"use client"
import {Button} from "react-daisyui";

export default function MessageLoader({messages, backUp, loadMore}){
    return(
        <>
            {
                messages.length < 10 ? <Button onClick={backUp} color={"primary"} className={"w-1/3"}>Revenir au début</Button>
                    :
                    <Button onClick={loadMore} color={"primary"} className={"w-1/3"}>Charger plus</Button>
            }
        </>
    )
}