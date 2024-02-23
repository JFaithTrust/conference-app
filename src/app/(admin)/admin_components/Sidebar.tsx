import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFileExport, FaHome, FaRegUser } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  FaFileCircleCheck,
  FaFileCirclePlus,
  FaUsersGear,
} from "react-icons/fa6";
import { FiType } from "react-icons/fi";
import { MdArticle } from "react-icons/md";

const Sidebar = () => {
  const [isClient, setIsClient] = useState(false);
  const [userRole, setuserRole] = useState("");
  const [isOpenConf, setIsOpenConf] = useState(false);
  const [isOpenArt, setIsOpenArt] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setuserRole(localStorage.getItem("role") || "");
    }
    setIsClient(true);
  }, []);

  const toggleLink = (id: number) => {
    switch (id) {
      case 0:
        setIsOpenConf(false);
        setIsOpenArt(false);
        break;
      case 1:
        setIsOpenConf(!isOpenConf);
        setIsOpenArt(false);
        break;
      case 2:
        setIsOpenConf(false);
        setIsOpenArt(!isOpenArt);
        break;
      case 3:
        setIsOpenConf(false);
        setIsOpenArt(false);
        break;
      case 4:
        setIsOpenConf(false);
        setIsOpenArt(false);
      default:
        break;
    }
  };

  return (
    <div className="w-[280px] min-h-screen py-[18px] px-[32px] flex flex-col gap-y-[18px]">
      <div className="p-[12px]">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#3EBD80] to-[#3EFEA1]">
          Conference-List
        </h2>
      </div>
      {isClient && (
        <>
          <ul className="flex flex-col gap-y-[14px] pl-[20px] items-start">
            <li>
              <Link href="/dashboard" prefetch={true}>
                <Button
                  className={`gap-4 w-[180px] font-roboto text-lg justify-start pl-[18px] py-[6px] ${
                    pathname === "/dashboard"
                      ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                      : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => toggleLink(0)}
                >
                  <FaHome />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/conference" prefetch={true}>
                <Button
                  className={`gap-4 w-[180px] font-roboto text-lg justify-start pl-[18px] py-[6px] ${
                    pathname.startsWith("/dashboard/conference")
                      ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                      : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => toggleLink(1)}
                >
                  <HiOutlineUserGroup />
                  Konferensiya
                </Button>

                {isOpenConf && userRole === "SUPER_ADMIN" && (
                  <div
                    className={`bg-herowhite flex flex-col gap-y-2 px-5 py-2 rounded-b-xl`}
                  >
                    <Link href="/dashboard/conference" prefetch={true}>
                      <Button
                        className={`gap-4 font-roboto text-sm justify-start w-full p-[6px] ${
                          pathname.startsWith("/dashboard/conference") &&
                          !pathname.startsWith("/dashboard/conference/type")
                            ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                            : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <FaUsersGear />
                        Konferensiyalar
                      </Button>
                    </Link>
                    <Link href="/dashboard/conference/type" prefetch={true}>
                      <Button
                        className={`gap-4 font-roboto text-sm justify-start w-full p-[6px] ${
                          pathname.startsWith("/dashboard/conference/type")
                            ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                            : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <FiType />
                        Yo&apos;nalishlar
                      </Button>
                    </Link>
                  </div>
                )}
              </Link>
            </li>
            <li>
              <Link
                href={`${
                  userRole !== "SUPER_ADMIN"
                    ? "/dashboard/articles/editor"
                    : "/dashboard/articles"
                }`}
                prefetch={true}
              >
                <Button
                  className={`gap-4 w-[180px] font-roboto text-xl justify-start pl-[18px] py-[6px] ${
                    pathname.startsWith("/dashboard/articles")
                      ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                      : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => toggleLink(2)}
                >
                  <MdArticle />
                  Maqola
                </Button>

                {isOpenArt && userRole === "SUPER_ADMIN" && (
                  <div
                    className={`bg-herowhite flex flex-col gap-y-2 px-5 py-2 rounded-b-xl`}
                  >
                    <Link href="/dashboard/articles" prefetch={true}>
                      <Button
                        className={`gap-4 font-roboto text-sm justify-start w-full p-[6px] ${
                          pathname === "/dashboard/articles"
                            ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                            : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <FaFileCirclePlus />
                        Biriktirish
                      </Button>
                    </Link>
                    <Link href="/dashboard/articles/send" prefetch={true}>
                      <Button
                        className={`gap-4 font-roboto text-sm justify-start w-full p-[6px] ${
                          pathname.startsWith("/dashboard/articles/send")
                            ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                            : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <FaFileExport />
                        Biriktirilgan
                      </Button>
                    </Link>
                    <Link href="/dashboard/articles/mistake" prefetch={true}>
                      <Button
                        className={`gap-4 font-roboto text-sm justify-start w-full p-[6px] ${
                          pathname.startsWith("/dashboard/articles/mistake")
                            ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                            : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <FaFileCircleCheck />
                        Qabul qilingan
                      </Button>
                    </Link>
                  </div>
                )}
              </Link>
            </li>
            {userRole === "SUPER_ADMIN" && (
              <>
                <li>
                  <Link href="/dashboard/reviewers" prefetch={true}>
                    <Button
                      className={`gap-4 w-[180px] font-roboto text-lg justify-start pl-[18px] py-[6px] ${
                        pathname === "/dashboard/reviewers"
                          ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                          : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                      }`}
                      onClick={() => toggleLink(3)}
                    >
                      <ImUserTie />
                      Muharrir
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/users" prefetch={true}>
                    <Button
                      className={`gap-4 w-[180px] font-roboto text-lg justify-start pl-[18px] py-[6px] ${
                        pathname.startsWith("/dashboard/users")
                          ? "bg-admingreen border-none hover:bg-admingreen/85 text-white"
                          : "bg-transparent text-admingreen hover:text-admingreen/85 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                      }`}
                      onClick={() => toggleLink(4)}
                    >
                      <FaRegUser />
                      Foydalanuvchi
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
