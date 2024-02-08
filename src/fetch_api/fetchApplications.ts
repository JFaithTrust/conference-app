import axios from "./axios";
import { ApplicationType } from "../types";

export const getAllApplications = async (): Promise<ApplicationType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get("/api/application/all", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getApplicationById = async (
  id: number
): Promise<ApplicationType> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/application/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};
