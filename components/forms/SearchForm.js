"use client"
import {Form, Input} from "react-daisyui";
import M_Button from "@/components/component/M_Button";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchForm({isAfterSearch, query, recent}){
    const router = useRouter();
    const [searchText, setSearchText] = useState(query);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?q=${searchText}&r=${recent}`);
    }

    const search = (e) => {
        setSearchText(e.target.value);
        router.push(`/search?q=${e.target.value}&r=${recent}`);
    }

    return(
        <div className={"w-full p-4 bg-base-100 rounded-xl shadow-md flex flex-col gap-3"}>
            <Form onSubmit={handleSubmit} className={"w-full flex flex-col gap-3 items-center"}>
                <Input required placeholder={"Taper du texte ou un nom d'utilisateur"} className={"w-full"} bordered disabled={isLoading} value={searchText} onChange={isAfterSearch ? (e) => search(e) : (e) => setSearchText(e.target.value)}/>
            </Form>
        </div>
    );
}