import React from "react";
import Link from "../link";
import Navbar from "./navbar";
import Image from "next/image";
import CartButton from "./cart-button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";

async function Header() {
  const locale = await getCurrentLocale();
  const { navbar } = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          <Image
            src="https://pizzahutaruba.com/san-nicolas-online-orders/wp-content/uploads/sites/4/2023/05/Pizza-hut-logo-1024x257.png"
            alt="Logo"
            width="135"
            height="50"
            loading="eager"
            priority
          />{" "}
        </Link>
        <div className="flex gap-4 items-center">
          <Navbar translations={navbar} />
          <LanguageSwitcher />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
