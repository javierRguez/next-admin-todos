import Image from "next/image";
import Link from "next/link";

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "..";

const sidebarItems = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline />,
    title: "Dashboard",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline />,
    title: "Server Actions",
  },
  {
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <IoBasketOutline />,
    title: "Products",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPersonOutline />,
    title: "Perfil",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";
  const userName = session?.user?.name ?? "No Name";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={200}
              height={55}
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt=""
            width={100}
            height={100}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
