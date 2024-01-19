"use client"
export default function NoMessage({username}){
    return(
        <div className={"flex w-full bg-base-100 shadow-md rounded-xl p-4 justify-center"}>
            <h2>{username} à désactivé les réponses aux messages.</h2>
        </div>
    );
}