"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ApplicationType } from "@/types";
import CustomPagination from "@/components/ui/CustomPagination";
import { getAllFeedbacks } from "@/fetch_api/fetchApplications";
import Loading from "@/app/(home)/home_components/loading/Loading";

const SendArticles = () => {
  const [allApplications, setAllApplications] = useState<ApplicationType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByFullName, setSortByFullName] = useState<"asc" | "desc">("asc");
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllAplications = async () => {
      const applications = await getAllFeedbacks(null, null);
      setAllApplications(applications);
      setLoading(false);
    };
    getAllAplications();
    if (localStorage.getItem("role")) {
      setUserRole(localStorage.getItem("role") || "");
    }
  }, []);

  const usersPerPage = 10;
  const lastConferenceIndex = currentPage * usersPerPage;
  const firstConferenceIndex = lastConferenceIndex - usersPerPage;
  const currentApplications = allApplications.slice(
    firstConferenceIndex,
    lastConferenceIndex
  );

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
                  Maqola
                  <ArrowUpDown className="h-4 w-4" />
                </div>
                <span className="w-[250px]">Muharrir</span>
                <span className="w-[250px]">Jo&apos;natuvchi</span>
                <div className="flex flex-row justify-between w-[200px]">
                  <span className="text-center w-[100px]">Status</span>
                  <span className="text-end w-[100px]">To&apos;lov</span>
                </div>
              </div>
              {currentApplications.length > 0 ? (
                <div className="flex flex-col gap-y-[9px] w-full">
                  {currentApplications
                    ?.filter(
                      (app) =>
                        app.name
                          ?.toLowerCase()
                          // .includes(searchTerm.toLowerCase())
                          .replace(/\s+/g, "")
                          .includes(
                            searchTerm.toLowerCase().replace(/\s+/g, "")
                          ) ||
                        app.owner.fullName
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(
                            searchTerm.toLowerCase().replace(/\s+/g, "")
                          ) ||
                        app.reviewer.fullName
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(
                            searchTerm.toLowerCase().replace(/\s+/g, "")
                          )
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
                          {app.reviewer?.fullName ? (
                            highlightSearchTerm(
                              app.reviewer.fullName,
                              searchTerm
                            )
                          ) : (
                            <span className="text-typered">
                              Birlashtirilmagan
                            </span>
                          )}
                        </span>
                        <span className="w-[250px]">
                          {highlightSearchTerm(app.owner.fullName, searchTerm)}
                        </span>
                        <div className="flex flex-row justify-between w-[200px]">
                          <div className="w-[100px] flex justify-center">
                            <Button
                              className={`capitalize text-white rounded-2xl text-center py-1.5 px-4 bg-typegreen hover:bg-typegreen/85 ${
                                app.status === "FEEDBACK" && "bg-typeyellow hover:bg-typeyellow/85"
                              }`}
                            >
                              {app.status}
                            </Button>
                          </div>
                          <div className="w-[100px] flex justify-end">
                            <Button
                              className={`capitalize text-white rounded-2xl text-center py-1.5 px-4 bg-typegreen hover:bg-typegreen/85 ${
                                app.paymentStatus === "UNPAID" &&
                                "bg-typeyellow hover:bg-typeyellow/85"
                              }`}
                            >
                              {app.paymentStatus}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full flex items-center justify-center h-[200px] text-xl font-semibold font-source-serif-pro text-muted-foreground border border-solid rounded-xl">
                  Hozircha biriktirilgan maqolalar yo&apos;q!
                </div>
              )}
            </>
          )}
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
