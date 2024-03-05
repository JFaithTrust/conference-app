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
  newApplicationsCount?: number;
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
  newApplicationsCount?: number;
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
  status: "NEW" | "ACCEPTED" | "FEEDBACK" | "REJECTED" | "PENDING";
  paymentStatus: "PAID" | "UNPAID"
  thesisFile?: File;
  owner: UserType;
  reviewer: UserType;
  conference: ConferenceType;
  direction?: DirectionType;
  createdAt?: string | Date;
  updatedAt?: Date;
}


export interface AnswerType {
  id: number;
  text: string;
  application: ApplicationType;
  status: "ANSWERED" | "PENDIND";
}
