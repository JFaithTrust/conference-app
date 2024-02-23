"use client";

import CustomPagination from "@/components/ui/CustomPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApplicationByCurrentUser } from "@/fetch_api/fetchApplications";
import { ApplicationType } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../home_components/loading/Loading";

const Articles = () => {
  const [allApplications, setAllApplications] = useState<ApplicationType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortByConferenceName, setSortByConferenceName] = useState<
    "asc" | "desc"
  >("asc");
  const [sortByName, setSortByName] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getAllAplications = async () => {
      const applications = await getApplicationByCurrentUser();
      setAllApplications(applications);
      setLoading(false);
    };
    getAllAplications();
  }, []);

  const router = useRouter();
  const applicationsPerPage = 10;
  const lastConferenceIndex = currentPage * applicationsPerPage;
  const firstConferenceIndex = lastConferenceIndex - applicationsPerPage;
  const currentApplications = allApplications.slice(
    firstConferenceIndex,
    lastConferenceIndex
  );

  const handleSortByConferenceName = () => {
    setSortByConferenceName(sortByConferenceName === "asc" ? "desc" : "asc");
    setAllApplications(
      [...allApplications].sort((a, b) => {
        const nameA = a.conference?.name?.toLocaleLowerCase().trim();
        const nameB = b.conference?.name?.toLocaleLowerCase().trim();
        if (sortByConferenceName === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      })
    );
  };

  const handleSortByName = () => {
    setSortByName(sortByName === "asc" ? "desc" : "asc");
    setAllApplications(
      [...allApplications].sort((a, b) => {
        const nameA = a.name?.toLocaleLowerCase().trim();
        const nameB = b.name?.toLocaleLowerCase().trim();
        if (sortByName === "asc") {
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

  const handleClick = (status: string, id: number) => {
    if (status === "ACCEPTED") {
      router.push(`/articles/${id}`)
    }else if ( status === "FEEDBACK"){
      router.push(`/articles-resend/${id}`)
    } else {
      return
    }
  };

  if (loading) {
    return (
      <div className="px-[170px] py-[60px] flex flex-col gap-y-[30px]">
        <div className="text-[34px] font-source-serif-pro font-semibold text-start">
          Mening Maqolalarim
        </div>
        <div className="p-[30px] border-[1px] border-[#DEDBFF] border-solid rounded-2xl bg-mainwhite flex items-center justify-center h-[200px]">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="px-[170px] py-[60px] flex flex-col gap-y-[30px]">
      <div className="text-[34px] font-source-serif-pro font-semibold text-start">
        Mening Maqolalarim
      </div>
      <div className="p-[30px] border-[1px] border-[#DEDBFF] border-solid rounded-2xl bg-mainwhite">
        {allApplications.length > 0 ? (
          <>
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
                  onClick={handleSortByConferenceName}
                >
                  Konferensiya nomi
                  <ArrowUpDown className="h-4 w-4" />
                </div>
                <div
                  className="flex flex-row gap-x-1 items-center w-[350px] cursor-pointer text-start"
                  onClick={handleSortByName}
                >
                  Maqola
                  <ArrowUpDown className="h-4 w-4" />
                </div>

                <div className="flex flex-row justify-between w-[200px]">
                  <span className="text-center w-[100px]">Status</span>
                  <span className="text-center">To&apos;lov</span>
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
                        .includes(
                          searchTerm.toLowerCase().replace(/\s+/g, "")
                        ) ||
                      app.conference?.name
                        .toLowerCase()
                        .replace(/\s+/g, "")
                        .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
                  )
                  .map((app) => (
                    <div
                      key={app.id}
                      // onClick={() =>
                      //   router.push(`/dashboard/articles/send/${app.id}`)
                      // }
                      className={`flex flex-row pl-3 pr-1.5 py-1 items-center w-full text-lg font-norma bg-transparent hover:bg-slate-200 border-[1px] border-solid rounded-lg cursor-pointer transition-all duration-300 ease-in-out justify-between 
                        ${
                          app.status === "NEW" || app.status === "ACCEPTED"
                            ? "border-typegreen border:bg-typegreen/85"
                            : "border-typeyellow hover:border-typeyellow/85"
                        }
                        `}
                      onClick={() => handleClick(app.status, app.id)}
                    >
                      <span className="w-[48px]">{app.id}</span>
                      <span className="w-[350px] text-start overflow-hidden truncate">
                        {highlightSearchTerm(app.conference?.name, searchTerm)}
                      </span>
                      <span className="w-[350px] text-start overflow-hidden truncate">
                        {highlightSearchTerm(app.name, searchTerm)}
                      </span>

                      <div className="flex flex-row justify-between w-[200px]">
                        <div className="w-[100px] flex justify-center">
                          <Button
                            className={`text-white rounded-2xl text-center py-1.5 px-4 ${
                              app.status === "NEW" || app.status === "ACCEPTED"
                                ? "bg-typegreen hover:bg-typegreen/85"
                                : "bg-typeyellow hover:bg-typeyellow/85"
                            }`}
                          >
                            {app.status.charAt(0).toUpperCase() +
                              app.status.slice(1).toLowerCase()}
                          </Button>
                        </div>
                        <div className="w-[100px] flex justify-end">
                          <Button
                            className={`text-white rounded-2xl text-center py-1.5 px-4 ${
                              app.paymentStatus === "PAID"
                                ? "bg-typegreen hover:bg-typegreen/85"
                                : "bg-typeyellow hover:bg-typeyellow/85"
                            }`}
                          >
                            {app.paymentStatus?.charAt(0).toUpperCase() +
                              app.paymentStatus?.slice(1).toLowerCase()}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex items-center py-4 justify-end">
              {allApplications.length > applicationsPerPage && (
                <CustomPagination
                  totalPosts={allApplications.length}
                  postsPerPage={applicationsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-2xl text-gray-500">
            Maqolalar topilmadi
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
