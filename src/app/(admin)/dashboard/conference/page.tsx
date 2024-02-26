"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaEye, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { ConferenceType } from "@/types";
import CustomPagination from "@/components/ui/CustomPagination";
import { getAllConferences } from "@/fetch_api/fetchConference";
import { format } from "date-fns";
import axios from "@/fetch_api/axios";
import { access_token } from "@/fetch_api/token";
import Loading from "@/app/(home)/home_components/loading/Loading";

const Conference = () => {
  const [allConferences, setAllConferences] = useState<ConferenceType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setuserRole] = useState("");
  const [sortByFullName, setSortByFullName] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  const usersPerPage = 10;
  const lastConferenceIndex = currentPage * usersPerPage;
  const firstConferenceIndex = lastConferenceIndex - usersPerPage;
  const currentConferences = allConferences.slice(
    firstConferenceIndex,
    lastConferenceIndex
  );

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setuserRole(localStorage.getItem("role") || "");
    }
    try {
      const getConferences = async () => {
        const data = await getAllConferences();
        setAllConferences(data);
        setLoading(false);
      };
      getConferences();
    } catch (error) {
      console.log("Error in fetching conferences", error);
    }
  }, []);

  const handleSortByFullName = () => {
    setSortByFullName(sortByFullName === "asc" ? "desc" : "asc");
    setAllConferences(
      [...allConferences].sort((a, b) => {
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

  const handeleDelete = (id: number) => {
    axios
      .delete(`/api/conference/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const newConferences = allConferences.filter((conf) => conf.id !== id);
        setAllConferences(newConferences);
      });
  };

  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <div className="flex flex-col gap-y-[18px] px-[30px]">
        <div
          className={`flex items-center py-4 ${
            userRole !== "SUPER_ADMIN" ? "justify-end" : "justify-between"
          }`}
        >
          <Button
            className={`bg-white text-typeblue hover:bg-white/90 px-[30px] py-[12px] ${
              userRole !== "SUPER_ADMIN" ? "hidden" : ""
            }`}
            onClick={() =>
              router.push("/dashboard/conference/conference-create")
            }
          >
            <HiOutlinePlus className="mr-2 h-4 w-4" />
            Create
          </Button>
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
                  className="flex flex-row gap-x-1 items-center w-[350px] cursor-pointer text-start"
                  onClick={handleSortByFullName}
                >
                  Konferensiya nomi
                  <ArrowUpDown className="h-4 w-4" />
                </div>
                <span className="w-[150px]">Boshlanish vaqti</span>
                <span className="w-[150px]">Tugash vaqti</span>
                <span className="w-[150px]">Registratsiya v.</span>
                <span className={`w-[130px] text-center`}>Harakat</span>
              </div>
              {currentConferences.length > 0 ? (
                <div className="flex flex-col gap-y-[9px] w-full">
                  {currentConferences
                    ?.filter((conf) =>
                      conf.name
                        ?.toLowerCase()
                        // .includes(searchTerm.toLowerCase())
                        .replace(/\s+/g, "")
                        .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
                    )
                    .map((conf) => (
                      <div
                        key={conf.id}
                        className={
                          "flex flex-row pl-3 pr-1.5 py-1 items-center w-full text-lg font-norma bg-transparent hover:bg-slate-200 border-[1px] border-solid border-[#61AFFE] rounded-lg cursor-pointer transition-all duration-300 ease-in-out justify-between"
                        }
                      >
                        <span className="w-[48px]">{conf.id}</span>
                        <span className="w-[350px] text-start overflow-hidden truncate">
                          {highlightSearchTerm(conf.name, searchTerm)}
                        </span>
                        <span className="w-[150px]">
                          {format(conf.startsAt, "dd-MM-yyyy")}
                        </span>
                        <span className="w-[150px]">
                          {format(conf.endsAt, "dd-MM-yyyy")}
                        </span>
                        <span className="w-[150px]">
                          {format(conf.deadlineForThesis, "dd-MM-yyyy")}
                        </span>
                        <div
                          className={`lowercase flex flex-row w-[130px] gap-x-2 items-center ${
                            userRole !== "SUPER_ADMIN"
                              ? "justify-center"
                              : "justify-start"
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size={"icon"}
                            className="px-0"
                            onClick={() =>
                              router.push(`/dashboard/conference/${conf.id}`)
                            }
                          >
                            <FaEye size={22} className="text-typeblue" />
                          </Button>
                          {userRole === "SUPER_ADMIN" && (
                            <>
                              <Button
                                variant="ghost"
                                size={"icon"}
                                className="px-0"
                                onClick={() =>
                                  router.push(
                                    `/dashboard/conference/conference-edit/${conf.id}`
                                  )
                                }
                              >
                                <FaEdit size={20} className="text-typeyellow" />
                              </Button>
                              <Button
                                variant="ghost"
                                size={"icon"}
                                className="px-0"
                                onClick={() => handeleDelete(conf.id)}
                              >
                                <AiFillDelete
                                  size={20}
                                  className="text-typered"
                                />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full flex items-center justify-center h-[200px] text-xl font-semibold font-source-serif-pro text-muted-foreground border border-solid rounded-xl">
                  Konferensiyalar mavjud emas!
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center py-4 justify-end">
          {allConferences.length > usersPerPage && (
            <CustomPagination
              totalPosts={allConferences.length}
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

export default Conference;
