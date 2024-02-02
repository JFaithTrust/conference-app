import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { sidebarLinks } from "@/constants";

const Sidebar = () => {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(0);
  const [subActive, setsubActive] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const toggleClick = (id: number) => {
    setActive(id);
    setOpen((id === 2 && 2) || (id === 3 && 3) || 0);
    setsubActive(id);
  };

  const toggleSubClick = (id: number) => {
    setsubActive(id);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-[280px] min-h-screen py-[18px] px-[32px] flex flex-col gap-y-[18px]">
      <div className="p-[12px]">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#3EBD80] to-[#3EFEA1]">
          Conference-List
        </h2>
      </div>
      <ul className="flex flex-col gap-y-[14px] pl-[20px] items-start">
        {sidebarLinks.map((link) => (
          <li key={link.id}>
            <Link href={link.path}>
              <Button
                className={`gap-4 w-[180px] font-roboto text-xl justify-start pl-[18px] py-[6px] ${
                  link.id !== active && "bg-white"
                } ${open === link.id && "rounded-b-none"}`}
                variant={`${link.id === active ? "activeLink" : "secondary"}`}
                onClick={() => toggleClick(link.id)}
              >
                <link.icon />
                {link.name}
              </Button>
              {link.subLinks && isClient && (
                <div
                  className={`bg-herowhite flex flex-col gap-y-2 px-5 py-2 rounded-b-xl ${
                    open !== link.id && "hidden"
                  }`}
                >
                  {link.subLinks.map((subLink) => (
                    <Link href={subLink.path} key={subLink.id}>
                      <Button
                        className="gap-4 font-roboto text-sm justify-start w-full p-[6px]"
                        onClick={() => toggleSubClick(subLink.id)}
                        variant={`${
                          subActive === subLink.id ? "activeLink" : "secondary"
                        }`}
                      >
                        <subLink.icon />
                        {subLink.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
