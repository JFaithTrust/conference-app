import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserInfo, updateUserFullName } from "@/fetch_api/fetchUsers";
import { UserType } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Topbar = () => {
  const [user, setUser] = useState<UserType>();
  // edit user name
  const [editedName, setEditedName] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("access_token");
      const role = window.localStorage.getItem("role");
      if (token && role) {
        getUserInfo().then((res) => setUser(res));
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("access_token");
      router.push("/");
    }
  };

  // update user name handler
  const handleUpdateName = async() => {
    if (editedName.length > 0) {
      try {
        const data = await updateUserFullName(editedName);
        setUser(data);
        toast({
          title: "F.I.SH muvaffaqiyatli o'zgartirildi",
          variant: "default",
        });
      } catch (error: any) {
        toast({
          title: error?.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      }
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mt-[12px] mx-[23px] px-[18px] py-[9px] bg-mainwhite shadow-[0px_0px_4px_1px_#DCDBFA] rounded-xl mb-[48px]">
      <h2 className="font-medium">Name of Conference</h2>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row items-center justify-center gap-[12px]">
          <Image
            className="relative overflow-hidden shrink-0 object-cover"
            alt=""
            src="/icons/flag.svg"
            width={20}
            height={16}
          />
          <span className="font-medium">Uzbek</span>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="flex flex-row items-center justify-center py-[5px] px-[10px] rounded-md">
              <div className="flex flex-col text-xs font-medium w-24">
                <span>{user?.fullName}</span>
              </div>
              <FaRegCircleUser className="w-7 h-7 text-blue-500 stroke-[0.5]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className={"flex flex-col gap-y-1"}>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="p-2.5 rounded text-sm flex flex-row justify-between bg-mainindigo text-mainwhite hover:bg-mainindigo/85 transition-all duration-200 ease-in-out w-full">
                  Profile
                  <FaUser className="w-5 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Profilni tahrirlash</SheetTitle>
                  <SheetDescription>
                    Bu yerda profilingizga oʻzgartirishlar kiriting. Ishingiz
                    tugagach, saqlash tugmasini bosing.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-row justify-between items-center gap-x-2">
                    <Label htmlFor="name" className="text-right">
                      F.I.SH
                    </Label>
                    <Input
                      placeholder="Yo'nalish nomi"
                      defaultValue={user?.fullName}
                      onChange={(event) => setEditedName(event.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <div className="w-full flex justify-end">
                      <Button
                        className="p-2.5 rounded text-sm flex flex-row justify-between bg-typegreen text-mainwhite hover:bg-typegreen/85 transition-all duration-200 ease-in-out w-fit"
                        type="submit"
                        onClick={handleUpdateName}
                      >
                        Saqlash
                      </Button>
                    </div>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Button
              onClick={handleLogout}
              className="p-2.5 rounded text-sm flex flex-row justify-between bg-typered text-mainwhite hover:bg-typered/85 transition-all duration-200 ease-in-out w-full"
            >
              Chiqish
              <ArrowRight className="w-5 h-4" />
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Topbar;
