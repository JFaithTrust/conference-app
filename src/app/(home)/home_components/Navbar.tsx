"use client";

import CustomButton from "@/components/ui/CustomButton";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        setIsAuth(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("access_token")]);

  return (
    <>
      <div className="flex flex-row items-center justify-center py-0 px-5 my-[20px] w-full">
        <div className="flex-1 rounded bg-mainwhite shadow-[0px_0px_4px_1px_#dcdbfa] overflow-hidden flex flex-row items-center justify-between py-3.5 px-[18px]">
          <Link
            href={"/"}
            className="rounded box-border h-[42px] overflow-hidden flex flex-row items-center justify-center py-0.5 px-3.5 text-mainindigo border-[2px] border-solid border-mainindigo"
          >
            <div className="relative leading-[100%] font-medium">Logo</div>
          </Link>
          <div className="shrink-0 flex flex-row items-center justify-center gap-[48px] text-xl">
            <div className="overflow-hidden flex flex-row items-center justify-start">
              <Link href={"/"} className="relative leading-[100%] font-medium">
                Bosh sahifa
              </Link>
            </div>
            {isAuth && (
              <div className="overflow-hidden flex flex-row items-center justify-start">
                <Link
                  href={"/articles"}
                  className="relative leading-[100%] font-medium"
                >
                  Mening maqolalarim
                </Link>
              </div>
            )}
            <div className="overflow-hidden flex flex-row items-center justify-start">
              <Link
                href={"/conferences"}
                className="relative leading-[100%] font-medium"
              >
                Konferensiyalar
              </Link>
            </div>
            <div className="shrink-0 flex flex-row items-center justify-start">
              <div className="relative leading-[100%] font-medium">
                Biz haqimizda
              </div>
            </div>
            <div className="overflow-hidden flex flex-row items-center justify-start">
              <div className="relative leading-[100%] font-medium">Aloqa</div>
            </div>
          </div>
          <div className="shrink-0 flex flex-row items-center justify-between gap-2">
            <div className="rounded-lg shrink-0 flex flex-col items-center justify-end p-2.5">
              <div className="overflow-hidden flex flex-row items-center justify-center gap-[12px]">
                <Image
                  className="relative overflow-hidden shrink-0 object-cover"
                  alt=""
                  width={20}
                  height={16}
                  src="/icons/flag.svg"
                />
                <span className="font-medium">Uzbek</span>
              </div>
            </div>
            {isAuth ? (
              <div className="flex flex-row items-center justify-center gap-3 text-mainindigo py-[5px] px-[10px] rounded-md border-[2px] border-solid border-mainindigo">
                <div className="flex flex-col text-xs font-medium">
                  <span>Solijoniy</span>
                  <span>Jahongir</span>
                </div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <>
                <CustomButton
                  label="Ro'yxatdan o'tish"
                  onClick={onOpenRegisterModal}
                  mainable
                  outlined
                  classNames="p-2.5 rounded text-sm"
                />
                <CustomButton
                  label="Kirish"
                  onClick={onOpenLoginModal}
                  mainable
                  notOulined
                  classNames="p-2.5 rounded text-sm"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
