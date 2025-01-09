"use client";
import React from 'react';
import Image from 'next/image';
import menu from "../../utils/menu";
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import Button from '../Button/Button';
import { arrowLeft, bars, logout } from '@/app/utils/icons';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { useGlobalState } from '@/app/Context/GlobalContextProvider';

const Sidebar = () => {
  const { collapsed, collapsedMenu } = useGlobalState();
  const router = useRouter();
  const pathName = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const handleClick = (link:any) => {
    router.push(link);
  };

  return (
    <nav
      className={`w-[15rem] bg-[#212121] fixed h-[calc(100vh-5rem)] z-[100] border border-r-2 rounded-2xl border-[#f9f9f914] flex flex-col justify-between text-[#6c7983] duration-500 ease-in-out transform ${collapsed ? "translate-x-[-100%]" : "-translate-x-0"} md:translate-x-0 md:relative`}
    >
      <div
        className="absolute right-[-42px] top-[2.75rem] p-[0.8rem] rounded-r-2xl border-r-2 border-solid border-t-2 border-b-2 border-r-[#f9f9f914] border-t-[#f9f9f914] border-b-[#f9f9f914] bg-[#212121] md:hidden cursor-pointer"
        onClick={collapsedMenu}
      >
        {collapsed ? bars : arrowLeft}
      </div>
      <div className="m-6 relative p-4 rounded-2xl cursor-pointer font-semibold text-[#f8f8f8] flex items-center">
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-[#181818] duration-500 ease-linear rounded-2xl opacity-20 hover:opacity-100 hover:border-2 hover:border-solid hover:border-[#f9f9f914]"></div>
        <div className="shrink-0 inline-block overflow-hidden duration-500 ease-linear rounded-full w-[70px] h-[70px]">
          <Image
            src={imageUrl}
            alt="profile picture"
            width={65}
            height={65}
            className="rounded-full relative z-1"
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="text-lg relative z-1 ml-2 w-fit capitalize">
          {firstName} {lastName}
        </h1>
      </div>
      <ul>
        {menu.map((link, index) => (
          <li
            key={index}
            onClick={() => handleClick(link.link)}
            className={`relative ${
              pathName === link.link &&
              "bg-[#f9f9f914] text-[#f9f9f975] before:w-[0.3rem]"
            } pt-4 pr-4 pb-4 pl-8 my-3 flex items-center gap-3 cursor-pointer after:content-[''] after:absolute after:left-0 after:top-0 after:w-0 after:h-full after:z-1 after:bg-[#c5c5c510] after:duration-300 after:ease-in-out before:absolute before:content-[''] before:right-0 before:top-0 before:w-0 before:h-full before:bg-[#27AE60] rounded-l-md hover:after:w-full hover:text-[#f9f9f980]`}
          >
            {link.icon}
            <Link href={link.link} className="hover:after:w-full">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sign-out relative ml-5 mb-3">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"1rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
