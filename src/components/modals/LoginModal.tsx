"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import Modal from "../ui/Modal";
import axios from "@/fetch_api/axios";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validation";

export default function LoginModal() {
  const [error, setError] = useState("");
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        values
      );
      if (data.success) {
        loginModal.onClose();
        localStorage.setItem("access_token", data.token);
        const userToken = localStorage.getItem("access_token");
        const encodedData = userToken?.split(".")[1];
        const { role } = JSON.parse(atob(encodedData || ""));
        localStorage.setItem("role", role);
        if (role === "SUPER_ADMIN") {
          router.replace("/dashboard");
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const { isSubmitting } = form.formState;

  const body = (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-[48px] pt-[48px] pb-[15px] flex flex-col justify-center items-center gap-[30px] w-[504px]"
        >
          <h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
            Log in
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
          <CustomButton
            mainable
            type="submit"
            label={"Log in"}
            disabled={isSubmitting}
            classNames="py-[12px] px-[120px] rounded-2xl text-xl font-medium leading-[100%]"
          />
        </form>
      </Form>
    </>
  );

  const footer = (
    <div className="mb-4 text-xs text-mainindigo flex flex-col text-left px-[110px]">
      <p>
        I have not an account
        <span
          className="cursor-pointer underline text-mainindigo hover:no-underline ml-3"
          onClick={onToggle}
        >
          Create an account
        </span>
      </p>
      <p>
        I forget my password
        <span
          className="cursor-pointer underline text-mainindigo hover:no-underline ml-3"
          onClick={onToggle}
        >
          Create new password
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={body}
      footer={footer}
      bg="bg-[#DCDBFA]"
      classNames="w-fit"
    />
  );
}
