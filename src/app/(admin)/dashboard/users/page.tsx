"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserType } from "@/types";
import { getAllUsers } from "@/fetch_api/fetchUsers";
import { useRouter } from "next/navigation";
import CustomPagination from "@/components/ui/CustomPagination";
import Loading from "@/app/(home)/home_components/loading/Loading";

const Users = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const usersPerPage = 10;
  const lastUsersIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUsersIndex - usersPerPage;
  const currentUsers = allUsers.slice(firstUserIndex, lastUsersIndex);
  const [sortByFullName, setSortByFullName] = useState<"asc" | "desc">("asc");
  const [sortByStatus, setSortByStatus] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllUsers("USER");
      setAllUsers(data);
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleSortByFullName = () => {
    setSortByFullName(sortByFullName === "asc" ? "desc" : "asc");
    setAllUsers(
      [...allUsers].sort((a, b) => {
        const nameA = a.fullName?.toUpperCase();
        const nameB = b.fullName?.toUpperCase();
        if (sortByFullName === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      })
    );
  };

  const handleSortByStatus = () => {
    setSortByStatus(sortByStatus === "asc" ? "desc" : "asc");
    setAllUsers(
      [...allUsers].sort((a, b) => {
        if (sortByStatus === "asc") {
          return a.userStatus < b.userStatus
            ? -1
            : a.userStatus > b.userStatus
            ? 1
            : 0;
        } else {
          return a.userStatus > b.userStatus
            ? -1
            : a.userStatus < b.userStatus
            ? 1
            : 0;
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
      <div className="flex items-center py-4 justify-end">
        <Input
          placeholder="Enter name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-col p-[18px] bg-mainwhite gap-y-1.5 border-[1px] border-solid border-[#DCDBFA] rounded-xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-row p-3 items-center w-full justify-between text-lg font-medium">
              <span className="w-[48px]">Id</span>
              <div
                className="flex flex-row gap-x-1 items-center w-[350px] cursor-pointer"
                onClick={handleSortByFullName}
              >
                Full Name
                <ArrowUpDown className="h-4 w-4" />
              </div>
              <span className="w-[200px]">Phone Number</span>
              <div
                className="flex flex-row gap-x-1 items-center w-[75px] cursor-pointer"
                onClick={handleSortByStatus}
              >
                Status
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </div>
            {currentUsers.length > 0 ? (
              <div className="flex flex-col gap-y-[9px] w-full">
                {currentUsers
                  ?.filter((user) =>
                    user.fullName
                      ?.toLowerCase()
                      // .includes(searchTerm.toLowerCase())
                      .replace(/\s+/g, "")
                      .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
                  )
                  .map((user) => (
                    <div
                      key={user.id}
                      onClick={() => router.push(`/dashboard/users/${user.id}`)}
                      className={
                        "flex flex-row pl-3 pr-1.5 py-1 items-center w-full text-lg font-norma bg-transparent hover:bg-slate-200 border-[1px] border-solid border-[#61AFFE] rounded-lg cursor-pointer transition-all duration-300 ease-in-out justify-between"
                      }
                    >
                      <span className="w-[48px]">{user.id}</span>
                      <span className="w-[350px] text-start">
                        {highlightSearchTerm(user.fullName, searchTerm)}
                      </span>
                      <span className="w-[200px]">{user.phoneNumber}</span>
                      <Button
                        className={`capitalize text-white rounded-2xl text-center py-1.5 px-4 ${
                          user.userStatus === "ACTIVE"
                            ? "bg-typegreen"
                            : "bg-typered"
                        }`}
                      >
                        {user.userStatus}
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center h-[200px] text-xl font-semibold font-source-serif-pro text-muted-foreground border border-solid rounded-xl">
                Foydalanuvchilar mavjud emas!
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center py-4 justify-end">
        {allUsers.length > usersPerPage && (
          <CustomPagination
            totalPosts={allUsers.length}
            postsPerPage={usersPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
