"use client";

import Loading from "@/app/(home)/home_components/loading/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import {
  getApplicationsByConferenceAndDirectionId,
  putApplicationByUserId,
} from "@/fetch_api/fetchApplications";
import { getAllConferences } from "@/fetch_api/fetchConference";
import { getDirectionByConferenceId } from "@/fetch_api/fetchDirtection";
import { getUserByDirectionId } from "@/fetch_api/fetchUsers";
import { cn } from "@/lib/utils";
import {
  ApplicationType,
  ConferenceType,
  DirectionType,
  UserType,
} from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

const NewArticles = () => {
  const [open, setOpen] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [confValue, setConfValue] = useState("");
  const [directValue, setDirectValue] = useState("");
  const [revValue, setRevValue] = useState("");
  const [appValue, setAppValue] = useState("");
  const [allConferences, setAllConferences] = useState<ConferenceType[]>([]);
  const [directions, setDirections] = useState<DirectionType[]>([]);
  const [reviewers, setReviewers] = useState<UserType[]>([]);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllData = async () => {
      const conferences = await getAllConferences();
      setAllConferences(conferences);
      setLoading(false);
    };
    getAllData();
  }, []);

  useEffect(() => {
    if (confValue) {
      setDirectValue("");
      const getDirections = async () => {
        const conferencesId = allConferences.find(
          (c) => c.name.toLocaleLowerCase().trim() === confValue
        )?.id;
        const direction = await getDirectionByConferenceId(
          conferencesId as number
        );
        setDirections(direction);
      };
      getDirections();
    }
  }, [confValue]);

  useEffect(() => {
    if (directValue && confValue) {
      selectedApplications.length = 0;
      setRevValue("");
      const getRosources = async () => {
        const conferencesId = allConferences.find(
          (c) => c.name.toLocaleLowerCase().trim() === confValue
        )?.id;
        const directId = directions.find(
          (d) => d.name.toLocaleLowerCase().trim() === directValue
        )?.id;
        const reviewers = await getUserByDirectionId(directId as number);
        setReviewers(reviewers);
        const applications = await getApplicationsByConferenceAndDirectionId(
          conferencesId as number,
          directId as number
        );
        setApplications(applications);
      };
      getRosources();
    }
  }, [directValue]);

  const handleSubmit = () => {
    try {
      const putApplicationUserId = async () => {
        const revierwerId = reviewers.find(
          (r) => r.fullName.toLocaleLowerCase() === revValue
        )?.id;
        const apps: any = [];
        selectedApplications.forEach((a) => {
          const app = applications.find(
            (app) => app.name.toLocaleLowerCase() === a
          );
          apps.push({
            id: app?.id,
          });
        });

        await putApplicationByUserId(revierwerId as number, apps);
      };
      putApplicationUserId();
      //reset all values
      setConfValue("");
      setDirectValue("");
      setRevValue("");
      setAppValue("");
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
      });
    }
  };

  const renderElement = () => {
    if (applications.length > 0) {
      return (
        <div className="flex flex-col p-[18px] bg-mainwhite h-[680px] w-full rounded-3xl gap-y-3">
          <div className="flex flex-row gap-x-12 w-full">
            <div className="flex flex-col gap-y-1.5 w-full">
              <h4 className="font-medium text-sm">Maqolalar</h4>
              <Command>
                <CommandInput placeholder="Maqolani tanlang..." />
                <CommandEmpty>Maqola topilmadi.</CommandEmpty>
                <CommandGroup>
                  {applications.map((a) => (
                    <CommandItem
                      key={a.id}
                      value={a.name}
                      onSelect={(currentValue) => {
                        if (selectedApplications.includes(currentValue)) {
                          setSelectedApplications(
                            selectedApplications.filter(
                              (dir) => dir !== currentValue
                            )
                          );
                        } else {
                          setSelectedApplications([
                            ...selectedApplications,
                            currentValue,
                          ]);
                        }
                        setAppValue(
                          currentValue === appValue ? "" : currentValue
                        );
                      }}
                    >
                      {selectedApplications.includes(a.name.toLowerCase()) && (
                        <Check className="mr-2 h-4 w-4 opacity-100" />
                      )}
                      {a.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>
            {reviewers.length > 0 ? (
              <div className="flex flex-col gap-y-1.5 w-full">
                <h4 className="font-medium text-sm">Muharrirlar</h4>
                <Command>
                  <CommandInput placeholder="Muharrirni tanlang..." />
                  <CommandEmpty>Muharrir topilmadi.</CommandEmpty>
                  <CommandGroup>
                    {reviewers.map((r) => (
                      <CommandItem
                        key={r.id}
                        value={r.fullName}
                        onSelect={(currentValue) => {
                          setRevValue(
                            currentValue === revValue ? "" : currentValue
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            r.fullName.toLocaleLowerCase() === revValue
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {r.fullName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </div>
            ) : (
              <div className="flex flex-col gap-y-1.5 w-full">
                <h4 className="font-medium text-sm">Muharrirlar</h4>
                <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover justify-center items-center text-muted-foreground text-xl font-source-serif-pro font-semibold">Yo&apos;nalishga muharrir biriktirilmagan</div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-typegreen hover:bg-typegreen/85 text-white rounded-xl px-4 py-1.5"
              onClick={handleSubmit}
              disabled={reviewers.length > 0 ? false : true}
            >
              Jo&apos;natish
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-mainwhite h-[680px] w-full rounded-3xl flex justify-center items-center">
          <h2 className="text-3xl text-muted-foreground font-source-serif-pro font-semibold">
            Maqola mavjud emas!
          </h2>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[700px]">
        <Loading />
      </div>
    );
  }

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
              className="w-full justify-between border-[1px] border-solid border-violet-200 px-3 py-2"
            >
              {confValue ? (
                allConferences.find(
                  (c) => c.name.toLocaleLowerCase().trim() === confValue
                )?.name
              ) : (
                <span className="text-muted-foreground">Tanlang...</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[1570px] p-0">
            <Command>
              <CommandInput placeholder="Konferensiyani tanlang..." />
              <CommandEmpty>Konferensiya topilmadi.</CommandEmpty>
              <CommandGroup>
                {allConferences.map((c) => (
                  <CommandItem
                    key={c.id}
                    value={c.name}
                    onSelect={(currentValue) => {
                      setConfValue(
                        currentValue === confValue ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        c.name.toLocaleLowerCase().trim() === confValue
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {c.name}
                    {c.newApplicationsCount !== undefined &&
                      c.newApplicationsCount > 0 && (
                        <div className="absolute w-[1540px] flex justify-end">
                          <Badge className="px-2" variant={"notification"}>
                            {c.newApplicationsCount}
                          </Badge>
                        </div>
                      )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <h4 className="font-medium text-sm">Yo&apos;nalishlar</h4>
        <Popover open={dOpen} onOpenChange={setDOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-[1px] border-solid border-violet-200 px-3 py-2"
            >
              {directValue ? (
                directions.find(
                  (d) => d.name.toLocaleLowerCase().trim() === directValue
                )?.name
              ) : (
                <span className="text-muted-foreground">Tanlang...</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[1570px] p-0">
            <Command>
              <CommandInput placeholder="Yo'nalish tanlang..." />
              <CommandEmpty>Yo&apos;nalish topilmadi.</CommandEmpty>
              <CommandGroup>
                {directions.map((d) => (
                  <CommandItem
                    key={d.id}
                    value={d.name}
                    onSelect={(currentValue) => {
                      setDirectValue(
                        currentValue === directValue ? "" : currentValue
                      );
                      setDOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        d.name.toLocaleLowerCase().trim() === directValue
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {d.name}
                    {d.newApplicationsCount !== undefined &&
                      d.newApplicationsCount > 0 && (
                        <div className="absolute w-[1540px] flex justify-end">
                          <Badge className="px-2" variant={"notification"}>
                            {d.newApplicationsCount}
                          </Badge>
                        </div>
                      )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {confValue && directValue ? (
        renderElement()
      ) : (
        <div className="bg-mainwhite h-[680px] w-full rounded-3xl flex justify-center items-center mb-5">
          <h2 className="text-3xl text-muted-foreground font-source-serif-pro font-semibold">
            Iltimos Konferensiya nomi va Yo&apos;nalish tanlang!
          </h2>
        </div>
      )}
    </div>
  );
};

export default NewArticles;
