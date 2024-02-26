"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useUserAddModal from "@/hooks/useUserAddModal";
import { getAllUsers } from "@/fetch_api/fetchUsers";
import { UserType } from "@/types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { DirectionAddSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "@/fetch_api/axios";
import { access_token } from "@/fetch_api/token";
import ReviewerAddForm from "@/components/forms/ReviewerAddForm";
import Loading from "@/app/(home)/home_components/loading/Loading";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const TypeCreate = () => {
  const [allReviewers, setAllReviewers] = useState<UserType[]>([]);
  const [reviewersId, setReviewersId] = useState([] as string[]);
  const [editorData, setEditorData] = useState<UserType[]>([]);
  // const [deletedItem, setDeletedItem] = useState("");
  const [editedReviewers, setEditedReviewers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userAddModal = useUserAddModal();

  const onOpenUserAddModal = useCallback(() => {
    userAddModal.onOpen();
  }, [userAddModal]);

  useEffect(() => {
    const getUsers = async () => {
      const reviewers = await getAllUsers("REVIEWER");
      setAllReviewers(reviewers);
      setEditedReviewers(reviewers);
      setLoading(false);
    };
    getUsers();
  }, []);

  useEffect(() => {
    setEditorData(
      allReviewers.filter((item) => reviewersId.includes(item.id.toString()))
    );
    setEditedReviewers(
      allReviewers.filter((item) => !reviewersId.includes(item.id.toString()))
    );
    // else{
    //   setEditedReviewers(allReviewers)
    // }
  }, [reviewersId]);

  const handleDelete = (id: string) => {
    // const deleteReviewersId = reviewersId.filter((item) => {
    //   return item !== id;
    // });
    // const deleted = reviewersId.find((item) => item === id);
    setReviewersId(reviewersId.filter((item) => item !== id));
  };

  const form = useForm<z.infer<typeof DirectionAddSchema>>({
    resolver: zodResolver(DirectionAddSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof DirectionAddSchema>) {
    try {
      const response = await axios.post("/api/direction", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;
      if (data) {
        toast({
          title: "Yo'nalish muvaffaqiyatli yaratildi",
          variant: "default",
        });
      }

      if (reviewersId.length !== 0) {
        const usersIdList: any[] = [];
        reviewersId.forEach((id) => {
          usersIdList.push({
            id: id,
          });
        });

        const res = await axios.put(
          `/api/direction/addReviewer/${data.id}`,
          usersIdList,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (res.data) {
          toast({
            title: "Yo'nalish muvaffaqiyatli qo'shildi",
            variant: "default",
          });
        }

        setEditorData([]);
      }
      form.reset();
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[800px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <ReviewerAddForm
        allReviewers={editedReviewers}
        setReviewersId={setReviewersId}
        // addingItem={deletedItem}
      />
      <Button
        className="w-fit px-[18px] py-[12px] flex gap-y-2"
        variant="active"
        onClick={() => router.back()}
      >
        <FaArrowLeftLong className="text-white w-6 h-4" />
        Back
      </Button>
      <div className="p-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[18px]"
          >
            <h2 className="font-semibold font-source-serif-pro text-3xl">
              Yangi yo&apos;nalish yaratish
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-xl border-[1px] border-solid border-[#DCDBFA] p-3"
                      placeholder="Yo'nalish nomi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="rounded-xl border-[1px] border-solid border-[#DCDBFA] p-3 flex flex-col gap-y-[18px]">
              <Button
                className="px-[24px] py-[9px] bg-typeyellow hover:bg-typeyellow/85 rounded-xl w-fit"
                type="button"
                onClick={onOpenUserAddModal}
              >
                {" "}
                + Muharrir qoshish
              </Button>
              {editorData &&
                editorData.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between p-1.5 items-center border-[1px] border-solid border-[#DCDBFA] rounded-xl"
                  >
                    <span className="text-base font-normal">
                      {item.fullName}
                    </span>
                    <span className="text-base font-normal">
                      {item.phoneNumber}
                    </span>
                    <div className="flex items-center gap-x-3">
                      <Button className="py-1.5 px-3 rounded-xl bg-typegreen hover:bg-typegreen/85">
                        {item.userStatus}
                      </Button>
                      <Button
                        variant={"destructive"}
                        className="py-1.5 px-3 rounded-xl"
                        onClick={() => handleDelete(item.id.toString())}
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="py-3 px-5 rounded-xl bg-typegreen hover:bg-typegreen/85 w-fit"
                type="submit"
              >
                Saqlash
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TypeCreate;
