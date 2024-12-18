"use client"

import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { Conference } from "../home_components";
import {getAllConferences, getAllLandingConferences} from "@/fetch_api/fetchConference";

const Conferences = () => {
  const [card, setCard] = useState<ConferenceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllLandingConferences();
      setCard(res)
      setLoading(false)
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
