import axios from './axios'
import { ConferenceType } from "@/types";


export const getConferenceById = async (id: number): Promise<ConferenceType> => {
  const { data } = await axios.get(`/api/conference/${id}`);
  return data;
}

export const getAllConferences = async (): Promise<ConferenceType[]> => {
  const { data } = await axios.get("/api/conference/all");
  return data;
}
