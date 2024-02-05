// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";

// const ConferenceCreate = () => {
//   const router = useRouter();
//   const direction = [
//     { name: "Frontend", value: "frontend" },
//     { name: "Backend", value: "backend" },
//     { name: "Fullstack", value: "fullstack" },
//     { name: "Mobile", value: "mobile" },
//     { name: "Desktop", value: "desktop" },
//     { name: "Game", value: "game" },
//     { name: "AI", value: "ai" },
//     { name: "ML", value: "ml" },
//     { name: "DevOps", value: "devops" },
//     { name: "Cloud", value: "cloud" },
//     { name: "Security", value: "security" },
//     { name: "Testing", value: "testing" },
//     { name: "Other", value: "other" },
//   ];

//   return (
//     <div className="flex flex-col gap-y-[18px] px-[30px]">
//       <Button
//         className="w-fit px-[18px] py-[12px] flex gap-y-2"
//         variant="active"
//         onClick={() => router.back()}
//       >
//         <FaArrowLeftLong className="text-white w-6 h-4" />
//         Back
//       </Button>
//       <div className="flex p-[18px] flex-col gap-y-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]">
//         <h2 className="font-semibold font-source-serif-pro text-3xl">
//           Yangi konferensiya yaratish
//         </h2>
//         <Input
//           className="rounded-xl border-[1px] border-solid border-[#DCDBFA] p-3"
//           placeholder="Konfernasiya nomi"
//         />
//         <Select>
//           <SelectTrigger className="w-full rounded-xl">
//             <SelectValue placeholder="Yo'nalishlar" />
//           </SelectTrigger>
//           <SelectContent>
//             {direction.map((item) => (
//               <SelectItem key={item.value} value={item.value}>
//                 {item.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Textarea
//           placeholder="Tell us a little bit about yourself"
//           className="resize-none border-[1px] border-solid border-violet-200 rounded-lg"
//         />
//         <div className="flex flex-row justify-between">
//           <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
//             <span className="font-normal">Konferensiya boshlanish vaqti</span>
//             <div className="flex flex-row justify-between items-center w-full">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button className="rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black">
//                     <span>Boshlanish vaqti</span>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <Button className="px-3 py-[9px] rounded-lg bg-mainwhite hover:bg-mainwhite text-typeyellow">
//                 <CalendarIcon className="w-6 h-6" />
//               </Button>
//             </div>
//           </div>
//           <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
//             <span className="font-normal">Konferensiya tugash vaqti</span>
//             <div className="flex flex-row justify-between items-center w-full">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button className="rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black">
//                     <span>Tugash vaqti</span>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <Button className="px-3 py-[9px] rounded-lg bg-mainwhite hover:bg-mainwhite text-typeyellow">
//                 <CalendarIcon className="w-6 h-6" />
//               </Button>
//             </div>
//           </div>
//           <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
//             <span className="font-normal">Registratsiya qilish vaqti</span>
//             <div className="flex flex-row justify-between items-center w-full gap-x-3">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button className="rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black">
//                     <span>Registratsiya vaqti</span>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <Button className="px-3 py-[9px] rounded-lg bg-mainwhite hover:bg-mainwhite text-typeyellow">
//                 <CalendarIcon className="w-6 h-6" />
//               </Button>
//             </div>
//           </div>
//           <div className="flex flex-col p-[12px] gap-y-3 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
//             <span className="font-normal">Payment</span>
//             <div className="flex flex-row justify-between items-center w-full gap-x-3">
//               <Button className="rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black">
//                 <span>50 000 so&apos;m</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end">
//           <Button className="py-3 px-5 rounded-xl bg-typegreen hover:bg-typegreen/85 w-fit">
//             Saqlash
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConferenceCreate;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
