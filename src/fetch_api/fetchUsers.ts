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
  const { data } = await axios.put(`/api/user/make/reviewer`, users, {
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
  const { data } = await axios.put(
    `/api/user`,
    { fullName },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};
