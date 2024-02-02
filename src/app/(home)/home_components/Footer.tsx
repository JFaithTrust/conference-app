import React from "react";

const Footer = () => {
  return (
    <div className="bg-mainindigo w-full flex flex-row items-start justify-between py-[50px] px-[120px] box-border text-5xl text-herowhite font-regular">
      <div className="h-[328px] shrink-0 flex flex-col items-start justify-between text-white">
        <div className="shrink-0 flex flex-col items-start justify-start gap-[32px]">
          <div className="rounded-xl bg-gray-100 shrink-0 flex flex-row items-start justify-start p-[52px] border-[1px] border-stone-50 bg-opacity-15">
            <b className="relative text-xl">
              <span>LO</span>
              <span className="text-typegreen">GO</span>
              <span>.</span>
            </b>
          </div>
          <b className="relative text-xl">
            <span>{`SIZNING `}</span>
            <span className="text-typegreen">{`BRANDINGIZ `}</span>
            <span>NOMI</span>
          </b>
        </div>
        <div className="relative text-base inline-block w-[404px]">
          Thank you for the fastest service ever, I liked how everything in the
          house was ready on time in the house was ready on time.
        </div>
      </div>
      <div className="h-[359px] flex flex-row items-start justify-start py-0 px-10 box-border">
        <div className="self-stretch relative box-border w-px border-r-[1px] border-solid border-gray-200" />
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
        <div className="relative">{`PRIVACY & COOKIE POLICY`}</div>
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
            <div className="relative">+998 93 250 52 55</div>
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
            <div className="relative">goblindev02@gmail.com</div>
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
        <img
          className="self-stretch relative max-w-full overflow-hidden h-[214px] shrink-0 object-cover"
          alt=""
          src="/images/map.jpg"
        />
      </div>
    </div>
  );
};

export default Footer;
