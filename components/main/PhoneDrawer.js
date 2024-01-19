"use client"
import SessionUserProfil from "@/components/main/SessionUserProfil";
import {Drawer} from "react-daisyui";
import LeftMenuButtons from "@/components/main/LeftMenuButtons";
import MinakoTitle from "@/components/main/MinakoTitle";

export default function PhoneDrawer({drawerVisible, toggleDrawer, userSessionData}){
    return(
        <>
            <Drawer className={"z-20"} open={drawerVisible} onClickOverlay={toggleDrawer} side={
                <div className={"p-2 md:w-fit w-2/3 flex h-full bg-base-300 overflow-hidden"}>
                    <div className={"flex w-full flex-col p-5"}>
                        <div className={"flex w-full h-1/2 justify-center"}>
                            <MinakoTitle/>
                        </div>
                        <LeftMenuButtons userSessionData={userSessionData} isDrawer={true}/>
                        <div className={"flex w-full justify-center items-end h-1/2"}>
                            <SessionUserProfil userSessionData={userSessionData}/>
                        </div>
                    </div>
                </div>
            }>
            </Drawer>
        </>
    );
}