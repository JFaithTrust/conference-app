import { DirectionType } from "../types";
import axios from "./axios";

export const getDirectionByConferenceId = async (
  id: number
): Promise<DirectionType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/direction/byConference/${id}`);
  return data;
};

export const getAllDirections = async (): Promise<DirectionType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/direction/all`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};
