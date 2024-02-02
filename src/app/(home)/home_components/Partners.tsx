import React from 'react'
import { FC } from "react";

interface Item {
  image: string
}

interface Props {
  items: Item[]
}

const Partners: FC<Props> = ({items}) => {
  return (
    <div>Partners</div>
  )
}

export default Partners