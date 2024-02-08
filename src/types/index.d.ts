import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface ConferenceType{
  id: number;
  name: string;
  startsAt: string;
  endsAt: string | Date;
  deadlineForThesis: string;
  cost?: string;
  description?: string;
  address?: string;
  requirements?: string;
  owner?: {
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
  email?: string;
  phoneNumber: string;
  userStatus: "ACTIVE" | "INACTIVE";
}

export interface DirectionType {
  id: number;
  name: string;
}

export interface File {
  id: number;
  downloadLink: string;
}

export interface ApplicationType {
  id: number;
  name: string;
  description?: string;
  authors?: string;
  thesisFile?: File;
  owner: UserType;
  reviewer: UserType;
  conference?: ConferenceType;
  direction?: DirectionType;
  createdAt?: string | Date;
}