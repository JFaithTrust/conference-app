import axios from "./axios";
import {AnswerType} from "@/types";

export const getAllAnswersByApplicationId = async (
    id: number
): Promise<AnswerType[]> => {
    const access_token = localStorage.getItem("access_token")
    const { data } = await axios.get(`/api/answer/by_application/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return data;
}
