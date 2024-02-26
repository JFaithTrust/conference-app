"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { getAllDirections } from "@/fetch_api/fetchDirtection";
import { DirectionType, UserType } from "@/types";
import { getAllUsers, getUserByDirectionId } from "@/fetch_api/fetchUsers";
import { UserAddForm } from "@/components/forms";
import useUserAddModal from "@/hooks/useUserAddModal";
import axios from "@/fetch_api/axios";
import { access_token } from "@/fetch_api/token";
import CustomPagination from "@/components/ui/CustomPagination";
import Loading from "@/app/(home)/home_components/loading/Loading";

const ConferenceType = () => {
  const [open, setOpen] = useState(0);
  const [allDirections, setAllDirections] = useState<DirectionType[]>([]);
  const [directionId, setDirectionId] = useState<number>();
  const [reviewers, setReviewers] = useState<UserType[]>([]);
  const [allReviewers, setAllReviewers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const directionPerPage = 6;
  const lastDirectionIndex = currentPage * directionPerPage;
  const firstDirectionIndex = lastDirectionIndex - directionPerPage;
  const currentDirection = allDirections.slice(
    firstDirectionIndex,
    lastDirectionIndex
  );
  const router = useRouter();

  const userAddModal = useUserAddModal();

  const onOpenUserAddModal = useCallback(() => {
    userAddModal.onOpen();
  }, [userAddModal]);

  useEffect(() => {
    if (directionId) {
      const getData = async () => {
        const data = await getUserByDirectionId(directionId);
        const reviewers = await getAllUsers("REVIEWER");
        setAllReviewers(
          reviewers.filter(
            (item) => !data.map((item2) => item2.id).includes(item.id)
          )
        );
        setReviewers(data);
      };
      getData();
    }
  }, [directionId]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllDirections();
      setAllDirections(data);
      setLoading(false);
    };
    getData();
  }, []);

  const toggleClick = (id: number) => {
    setDirectionId(id);
    setOpen(id === open ? 0 : id);
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

  const handleDelate = (id: number) => {
    try {
      setReviewers(reviewers.filter((item) => item.id !== id));
      const reviewerId = { id: id };
      axios.put(`/api/direction/removeReviewer/${directionId}`, reviewerId, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <UserAddForm allUsers={allReviewers} directionId={directionId} />
      <div className="w-full">
        <div className="flex items-center py-4 justify-between">
          <Button
            className="bg-white text-typeblue hover:bg-white/90 px-[30px] py-[12px]"
            onClick={() =>
              router.push("/dashboard/conference/type/type-create")
            }
          >
            <HiOutlinePlus className="mr-2 h-4 w-4" />
            Create
          </Button>
          <Input
            placeholder="Yo'nalish nomi bo'yicha qidiring..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-2xl border bg-mainwhite flex flex-col gap-y-3 p-[18px]">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="py-[12px] font-source-serif-pro text-xl font-semibold">
                Konferensiya yo&apos;nalishlari
              </h2>
              {allDirections.length > 0 ? (
                <>
                  {currentDirection
                    ?.filter((d) =>
                      d.name
                        ?.toLowerCase()
                        // .includes(searchTerm.toLowerCase())
                        .replace(/\s+/g, "")
                        .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
                    )
                    .map((item) => (
                      <div key={item.id} className="flex flex-col gap-y-1.5">
                        <div className="flex flex-col">
                          <div
                            className={`flex flex-row justify-between items-center p-[12px] border-[1px] rounded-xl border-[#E2DEDE] ${
                              open === item.id && "border-b-0 rounded-b-none"
                            }`}
                          >
                            <p className="text-lg font-medium">
                              {highlightSearchTerm(item.name, searchTerm)}
                            </p>
                            <Button
                              className="px-3 py-1.5 bg-typeblue hover:bg-typeblue/85"
                              onClick={() => toggleClick(item.id)}
                            >
                              <MdOutlineKeyboardArrowDown
                                className={`h-6 w-6 ${
                                  open === item.id && "rotate-180"
                                }`}
                              />
                              <span>Editors</span>
                            </Button>
                          </div>
                          <div
                            className={`flex flex-col border-[1px] p-[12px] rounded-xl border-[#E2DEDE] gap-y-3 ${
                              open === item.id ? "rounded-t-none" : "hidden"
                            }`}
                          >
                            <Button
                              className="px-[30px] py-[9px] bg-typeyellow hover:bg-typeyellow/85 rounded-xl w-fit"
                              onClick={onOpenUserAddModal}
                            >
                              {" "}
                              + Muharrir qo&apos;shish
                            </Button>
                            {reviewers.map((reviewer) => (
                              <div
                                key={reviewer.id}
                                className="flex items-center justify-between p-[6px] border-[1px] rounded-xl border-[#E2DEDE]"
                              >
                                <p className="text-base font-normal p-[6px] w-[200px] overflow-hidden">
                                  {reviewer.fullName}
                                </p>
                                <p className="text-base font-normal p-[6px]">
                                  {reviewer.phoneNumber}
                                </p>
                                <div className="flex items-center gap-x-[30px]">
                                  <Button className="bg-typegreen hover:bg-typegreen/85 px-[12px] py-[6px]">
                                    {reviewer.userStatus}
                                  </Button>
                                  <Button
                                    className="bg-typered hover:bg-typered/85 px-[12px] py-[6px]"
                                    onClick={() => handleDelate(reviewer.id)}
                                  >
                                    <RiDeleteBin6Line className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="w-full flex items-center justify-center h-[200px] text-xl font-semibold font-source-serif-pro text-muted-foreground border border-solid rounded-xl">
                  Konferensiya yo&apos;nalishlari mavjud emas!
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center py-4 justify-end">
          {allDirections.length > directionPerPage && (
            <CustomPagination
              totalPosts={reviewers.length}
              postsPerPage={directionPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceType;
