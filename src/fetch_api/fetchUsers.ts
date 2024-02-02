import axios from "./axios";
import { UserType } from "@/types";
import { access_token } from "./token";

export const getAllUsers = async (role: string): Promise<UserType[]> => {
  const { data } = await axios.get(`/api/user/all?role=${role}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getUserById = async (id: number): Promise<UserType[]> => {
  const { data } = await axios.get(`/api/user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const putAllUsers = async (users: UserType[]) => {
  const { data } = await axios.put(`/api/user/make/reviewer`, users, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};
