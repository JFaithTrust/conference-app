"use client"

import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { Conference } from "../home_components";
import { getAllConferences } from "@/fetch_api/fetchConference";

const Conferences = () => {
  const [card, setCard] = useState<ConferenceType[]>([])

  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllConferences();
      setCard(res)
    };
    getConferences();
  }, []);

  return (
    <div>
      <Conference card={card} />
    </div>
  );
};

export default Conferences;
