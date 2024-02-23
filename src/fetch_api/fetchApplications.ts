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

export const getApplicationsByConferenceAndDirectionId = async (
  conferenceId: number,
  directionId: number
): Promise<ApplicationType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(
    `/api/application/${conferenceId}/${directionId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

export const putApplicationByUserId = async (
  revierwerId: number,
  applications: []
) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.put(
    `/api/user/addApplication/${revierwerId}`,
    applications,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getApplicationByCurrentUser = async (): Promise<
  ApplicationType[]
> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get("/api/application", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getApplicationByConferenceId = async (
  conferenceId: number
): Promise<ApplicationType[]> => {
  const { data } = await axios.get(
    `/api/application/byConference/${conferenceId}`
  );
  return data;
};

export const getAllFeedbacks = async (): Promise<ApplicationType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/application/all/byStatus`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getReviewersApplications = async (): Promise<
  ApplicationType[]
> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/application/reviewer`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const putApplicationStatus = async (id: number, status: string) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.put(
    `/api/application/status/${id}?status=${status}`,
    "mazgi",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};
