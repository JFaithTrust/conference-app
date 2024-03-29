import { ChildProps } from "@/types";
import React, { Suspense } from "react";
import { LoginModal, RegisterModal } from "@/components/modals";
import { Footer, Navbar, Partners } from "./home_components";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";

const HomeLayout = ({ children }: ChildProps) => {
  const items = [
    { image: "/images/image_1.png" },
    { image: "/images/image_2.png" },
    { image: "/images/image_3.png" },
    { image: "/images/image_1.png" },
    { image: "/images/image_2.png" },
    { image: "/images/image_3.png" },
  ];
  return (
    <div className="min-h-screen w-full">
      <ForgotPasswordModal />
      <RegisterModal />
      <LoginModal />
      <Navbar />
      <main className="w-full min-h-screen">{children}</main>
      <div className="w-full flex justify-end py-[20px]">
        <div className="rounded-tl-2xl rounded-tr-none rounded-br-none rounded-bl-2xl bg-herowhite w-[1600px] h-[122px] flex flex-row items-center justify-start py-5 px-[50px] box-border gap-[50px]">
          <Partners items={items} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
