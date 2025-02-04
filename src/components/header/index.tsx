import React from "react";
import Link from "../link";
import { Routes } from "@/constants/enums";
import Navbar from "./navbar";
import Image from "next/image";

function Header() {
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          <Image
            src="/assests/logo.png"
            alt="Logo"
            width="150"
            height="50"
            loading="eager"
            priority
          />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
