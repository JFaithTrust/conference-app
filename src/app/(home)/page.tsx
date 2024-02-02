"use client";

import { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { getAllConferences } from "@/fetch_api/fetchConference";
import { Conference, Hero } from "./home_components";

export default function Home() {
  const [card, setCard] = useState<ConferenceType[]>([]);

  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllConferences();
      setCard(res.slice(0, 8));
    };
    getConferences()
    localStorage.setItem("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Iis5OTgxMTExMTExMTEiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDY4NjQ0NzksImV4cCI6MTcwNjk1MDg3OX0.NS2whNZcOOHqeTcWbsqVrjw2mg2Ba5soYZZ5oTo3HFw");
  }, []);

  return (
    <div className="">
      <Hero />
      <Conference card={card} />
    </div>
  );
}
