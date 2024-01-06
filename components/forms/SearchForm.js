import {Form, Input, Tooltip} from "react-daisyui";
import M_Button from "@/components/component/M_Button";
import {useState} from "react";

export default function SearchForm({isAfterSearch}){
    const [searchText, setSearchText] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div className={"w-full p-4 bg-base-100 rounded-xl shadow-md flex flex-col gap-3"}>
            <Form onSubmit={handleSubmit} className={"w-full flex flex-col gap-3 items-center"}>
                <Tooltip className={"w-full"} message={"Bientôt disponible"} position={"left"} color={"primary"}>
                    <Input placeholder={"Effectuer une recherche"} className={"w-full"} bordered disabled={isLoading} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                </Tooltip>
                {
                    isAfterSearch ? <M_Button color={"primary"} className={"w-1/2"} text={"Rechercher"} loading={isLoading} disabled={isLoading}/> : null
                }
            </Form>
        </div>
    );
}