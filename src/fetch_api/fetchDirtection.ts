import { DirectionType } from "../types";
import { access_token } from "./token";
import axios from "./axios";


export const getDirectionByConferenceId = async (id: number): Promise<DirectionType[]> => {
    const { data } = await axios.get(`/api/direction/byConference/${id}`,{
        headers: {
        Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
}
