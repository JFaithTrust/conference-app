import { ConferenceType } from '@/types'
import React from 'react'
import { FC } from "react";

interface CardProps{
  card: ConferenceType[]
}

const Conference: FC<CardProps> = ({card}) => {
  return (
    <div>Conference</div>
  )
}

export default Conference