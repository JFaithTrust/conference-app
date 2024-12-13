"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import CustomButton from "../ui/CustomButton";
import axios from "@/fetch_api/axios";
import {access_token} from "@/fetch_api/token";
import {ToastAction} from "../ui/toast";
import {toast} from "../ui/use-toast";
import {AddPageNumberFormSchema} from "@/lib/validation";

const AddPageNumberForm = ({id, appPages}: { id: number, appPages?: string | undefined }) => {

    const form = useForm<z.infer<typeof AddPageNumberFormSchema>>({
        resolver: zodResolver(AddPageNumberFormSchema),
        defaultValues: {
            pages: appPages || "",
        },
    });

    function onSubmit(values: z.infer<typeof AddPageNumberFormSchema>) {
        axios
            .post(`/api/application/add_pages/${id}?pages=${values.pages}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                if (res) {
                    toast({
                        title: "Sahifa muvaffaqiyatli qo'shildi",
                        variant: "default",
                    });
                    form.reset();
                }
            })
            .catch((err) => {
                toast({
                    title: err?.response?.data?.message,
                    variant: "destructive",
                    action: (
                        <ToastAction altText="Try again">Qayta urinish</ToastAction>
                    ),
                });
            });
    }

    const {isSubmitting} = form.formState;

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex gap-x-4 items-end"
                >
                    <FormField
                        control={form.control}
                        name="pages"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sahifa raqami</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="1-10"
                                        className="border-[1px] border-solid border-violet-200"
                                        {...field}
                                        readOnly={!!appPages}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {!appPages && (
                        <CustomButton
                            disabled={isSubmitting}
                            label={"Qo'shish"}
                            success
                            classNames="py-2 px-4 rounded-md"
                        />
                    )}
                </form>
            </Form>
        </>
    );
};

export default AddPageNumberForm;