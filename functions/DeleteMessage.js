import {useRouter} from "next/navigation";
import axios from "axios";

export default function DeleteMessage(messageId, userSessionData){
    const router = useRouter();
    return axios.post("/api/delete/message", {messageId: messageId, ownerId: userSessionData.id}).then(() => router.refresh());
}