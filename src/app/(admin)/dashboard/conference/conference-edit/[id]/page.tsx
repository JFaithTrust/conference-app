"use client";

import Loading from "@/app/(home)/home_components/loading/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/fetch_api/axios";
import { getConferenceById } from "@/fetch_api/fetchConference";
import {
  getAllDirections,
  getDirectionByConferenceId,
} from "@/fetch_api/fetchDirtection";
import { access_token } from "@/fetch_api/token";
import { cn } from "@/lib/utils";
import { ConferenceAddSchema } from "@/lib/validation";
import { ConferenceType, DirectionType } from "@/types";
import { format, set } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { z } from "zod";

const ConferenceEdit = ({ params }: { params: { id: number } }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [conferenceData, setConferenceData] = useState<ConferenceType>();
  const [loading, setLoading] = useState(true)

  const router = useRouter();

  useEffect(() => {
    const ConferenceData = async () => {
      const conference = await getConferenceById(params.id);
      const allDirections = await getAllDirections();
      const directions = await getDirectionByConferenceId(params.id);
      setConferenceData(conference);
      setDirection(allDirections);
      const selectedDirect = directions.map((d) => d.name.toLowerCase());
      setSelectedDirections(selectedDirect);
      if (conference) {
        form.setValue("name", conference.name);
        form.setValue("description", conference.description || "");
        form.setValue("requirements", conference.requirements || "");
        form.setValue("address", conference.address || "");
        form.setValue("cost", conference.cost || "");
        form.setValue("startsAt", new Date(conference.startsAt));
        form.setValue("endsAt", new Date(conference.endsAt));
        form.setValue(
          "deadlineForThesis",
          new Date(conference.deadlineForThesis)
        );
      }
      setLoading(false)
    };
    ConferenceData();
  }, [params.id]);

  const form = useForm<z.infer<typeof ConferenceAddSchema>>({
    defaultValues: {
      name: "",
      description: "",
      requirements: "",
      address: "",
      cost: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ConferenceAddSchema>) {
    const conferense = {
      name: values.name,
      description: values.description,
      requirements: values.requirements,
      address: values.address,
      cost: values.cost,
      startsAt: values.startsAt,
      endsAt: values.endsAt,
      deadlineForThesis: values.deadlineForThesis,
    };
    try {
      const response = await axios.put(
        `/api/conference/${params.id}`,
        conferense,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const directionsIdList: any = [];
      direction.filter((item) => {
        if (selectedDirections.includes(item.name.toLowerCase())) {
          directionsIdList.push({
            id: item.id,
          });
        }
      });

      await axios.put(
        `/api/conference/editDirections/${params.id}`,
        directionsIdList,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const { isSubmitting } = form.formState;

  if(loading){
    return <div className="flex items-center justify-center w-full h-[800px]"><Loading /></div>
  }

  return (
    <>
      {conferenceData && (
        <div className="flex flex-col gap-y-[18px] px-[30px]">
          <Button
            className="w-fit px-[18px] py-[12px] flex gap-y-2"
            variant="active"
            onClick={() => router.back()}
          >
            <FaArrowLeftLong className="text-white w-6 h-4" />
            Back
          </Button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex p-[18px] flex-col gap-y-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]"
            >
              <h2 className="font-semibold font-source-serif-pro text-3xl">
                Konferensiya ma&apos;lumotlarini o&apos;zgartirish
              </h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konferensiya nomi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Raqamli texnologiyalarni rivojlantirish..."
                        className="border-[1px] border-solid border-violet-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-y-1.5">
                <h4 className="font-medium text-sm">Yo&apos;nalishlar</h4>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between border-[1px] border-solid border-violet-200 px-3 py-2 text-muted-foreground"
                    >
                      Tanlang
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[1530px] p-0">
                    <Command>
                      <CommandInput placeholder="Yo'nalish tanlang..." />
                      <CommandEmpty>Yo&apos;nalish topilmadi.</CommandEmpty>
                      <CommandGroup>
                        {direction.map((d) => (
                          <CommandItem
                            key={d.id}
                            value={d.name}
                            onSelect={(currentValue) => {
                              if (selectedDirections.includes(currentValue)) {
                                setSelectedDirections(
                                  selectedDirections.filter(
                                    (dir) => dir !== currentValue
                                  )
                                );
                              } else {
                                setSelectedDirections([
                                  ...selectedDirections,
                                  currentValue,
                                ]);
                              }
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {selectedDirections.includes(
                              d.name.toLowerCase()
                            ) && <Check className="mr-2 h-4 w-4 opacity-100" />}
                            {d.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* choosed direction */}
              <div className="flex flex-col gap-y-1.5">
                <h4 className="font-medium text-sm">
                  Tanlangan yo&apos;nalishlar
                </h4>
                <div className="w-full border-[1px] border-solid border-violet-200 bg-white flex h-10 rounded-md px-3 py-2 text-sm">
                  {selectedDirections.map((item) => (
                    <span key={item} className="mr-2">
                      <Badge variant={"secondary"}>
                        {
                          direction.find((d) => d.name.toLowerCase() === item)
                            ?.name
                        }
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manzil</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Toshkent shahar Amir temur ko'chasi..."
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
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Talablar</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Konferensiya uchun talablar"
                        className="resize-none border-[1px] border-solid border-violet-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                  <FormField
                    control={form.control}
                    name="startsAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Konferensiya boshlanish vaqti</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MM-dd-yyyy")
                                ) : (
                                  <span>Tanlang...</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                  <FormField
                    control={form.control}
                    name="endsAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Konferensiya tugash vaqti</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MM-dd-yyyy")
                                ) : (
                                  <span>Tanlang...</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              // disabled={(date) => date > field.value}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                  <FormField
                    control={form.control}
                    name="deadlineForThesis"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Registratsiya vaqti</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MM-dd-yyyy")
                                ) : (
                                  <span>Tanlang...</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col px-[12px] py-1.5 gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To&apos;lov</FormLabel>
                        <FormControl>
                          <Input
                            className="border-[1px] border-solid border-violet-200"
                            placeholder="50 000 so'm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <span className="font-normal">Payment</span>
              <div className="flex flex-row justify-between items-center w-full gap-x-3">
                <Button className="rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black">
                  <span>50 000 so&apos;m</span>
                </Button>
              </div> */}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="py-3 px-5 rounded-xl bg-typegreen hover:bg-typegreen/85 w-fit"
                  disabled={isSubmitting}
                  onClick={() => router.back()}
                >
                  Saqlash
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default ConferenceEdit;
