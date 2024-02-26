"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { createPostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CustomButton from "../ui/CustomButton";
import { Label } from "../ui/label";
import { DirectionType } from "@/types";
import axios from "@/fetch_api/axios";
import { access_token } from "@/fetch_api/token";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

interface Props {
  name: string;
  id: number;
  direction: DirectionType[];
}

const ArticleForm = ({ name, id, direction }: Props) => {
  const [imageId, setimageId] = useState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedFile(file.name);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/api/attachment/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setimageId(res.data[0].id);
      })
      .catch((err) => console.log(err));
  };

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      name: "",
      authors: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof createPostSchema>) {
    const application = {
      name: values.name,
      authors: values.authors,
      description: values.description,
      thesisFile: { id: imageId },
      direction: { id: value },
      conference: { id: id },
    };
    axios
      .post("/api/application", application, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        if (res) {
          toast({
            title: "Maqola muvaffaqiyatli yuborildi",
            variant: "default",
          });
        }
      })
      .catch((err) => {
        toast({
          title: err?.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
        });
      });

    form.reset();
    setSelectedFile("");
    setValue("");
  }

  const { isSubmitting } = form.formState;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <div className="flex flex-col gap-y-3">
            <Label>Tanlangan Konferensiya</Label>
            <Input
              type="text"
              className="border-[1px] border-solid border-violet-200"
              value={name}
              readOnly
              disabled
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-[1px] border-solid border-violet-200 px-3 py-2"
              >
                {value
                  ? direction.find((d) => d.id.toString() === value)?.name
                  : "Yo'nalish tanlang..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[1500px] p-0">
              <Command>
                <CommandInput placeholder="Yo'nalish tanlang..." />
                <CommandEmpty>Yo&apos;nalish topilmadi.</CommandEmpty>
                <CommandGroup>
                  {direction.map((d) => (
                    <CommandItem
                      key={d.id}
                      value={d.id.toString()}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === d.id.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {d.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maqola nomi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Maqola nomi"
                    className="border-[1px] border-solid border-violet-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mualliflar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mualliflar"
                    className="border-[1px] border-solid border-violet-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tavsif</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Qisqacha tavsif yozing"
                    className="resize-none border-[1px] border-solid border-violet-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <div className="flex flex-col p-[18px] bg-mainwhite gap-6 rounded-xl border-[1px] border-solid border-violet-200">
              <h3 className="text-center text-sm leading-[100%] font-normal font-main-text">
                {selectedFile ? `Tanlangan fayl` : "Fayl yuklash"}
              </h3>
              <label className="cursor-pointer rounded-xl bg-typeyellow py-[12px] px-[48px] font-normal text-mainwhite font-main-text leading-[100%] text-lg">
                {selectedFile ? `${selectedFile}` : "Yuklash"}
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <CustomButton
              disabled={isSubmitting}
              label={"Submit"}
              success
              classNames="px-[48px] py-[12px] rounded-[19px]"
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ArticleForm;
