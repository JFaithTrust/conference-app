import { FaHome, FaRegUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import {
  FaFileCirclePlus,
  FaUsersGear,
  FaFileExport,
  FaFileCircleXmark,
} from "react-icons/fa6";
import { FiType } from "react-icons/fi";

export const sidebarLinks = [
  {
    id: 1,
    name: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    id: 2,
    name: "Conference",
    path: "/dashboard/conference",
    icon: HiOutlineUserGroup,
    subLinks: [
      {
        id: 2,
        name: "Conferences",
        path: "/dashboard/conference",
        icon: FaUsersGear,
      },
      {
        id: 6,
        name: "Conf. Type",
        path: "/dashboard/conference/type",
        icon: FiType,
      },
    ],
  },
  {
    id: 3,
    name: "Articles",
    path: "/dashboard/articles",
    icon: MdArticle,
    subLinks: [
      {
        id: 3,
        name: "New articles",
        path: "/dashboard/articles",
        icon: FaFileCirclePlus,
      },
      {
        id: 6,
        name: "Send articles",
        path: "/dashboard/articles/send",
        icon: FaFileExport,
      },
      {
        id: 7,
        name: "Tex. mistake",
        path: "/dashboard/articles/mistake",
        icon: FaFileCircleXmark,
      },
    ],
  },
  {
    id: 4,
    name: "Reviewers",
    path: "/dashboard/reviewers",
    icon: ImUserTie,
  },
  {
    id: 5,
    name: "Users",
    path: "/dashboard/users",
    icon: FaRegUser,
  },
];
