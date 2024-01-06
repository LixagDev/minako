"use client"
import M_Avatar from "@/components/component/M_Avatar";
import MinakoTitle from "@/components/main/MinakoTitle";
import {useState} from "react";
import PhoneDrawer from "@/components/main/PhoneDrawer";

export default function PhoneNavbar({userSessionData}){
    const [drawerVisible, setDrawerVisible] = useState(false);
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    }

    return(
        <>
            <PhoneDrawer drawerVisible={drawerVisible} toggleDrawer={toggleDrawer} userSessionData={userSessionData}/>
            <div className={"flex bg-base-100 p-4 flex lg:hidden items-center sticky top-3 z-10 shadow-lg rounded-xl"}>
                <div className={"flex basis-1/3"}>
                    <M_Avatar onClick={toggleDrawer} className={"cursor-pointer "} src={userSessionData.image} size={"sm"}/>
                </div>
                <div className={"flex justify-center basis-1/3"}>
                    <MinakoTitle/>
                </div>
                <div className={"flex basis-1/3 flex-row-reverse"}></div>
            </div>
        </>
    );
}