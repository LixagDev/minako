import {useRouter} from "next/navigation";
import axios from "axios";

export default function DeleteMessage(messageId, userSessionData){
    return axios.post("/api/delete/message", {messageId: messageId, ownerId: userSessionData.id})
}