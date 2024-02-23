"use client";

import { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { getAllConferences } from "@/fetch_api/fetchConference";
import { Conference, Hero } from "./home_components";

export default function Home() {
  const [card, setCard] = useState<ConferenceType[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllConferences();
      setCard(res.slice(0, 8));
      setLoading(false)
    };
    getConferences()
  }, []);

  return (
    <div className="">
      <Hero />
      <Conference card={card} loading={loading} />
    </div>
  );
}
