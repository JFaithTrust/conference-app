"use client";

import {
  forgotPasswordSchema1,
  forgotPasswordSchema2,
  forgotPasswordSchema3,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/Modal";
import CustomButton from "../ui/CustomButton";
import axios from "@/fetch_api/axios";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
import useForgotPasswordModal from "@/hooks/useForgotPasswordModal";
import useLoginModal from "@/hooks/useLoginModal";

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState({ phoneNumber: "" });

  const body =
    step === 1 ? (
      <ForgotStep1 setSaved={setSaved} setStep={setStep} />
    ) : step === 2 ? (
      <ForgotStep2 saved={saved} setStep={setStep} />
    ) : (
      <ForgotStep3 saved={saved} />
    );

  return (
    <Modal
      isOpen={forgotPasswordModal.isOpen}
      onClose={forgotPasswordModal.onClose}
      body={body}
      bg="bg-[#DCDBFA]"
      classNames="w-fit"
    />
  );
};

export default ForgotPasswordModal;

function ForgotStep1({
  setSaved,
  setStep,
}: {
  setSaved: Dispatch<SetStateAction<{ phoneNumber: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof forgotPasswordSchema1>>({
    resolver: zodResolver(forgotPasswordSchema1),
    defaultValues: {
      phoneNumber: "+998",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema1>) {
    try {
      const { data } = await axios.post("/api/auth/forgot", values);
      if (data.success) {
        setSaved({
          phoneNumber: values.phoneNumber,
        });
        setStep(2);
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast({
          title: error?.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      } else {
        toast({
          title:
            "Qandaydir xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      }
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-[48px] pt-[48px] pb-[15px] flex flex-col justify-center items-center gap-[30px] w-[504px]"
      >
        <h1 className="px-0 py-0.5 leading-[100%] font-medium text-2xl text-mainindigo">
          Telefon Nomerizni Tasdiqlang
        </h1>
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  {...field}
                  className="w-[400px]"
                  maxLength={13}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          type="submit"
          disabled={isSubmitting}
          label={"Verify Phone Number"}
          mainable
          classNames="py-[12px] px-[100px] rounded-2xl text-xl font-medium leading-[100%]"
        />
      </form>
    </Form>
  );
}

function ForgotStep2({
  saved,
  setStep,
}: {
  saved: { phoneNumber: string };
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof forgotPasswordSchema2>>({
    resolver: zodResolver(forgotPasswordSchema2),
    defaultValues: {
      smsCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema2>) {
    try {
      const { data } = await axios.post("/api/auth/forgot/verify", {
        ...saved,
        ...values,
      });
      if (data.success) {
        setStep(3);
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast({
          title: error?.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      } else {
        toast({
          title:
            "Qandaydir xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      }
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-[48px] pt-[48px] pb-[15px] flex flex-col justify-center items-center gap-[30px] w-[504px]"
        >
          <h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
            Tasdiqlash
          </h1>
          <p>Telefon raqamingizga yuborilgan SMS kodni kiriting</p>
          <FormField
            name="smsCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="SMS Code"
                    {...field}
                    className="w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            label={"Verify Phone Number"}
            mainable
            classNames="py-[12px] px-[100px] rounded-2xl text-xl font-medium leading-[100%]"
          />
        </form>
      </Form>
    </div>
  );
}

function ForgotStep3({ saved }: { saved: { phoneNumber: string } }) {
  const forgotPasswordModal = useForgotPasswordModal();
  const loginModal = useLoginModal();

  const form = useForm<z.infer<typeof forgotPasswordSchema3>>({
    resolver: zodResolver(forgotPasswordSchema3),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema3>) {
    try {
      const { data: response } = await axios.post("/api/auth/reset", {
        ...saved,
        ...values,
      });
      if (response.success) {
        // const { data } = await axios.post("/api/auth/forgot/verify", {
        //   phoneNumber: saved.phoneNumber,
        // });
        forgotPasswordModal.onClose();
        loginModal.isOpen = true;
        // localStorage.setItem("access_token", data.token);
        // const userToken = localStorage.getItem("access_token");
        // const encodedData = userToken?.split(".")[1];
        // const { role } = JSON.parse(atob(encodedData || ""));
        // localStorage.setItem("role", role);
        // if (role === "SUPER_ADMIN") {
        //   router.replace("/dashboard");
        // }
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast({
          title: error?.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      } else {
        toast({
          title:
            "Qandaydir xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      }
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-[48px] pt-[48px] pb-[15px] flex flex-col justify-center items-center gap-[30px] w-[504px]"
        >
          <h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
            Parolni tiklash
          </h1>
          <p>Yangi parolni kiriting</p>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    className="w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            label={"Verify Phone Number"}
            mainable
            classNames="py-[12px] px-[100px] rounded-2xl text-xl font-medium leading-[100%]"
          />
        </form>
      </Form>
    </div>
  );
}
