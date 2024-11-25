import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <div
            className="bg-mainindigo w-full flex flex-row items-start justify-between py-[50px] px-[120px] box-border text-5xl text-herowhite font-regular">
            <div className="h-[328px] shrink-0 flex flex-col items-start justify-between text-white">
                <div className="shrink-0 flex flex-col items-start justify-start gap-[32px]">
                    <div
                        className="rounded-xl bg-gray-100 shrink-0 flex flex-row items-start justify-start p-[42px] border-[1px] border-stone-50 bg-opacity-15">
                        <Image
                            src={"/images/image_1.png"}
                            height={100}
                            width={100}
                            alt="Logo"
                        />
                        {/* <b className="relative text-xl">
              <span>LO</span>
              <span className="text-typegreen">GO</span>
              <span>.</span>
            </b> */}
                    </div>
                    <b className="relative text-xl">
                        <span>{`CONFERENCE `}</span>
                        <span className="text-typegreen">{`UZ `}</span>
                    </b>
                </div>
                <div className="text-base text-justify inline-block w-[460px]">
                    Easily create, schedule, and manage conferences, workshops, and seminars directly through the
                    platform. From setting event dates to defining topics and inviting speakers, conference.tuit.uz
                    provides comprehensive tools for efficient event planning.
                </div>
            </div>
            <div className="h-[359px] flex flex-row items-start justify-start py-0 px-10 box-border">
                <div className="self-stretch relative box-border w-px border-r-[1px] border-solid border-gray-200"/>
            </div>
            <div className="w-[220px] flex flex-col items-start justify-start gap-[70px] text-base">
                <div className="relative text-xl font-semibold">SAHIFALAR</div>
                <div className="flex flex-col items-start justify-start gap-[16px]">
                    <div className="relative">BOSH SAHIFA</div>
                    <div className="relative">KONFIRENSIYALAR</div>
                    <div className="relative">BIZ HAQIMIZDA</div>
                    <div className="relative">BIZ NILAN ALOQA</div>
                    <div className="relative">PROFILE</div>
                </div>
            </div>
            <div className="w-[220px] flex flex-col items-start justify-start gap-[70px]">
                <div className="relative font-semibold text-xl">ALOQA</div>
                <div className="flex flex-col items-start justify-start gap-[16px] text-base">
                    <div className="shrink-0 flex flex-row items-start justify-start gap-[15px]">
                        <img
                            className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/phone.svg"
                        />
                        <div className="relative">+998 71 238 64 89</div>
                    </div>
                    <div className="shrink-0 flex flex-row items-start justify-start gap-[15px]">
                        <img
                            className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/foot-locate.svg"
                        />
                        <div className="relative">
                            <p className="m-0">{`Amir Temur shox `}</p>
                            <p className="m-0">ko’chasi 108-uy</p>
                        </div>
                    </div>
                    <div className="shrink-0 flex flex-row items-start justify-start gap-[15px]">
                        <img
                            className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/email.svg"
                        />
                        <div className="relative">info@tuit.uz</div>
                    </div>
                </div>
                <ul className="self-stretch flex flex-row items-center justify-center gap-[30px]">
                    <li>
                        <img
                            className="relative w-11 h-11 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/twitter.svg"
                        />
                    </li>
                    <li>
                        <img
                            className="relative w-11 h-11 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/instagram.svg"
                        />
                    </li>
                    <li>
                        <img
                            className="relative w-11 h-11 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/icons/telegram.svg"
                        />
                    </li>
                </ul>
            </div>
            <div className="w-56 flex flex-col items-start justify-start gap-[70px]">
                <div className="relative font-semibold text-xl">XARITADA</div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.4303920424!2d69.23749847646144!3d41.29949980144142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b8a0bfe27d9%3A0x29bcda9dd27c336a!2sTATU!5e0!3m2!1sru!2s!4v1709046689629!5m2!1sru!2s"
                    height="214"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="self-stretch relative max-w-full overflow-hidden shrink-0 object-cover"
                ></iframe>
            </div>
        </div>
    );
};

export default Footer;
