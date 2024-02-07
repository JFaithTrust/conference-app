'use client'

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const NewArticles = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <div className="flex flex-col gap-y-1.5">
        <h4 className="font-medium text-sm">Konferensiyalar</h4>
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
              <CommandInput placeholder="Konferensiyani tanlang..." />
              <CommandEmpty>Konferensiya topilmadi.</CommandEmpty>
              <CommandGroup>
                {/* {direction.map((d) => (
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
                ))} */}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
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
                {/* {direction.map((d) => (
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
                ))} */}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-mainwhite h-[680px] w-full rounded-3xl flex justify-center items-center">
        <h2 className="text-3xl text-muted-foreground font-source-serif-pro font-semibold">
          Iltimos Konferensiya nomi va Yo&apos;nalish tanlang!
        </h2>
      </div>
    </div>
  );
};

export default NewArticles;
