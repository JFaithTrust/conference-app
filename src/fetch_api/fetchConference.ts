import axios from './axios'
import { ConferenceType } from "../types";
import { access_token } from './token';


export const getConferenceById = async (id: number): Promise<ConferenceType> => {
  const { data } = await axios.get(`/api/conference/${id}`,{
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

export const getAllConferences = async (): Promise<ConferenceType[]> => {
  const { data } = await axios.get(`/api/conference/all`);
  return data;
}
