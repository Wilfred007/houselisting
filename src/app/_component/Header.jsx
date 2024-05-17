'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 z-10 w-full bg-white">
      <div className="flex gap-10 items-center">
        <Link href="/">
          <h2 className="sm:text-2xl text-lg font-bold text-red-900">
            PropertyCity NG
          </h2>
        </Link>
        <ul className="hidden md:flex gap-10">
          <li className="hover:text-gray-500 text-sm cursor-pointer">
            For Sale
          </li>
          <li className="hover:text-gray-500 text-sm cursor-pointer">
            For Rent
          </li>
          <li className="hover:text-gray-500 text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        <Link href="/add-new-listing">
          <Button className="flex gap-2 items-center">
            <Plus className="h-3 w-3" />
            Post Ads
          </Button>
        </Link>
        <Link href={'/sign-in'}>
        {isSignedIn ? <UserButton /> : <Button variant="ghost">Login</Button>}
        </Link> 
      </div>
    </div>
  );
};

export default Header;
