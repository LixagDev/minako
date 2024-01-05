import axios from "axios";

export default function GetMessageDataFromApi(messageId){
    return axios.get(`/api/get/message?id=${messageId}`)
        .then((response) => {
            return response.data;
        });
}