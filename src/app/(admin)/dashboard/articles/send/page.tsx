"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaEye, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { ApplicationType } from "@/types";
import CustomPagination from "@/components/ui/CustomPagination";

const data: ApplicationType[] = [
  {
    id: 1,
    name: "Aplllication 1",
    owner: {
      id: 1,
      fullName: "User 1",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 1,
      fullName: "User 1",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 2,
    name: "Aplllication 12",
    owner: {
      id: 2,
      fullName: "User 2",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 2,
      fullName: "User 2",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 3,
    name: "Aplllication 13",
    owner: {
      id: 3,
      fullName: "User 3",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 3,
      fullName: "User 3",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 4,
    name: "Aplllication 14",
    owner: {
      id: 4,
      fullName: "User 4",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 4,
      fullName: "User 4",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 5,
    name: "Aplllication 15",
    owner: {
      id: 5,
      fullName: "User 5",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 5,
      fullName: "User 5",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 6,
    name: "Aplllication 16",
    owner: {
      id: 6,
      fullName: "User 6",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 6,
      fullName: "User 6",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 7,
    name: "Aplllication 17",
    owner: {
      id: 7,
      fullName: "User 7",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 7,
      fullName: "User 7",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 8,
    name: "Aplllication 18",
    owner: {
      id: 8,
      fullName: "User 8",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 8,
      fullName: "User 8",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 9,
    name: "Aplllication 19",
    owner: {
      id: 9,
      fullName: "User 9",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 9,
      fullName: "User 9",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
  {
    id: 10,
    name: "Aplllication 20",
    owner: {
      id: 10,
      fullName: "User 10",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
    reviewer: {
      id: 10,
      fullName: "User 10",
      phoneNumber: "123456789",
      userStatus: "ACTIVE",
    },
  },
];

const SendArticles = () => {
  const [allApplications, setAllApplications] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const usersPerPage = 10;
  const lastConferenceIndex = currentPage * usersPerPage;
  const firstConferenceIndex = lastConferenceIndex - usersPerPage;
  const currentApplications = allApplications.slice(
    firstConferenceIndex,
    lastConferenceIndex
  );
  const [sortByFullName, setSortByFullName] = useState<"asc" | "desc">("asc");

  const router = useRouter();

  const handleSortByFullName = () => {
    setSortByFullName(sortByFullName === "asc" ? "desc" : "asc");
    setAllApplications(
      [...allApplications].sort((a, b) => {
        const nameA = a.name?.toUpperCase();
        const nameB = b.name?.toUpperCase();
        if (sortByFullName === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      })
    );
  };

  const highlightSearchTerm = (text: string, term: string) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === term.toLowerCase() ? "bg-typeyellow" : ""
        }
      >
        {part}
      </span>
    ));
  };

  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <div className="flex flex-col gap-y-[18px] px-[30px]">
        <div className="flex items-center py-4 justify-end">
          <Input
            placeholder="Enter name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex flex-col p-[18px] bg-mainwhite gap-y-1.5 border-[1px] border-solid border-[#DCDBFA] rounded-xl">
          <div className="flex flex-row p-3 items-center w-full justify-between text-lg font-medium">
            <span className="w-[48px]">Id</span>
            <div
              className="flex flex-row gap-x-1 items-center w-[350px] cursor-pointer text-start"
              onClick={handleSortByFullName}
            >
              Name Of Application
              <ArrowUpDown className="h-4 w-4" />
            </div>
            <span className="w-[250px]">Editor Name</span>
            <span className="w-[250px]">Owner Name</span>
            <div className="flex flex-row justify-between w-[200px]">
              <span className="text-center w-[100px]">Status</span>
              <span className="text-center">Payment</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-[9px] w-full">
            {currentApplications
              ?.filter(
                (app) =>
                  app.name
                    ?.toLowerCase()
                    // .includes(searchTerm.toLowerCase())
                    .replace(/\s+/g, "")
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
                  app.owner.fullName
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
                  app.reviewer.fullName
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
              )
              .map((app) => (
                <div
                  key={app.id}
                  onClick={() =>
                    router.push(`/dashboard/articles/send/${app.id}`)
                  }
                  className={
                    "flex flex-row pl-3 pr-1.5 py-1 items-center w-full text-lg font-norma bg-transparent hover:bg-slate-200 border-[1px] border-solid border-[#61AFFE] rounded-lg cursor-pointer transition-all duration-300 ease-in-out justify-between"
                  }
                >
                  <span className="w-[48px]">{app.id}</span>
                  <span className="w-[350px] text-start overflow-hidden truncate">
                    {highlightSearchTerm(app.name, searchTerm)}
                  </span>
                  <span className="w-[250px]">
                    {highlightSearchTerm(app.owner.fullName, searchTerm)}
                  </span>
                  <span className="w-[250px]">
                    {highlightSearchTerm(app.reviewer.fullName, searchTerm)}
                  </span>
                  <div className="flex flex-row justify-between w-[200px]">
                    <Button className="capitalize text-white rounded-2xl text-center py-1.5 px-4 bg-typegreen hover:bg-typegreen/85">
                      Accepted
                    </Button>
                    <Button className="capitalize text-white rounded-2xl text-center py-1.5 px-4 bg-typegreen hover:bg-typegreen/85">
                      Paid
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center py-4 justify-end">
          {allApplications.length > usersPerPage && (
            <CustomPagination
              totalPosts={allApplications.length}
              postsPerPage={usersPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SendArticles;
