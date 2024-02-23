"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { registerSchema, ConfirmPhoneCodeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
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

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState({ phoneNumber: "", password: "" });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const body =
    step === 1 ? (
      <RegisterStep1 setSaved={setSaved} setStep={setStep} />
    ) : (
      <RegisterStep2 saved={saved} />
    );

  const footer = (
    <div className="mb-4 text-sm text-mainindigo/80 flex flex-col text-left px-[110px]">
      <p>
        I have already an account
        <span
          className="cursor-pointer underline text-mainindigo hover:no-underline ml-3"
          onClick={onToggle}
        >
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={body}
      footer={footer}
      bg="bg-[#DCDBFA]"
      classNames="w-fit"
    />
  );
};

export default RegisterModal;

function RegisterStep1({
  setSaved,
  setStep,
}: {
  setSaved: Dispatch<SetStateAction<{ phoneNumber: string; password: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+998",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const { data } = await axios.post("/api/auth/register", values);
      if (data.success) {
        setSaved({
          phoneNumber: values.phoneNumber,
          password: values.password,
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
        <h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
          Create an account
        </h1>
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...field}
                  className="w-[400px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
  );
}

function RegisterStep2({
  saved,
}: {
  saved: { phoneNumber: string; password: string };
}) {
  const registerModal = useRegisterModal();

  const form = useForm<z.infer<typeof ConfirmPhoneCodeSchema>>({
    resolver: zodResolver(ConfirmPhoneCodeSchema),
    defaultValues: {
      smsCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ConfirmPhoneCodeSchema>) {
    try {
      const { data: response } = await axios.post("/api/auth/activate", {
        ...saved,
        ...values,
      });
      if (response.success) {
        const { data } = await axios.post("/api/auth/login", {
          phoneNumber: saved.phoneNumber,
          password: saved.password,
        });
        registerModal.onClose();
        localStorage.setItem("access_token", data.token);
        const userToken = localStorage.getItem("access_token");
        const encodedData = userToken?.split(".")[1];
        const { role } = JSON.parse(atob(encodedData || ""));
        localStorage.setItem("role", role);
        window.location.reload();
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
            Confirm Phone Number
          </h1>
          <p className="text-sm text-mainindigo/80">
            We have sent you an SMS with a code to your phone number. Please
            enter the code in the field below.
          </p>
          <FormField
            name="smsCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Code"
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
