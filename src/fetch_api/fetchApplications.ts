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
  reviewerId: number,
  applications: []
) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(
    `/api/user/addApplication/${reviewerId}`,
    applications,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
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

export const getAllFeedbacks = async (
  status: string | null,
  pstatus: string | null
): Promise<ApplicationType[]> => {
  const access_token = localStorage.getItem("access_token");
  if (status && pstatus) {
    const { data } = await axios.get(
      `/api/application/all/byStatus?status=${status}&paymentStatus=${pstatus}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.get(
      `/api/application/all/byStatus`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  }
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
  const { data } = await axios.post(
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

// update application payment status

export const putApplicationPaymentStatus = async (
  id: number,
  status: string
) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(
    `/api/application/payment/${id}?status=${status}`,
    "mazgi",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

export const getApplicationPaymentLink = async ( applicationId: number) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(
      `/api/payment/redirect?amount=100000&applicationId=${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
  );
  return data;
};
