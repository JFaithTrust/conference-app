import axios from "./axios";
import { UserType } from "@/types";

export const getAllUsers = async (role: string): Promise<UserType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/user/all?role=${role}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getUserById = async (id: number): Promise<UserType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getUserByDirectionId = async (id: number): Promise<UserType[]> => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/user/byDirection/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const putAllUsers = async (users: UserType[]) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(`/api/user/make/reviewer`, users, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getUserInfo = async () => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.get(`/api/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

// update user full name
export const updateUserFullName = async ( fullName: string) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(
    `/api/user/edit`,
    { fullName },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

// change user status

export const changeUserStatus = async (id: number, enable: boolean) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(
    `/api/user/changeStatus/${id}?enable=${enable}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

// chnage reviewer to user
export const changeReviewerToUser = async (id: number) => {
  const access_token = localStorage.getItem("access_token");
  const { data } = await axios.post(
    `/api/user/make/user/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};