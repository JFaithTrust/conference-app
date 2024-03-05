"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../ui/Modal";
import axios from "@/fetch_api/axios";
import CustomButton from "../ui/CustomButton";
import { FeedbackSchema } from "@/lib/validation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import useFeedbackModal from "@/hooks/useFeedbackModal";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { putApplicationStatus } from "@/fetch_api/fetchApplications";

export default function FeedbackModal({ id }: { id: number }) {
  const feedbackModal = useFeedbackModal();

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FeedbackSchema>) {
    try {
      const postData = {
        text: values.text,
        application: {
          id: id,
        },
      };
      const { data } = await axios.post("/api/answer", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (data) {
        await putApplicationStatus(id, "FEEDBACK");
        feedbackModal.onClose();
        toast({
          title: "Izohingiz qabul qilindi!",
          variant: "default",
        });
      }
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
      });
    }
  }

  const { isSubmitting } = form.formState;

  const body = (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-[48px] py-[15px] flex flex-col justify-center items-center gap-[30px]"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Izoh</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Qisqacha izoh qoldiring..."
                    className="resize-none border-[1px] border-solid border-typeyellow w-[600px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between w-full">
            <Button
              type="button"
              className="rounded-2xl text-xl font-medium leading-[100%] py-3 px-8"
              variant={"destructive"}
              onClick={feedbackModal.onClose}
            >
              Bekor qilish
            </Button>
            <CustomButton
              success
              type="submit"
              label={"Yuborish"}
              disabled={isSubmitting}
              classNames="rounded-2xl text-xl font-medium leading-[100%] py-3 px-8"
            />
          </div>
        </form>
      </Form>
    </>
  );

  return (
    <Modal
      isOpen={feedbackModal.isOpen}
      onClose={feedbackModal.onClose}
      body={body}
      bg="bg-[#fff]"
      classNames="w-fit"
    />
  );
}
