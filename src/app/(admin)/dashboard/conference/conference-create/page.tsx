"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConferenceAddSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DirectionType } from "@/types";
import { getAllDirections } from "@/fetch_api/fetchDirtection";
import { Badge } from "@/components/ui/badge";
import { access_token } from "@/fetch_api/token";
import axios from "@/fetch_api/axios";

const ConferenceCreate = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getDirectionData = async () => {
      const data = await getAllDirections();
      setDirection(data);
    };
    getDirectionData();
  }, []);

  const form = useForm<z.infer<typeof ConferenceAddSchema>>({
    defaultValues: {
      name: "",
      description: "",
      requirements: "",
      address: "",
      cost: "50 000 so'm",
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
      const response = await axios.post("/api/conference", conferense, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;
      const directionsIdList: any = [];
      direction.filter((item) => {
        if (selectedDirections.includes(item.name.toLowerCase())) {
          directionsIdList.push({
            id: item.id,
          });
        }
      });

      await axios.put(
        `/api/conference/addDirection/${data.id}`,
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

  return (
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
            Yangi konferensiya yaratish
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
                  {/* {value
                    ? direction.find((d) => d.id.toString() === value)?.name
                    : "IoT texnologiyalari..."} */}
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
                          // if (selectedDirections.includes(currentValue)) {
                          //   setSelectedDirections(
                          //     selectedDirections.filter(
                          //       (dir) => dir !== currentValue
                          //     )
                          //   );
                          // } else {
                          //   setSelectedDirections([
                          //     ...selectedDirections,
                          //     currentValue,
                          //   ]);
                          // }
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {selectedDirections.includes(d.name.toLowerCase()) && (
                          <Check className="mr-2 h-4 w-4 opacity-100" />
                        )}
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
            <h4 className="font-medium text-sm">Tanlangan yo&apos;nalishlar</h4>
            <div className="w-full border-[1px] border-solid border-violet-200 bg-white flex h-10 rounded-md px-3 py-2 text-sm">
              {selectedDirections.map((item) => (
                <span key={item} className="mr-2">
                  <Badge variant={"secondary"}>
                    {direction.find((d) => d.name.toLowerCase() === item)?.name}
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
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
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
                          disabled={(date) => date > field.value}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
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
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
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
                        readOnly
                        value={"50 000 so'm"}
                        className="border-[1px] border-solid border-violet-200"
                        // {...field}
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
            >
              Saqlash
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConferenceCreate;

{
  /* {showDirtections && (
            <div className="w-full border-[1px] border-solid border-violet-200 bg-white flex h-10 rounded-md px-3 py-2 text-sm">
              {showDirtections.map((item) => (
                <span key={item.id} className="mr-2">
                  {item.name}
                </span>
              ))}
            </div>
          )} */
}
// const [showDirtections, setShowDirtections] = useState<DirectionType[]>([]);
//   const direct: DirectionType[] = [];
// useEffect(() => {
//   if (value) {
//     direction.forEach((item) => {
//       if (item.id.toString() === value) {
//         direct.push(item);
//       }
//     });
//   }
//   setShowDirtections(direct);
//   setDirection(
//     direction.filter(
//       (item) => !showDirtections.map((item2) => item2.id).includes(item.id)
//     )
//   );
// }, [value]);
