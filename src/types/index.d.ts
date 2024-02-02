import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface ConferenceType{
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  deadlineForThesis: string;
  cost: string;
  description: string;
  address: string;
  requirements: string;
  owner: {
    id: number;
    fullName: string;
    email: string;
    username: string;
    role: string;
    phoneNumber: string;
  }
}

export interface UserType {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  userStatus: "ACTIVE" | "INACTIVE";
}

export interface DirectionType {
  id: number;
  name: string;
}