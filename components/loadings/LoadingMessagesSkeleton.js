"use client"
import {Skeleton} from "react-daisyui";

export default function LoadingMessagesSkeleton(){
    return(
        <>
            <div className={"w-full flex gap-3 p-4 items-start"}>
                <Skeleton className="w-16 h-16 rounded-full shrink-0 bg-base-300"></Skeleton>
                <div className={"flex flex-col justify-center w-fit gap-3 basis-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Skeleton className="h-4 w-20 bg-base-300"></Skeleton>
                    </div>
                    <Skeleton className="h-24 w-full bg-base-300"></Skeleton>
                </div>
            </div>
            <div className={"w-full flex gap-3 p-4 items-start"}>
                <Skeleton className="w-16 h-16 rounded-full shrink-0 bg-base-300"></Skeleton>
                <div className={"flex flex-col justify-center w-fit gap-3 basis-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Skeleton className="h-4 w-28 bg-base-300"></Skeleton>
                    </div>
                    <Skeleton className="h-16 w-full bg-base-300"></Skeleton>
                </div>
            </div>
            <div className={"w-full flex gap-3 p-4 items-start"}>
                <Skeleton className="w-16 h-16 rounded-full shrink-0 bg-base-300"></Skeleton>
                <div className={"flex flex-col justify-center w-fit gap-3 basis-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Skeleton className="h-4 w-20 bg-base-300"></Skeleton>
                    </div>
                    <Skeleton className="h-28 w-full bg-base-300"></Skeleton>
                </div>
            </div>
            <div className={"w-full flex gap-3 p-4 items-start"}>
                <Skeleton className="w-16 h-16 rounded-full shrink-0 bg-base-300"></Skeleton>
                <div className={"flex flex-col justify-center w-fit gap-3 basis-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Skeleton className="h-4 w-28 bg-base-300"></Skeleton>
                    </div>
                    <Skeleton className="h-16 w-full bg-base-300"></Skeleton>
                </div>
            </div>
        </>
    );
}