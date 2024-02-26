"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useUserAddModal from "@/hooks/useUserAddModal";
import { userAddSchema } from "@/lib/validation";
import Modal from "../ui/Modal";
import { useState } from "react";
import { UserType } from "@/types";
import CustomPagination from "../ui/CustomPagination";
import { putAllUsers } from "@/fetch_api/fetchUsers";
import axios from "@/fetch_api/axios";
import { access_token } from "@/fetch_api/token";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

interface UserAddFormProps {
  allUsers: UserType[];
  directionId?: number;
}

const UserAddForm = ({ allUsers, directionId }: UserAddFormProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 10;
  const userAddModal = useUserAddModal();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = allUsers.slice(firstPostIndex, lastPostIndex);

  const form = useForm<z.infer<typeof userAddSchema>>({
    resolver: zodResolver(userAddSchema),
    defaultValues: {
      users: [],
    },
  });

  function onSubmit(data: z.infer<typeof userAddSchema>) {
    try {
      const usersIdList: any = [];
      data.users.forEach((id) => {
        usersIdList.push({
          id: id,
        });
      });
      if (directionId) {
        const { data } : any = axios.put(`/api/direction/addReviewer/${directionId}`, usersIdList, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (data) {
          toast({
            title: "Muvaffaqiyatli saqlandi",
            variant: "default",
          });
        }
      } else {
        putAllUsers(usersIdList);
      }
      userAddModal.onClose();
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
      });
    }
  }

  const body = (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="users"
            render={() => (
              <FormItem>
                <div className="flex flex-row justify-between">
                  <h1>Editor Tanlash</h1>
                  <div>
                    <Input
                      placeholder="Enter name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-[1px] border-solid rounded-xl border-[#E2DEDE]"
                    />
                  </div>
                </div>
                {currentPosts
                  .filter((user) =>
                    user.fullName
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                    <FormField
                      key={user.id}
                      control={form.control}
                      name="users"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={user.id}
                            className="flex flex-row items-center space-y-0 p-[6px] border-[1px] border-solid rounded-xl border-[#E2DEDE]"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(
                                  user.id.toString()
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        user.id.toString(),
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) =>
                                            value !== user.id.toString()
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal w-full">
                              <div className="flex flex-row justify-between">
                                <div className="p-[6px] w-[240px] flex items-center">
                                  {user.fullName}
                                </div>
                                <div className="p-[6px] flex items-center">
                                  {user.phoneNumber}
                                </div>
                                <Button
                                  className={`py-[6px] px-[12px] rounded-xl w-[100px] ${
                                    user.userStatus === "INACTIVE"
                                      ? "bg-typered hover:bg-typered/85"
                                      : "bg-typegreen hover:bg-typegreen/85"
                                  }`}
                                >
                                  {user.userStatus}
                                </Button>
                              </div>
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );

  const footer = (
    <>
      <div className="flex flex-row justify-between">
        <Button
          variant={"destructive"}
          onClick={userAddModal.onClose}
          className="px-[30px] py-[9px]"
        >
          Bekor qilish
        </Button>
        {allUsers.length > postsPerPage && (
          <CustomPagination
            totalPosts={allUsers.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="px-[27px] py-[9px] bg-typegreen hover:bg-typegreen/85"
        >
          Saqlash
        </Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={userAddModal.isOpen}
      onClose={userAddModal.onClose}
      classNames="w-[1000px] h-[720px] p-[18px]"
      body={body}
      bg="bg-white"
      footer={footer}
    />
  );
};

export default UserAddForm;
