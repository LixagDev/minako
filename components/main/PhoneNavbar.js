"use client"
import {Avatar} from "react-daisyui";
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
            <div className={"flex bg-base-300 p-5 flex md:hidden items-center sticky top-0 z-10"}>
                <Avatar onClick={toggleDrawer} className={"cursor-pointer basis-1/3"} shape={"circle"} src={userSessionData.image} border
                        borderColor={"neutral"} size={"sm"}/>
                <div className={"flex justify-center basis-1/3"}>
                    <MinakoTitle/>
                </div>
                <div className={"flex basis-1/3"}></div>
            </div>
        </>
    );
}