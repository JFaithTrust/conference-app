"use client";

import {TbArrowNarrowLeft} from "react-icons/tb";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";
import {AnswerType, ApplicationType, ConferenceType, DirectionType} from "@/types";
import Loading from "@/app/(home)/home_components/loading/Loading";
import {getApplicationById, getApplicationPaymentLink} from "@/fetch_api/fetchApplications";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {ArticleFeedbackForm} from "@/components/forms";
import {getAllAnswersByApplicationId} from "@/fetch_api/fetchAnswers";
import {Badge} from "@/components/ui/badge";

interface IPayment {
    uniqueParam: string;
    redirectUrl: string;
}

const ConferenceDetail = ({params}: { params: { id: number } }) => {
    const [application, setApplication] = useState<ApplicationType>();
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<AnswerType[]>([])
    // const [payment, setPayment] = useState({} as IPayment);

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        const getAllApplications = async () => {
            const application = await getApplicationById(params.id);
            setApplication(application);
            // const pay = await getApplicationPaymentLink(params.id);
            // setPayment(pay);
            setLoading(false);
        };
        getAllApplications();
    }, [params.id]);
    useEffect(() => {
        const getAllAnswersByApplication = async (id: number) => {
            const answers = await getAllAnswersByApplicationId(id);
            setAnswers(answers)
        }
        getAllAnswersByApplication(params.id);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col px-[140px] py-[20px] gap-[20px]">
                <div
                    className="flex flex-row gap-1 py-[9px] rounded-sm items-center justify-center cursor-pointer w-fit"
                    onClick={handleBack}
                >
                    <TbArrowNarrowLeft className="w-5 h-5 text-black" size={24}/>
                    <h2 className="text-black">Back</h2>
                </div>
                <div className="flex flex-col p-[30px] gap-[48px] rounded-xl bg-mainwhite shadow-[0_0_4px_2px_#DCDBFA]">
                    <Loading/>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col px-[140px] py-[20px] gap-[20px]">
            <div
                className="flex flex-row gap-1 py-[9px] rounded-sm items-center justify-center cursor-pointer w-fit"
                onClick={handleBack}
            >
                <TbArrowNarrowLeft className="w-5 h-5 text-black" size={24}/>
                <h2 className="text-black">Back</h2>
            </div>
            <div
                className="flex flex-col gap-1 py-[9px] rounded-sm justify-center cursor-pointer w-full"
                onClick={handleBack}
            >
                {answers?.length > 0 ? (
                    <div>
                        <span>Tahrirchini javobi</span>
                        {answers
                            .sort((a, b) => {
                                if (a.id > b.id)
                                    return -1
                                else
                                    return 1
                            })
                            .map(answer => (
                                <div
                                    key={answer.id}
                                    className={`${answer.status == "PENDING" ? "bg-typeyellow" : "bg-typegreen"} w-full py-6 px-5 rounded-xl text-white text-xl font-bold my-2 flex justify-between`}>
                                    <span>{answer.text}</span>
                                    <Badge
                                        className={`bg-white border-2 rounded-full hover:bg-white ${answer.status == "PENDING" ? "text-typeyellow" : "text-typegreen"}`}>
                                        {answer.status}
                                    </Badge>
                                </div>
                            ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {application && (
                <div
                    className="flex flex-col p-[30px] gap-y-[30px] rounded-xl bg-mainwhite shadow-[0_0_4px_2px_#DCDBFA]">
                    <div className="flex justify-end">
                        <Button
                            className={` px-3 py-1.5 rounded-full ${
                                application.status === "FEEDBACK"
                                    ? "bg-typeyellow hover:bg-typeyellow/85"
                                    : "bg-typegreen hover:bg-typegreen/85"
                            }`}
                        >
                            {application.status}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <span>Maqola nomi</span>
                        <h1 className="text-justify text-4xl font-semibold leading-[100%] font-source-serif-pro">
                            {application.name}
                        </h1>
                    </div>
                    <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
                        <p>Konferensiya nomi</p>
                        <div className="flex flex-col gap-y-3">
                            <p className="text-lg text-justify">
                                {application.conference.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
                        <p>Maqola yo&apos;nalishi</p>
                        <div>
                            <ul className="text-xl font-semibold list-disc ml-5">
                                <li>{application.direction?.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
            <span className="text-xl font-semibold font-source-serif-pro">
              Maqola aftorlari :{" "}
            </span>
                        <span>{application.authors}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div
                            className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
              <span className="font-semibold font-source-serif-pro text-lg">
                Maqola yuborilgan sana
              </span>
                            <div className="flex flex-row justify-between items-center w-full gap-x-3">
                                <Button
                                    className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full">
                  <span>
                    {application.createdAt &&
                        format(application.createdAt, "dd-MM-yyyy")}
                  </span>
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </div>
                        </div>

                        <div
                            className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
              <span className="font-semibold font-source-serif-pro text-lg">
                Faylni yuklab olish
              </span>
                            <div className="flex flex-row justify-between items-center w-full gap-x-3">
                                <Button
                                    className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full"
                                    onClick={() =>
                                        router.push(application.thesisFile?.downloadLink || "")
                                    }
                                >
                                    <span>Yuklab olish</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description" className="text-lg font-semibold">
                            Tavsif
                        </Label>
                        <Textarea
                            className="resize-none border-[1px] border-solid border-violet-200"
                            value={application.description}
                            readOnly
                        />
                    </div>
                    {
                        application.status === "FEEDBACK"
                            ? <div
                                className="flex flex-col rounded-xl p-[30px] gap-y-[30px] border-[1px] border-solid border-violet-200">
                                <h2 className="text-3xl font-semibold">Maqolani jo&apos;natish</h2>
                                <ArticleFeedbackForm
                                    name={application.conference.name}
                                    id={application.conference.id}
                                    direction={(application.direction !== undefined) ? [application.direction] : []}
                                    applicationId={application.id}
                                    thesisFileId={application.thesisFile?.id || 0}
                                />
                            </div>
                            : application.status === "ACCEPTED"
                                ?
                                <div>
                                    {/*<a href={payment.redirectUrl} className={"hover:underline text-blue-500"}>*/}
                                    {/*    Ushbu link orqali maqolani to&apos;lovini amalga oshirishingiz mumkin:*/}
                                    {/*</a>*/}
                                </div>
                                : null
                    }
                </div>
            )}
        </div>
    );
};

export default ConferenceDetail;
