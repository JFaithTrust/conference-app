"use client";

import {AddDOIFormSchema} from "@/lib/validation";
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
import {useRouter} from "next/navigation";

const AddDOIForm = ({id, appDoi}: { id: number, appDoi?: string | undefined }) => {
    const form = useForm<z.infer<typeof AddDOIFormSchema>>({
        resolver: zodResolver(AddDOIFormSchema),
        defaultValues: {
            doi: appDoi || "",
        },
    });

    function onSubmit(values: z.infer<typeof AddDOIFormSchema>) {
        axios
            .post(`/api/application/add_doi/${id}?doi=${values.doi}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                if (res) {
                    toast({
                        title: "DOI muvaffaqiyatli qo'shildi",
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
                        name="doi"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>DOI raqami</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="1H2J3K4L5M6N7O8P9Q"
                                        className="border-[1px] border-solid border-violet-200"
                                        {...field}
                                        readOnly={!!appDoi}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {!appDoi && (
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

export default AddDOIForm;
