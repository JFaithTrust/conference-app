"use client"

import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { Conference } from "../home_components";
import { getAllConferences } from "@/fetch_api/fetchConference";

const Conferences = () => {
  const [card, setCard] = useState<ConferenceType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllConferences();
      setCard(res)
      setLoading(true)
    };
    getConferences();
  }, []);

  return (
    <div>
      <Conference card={card} loading={loading} />
    </div>
  );
};

export default Conferences;
