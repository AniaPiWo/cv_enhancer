"use client";
import { Logo } from "@/assets/Logo";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavLink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-between px-[60px] h-24 bg-indigo-50 max-w-screen-xl">
      <Link href="/">
        <Logo />
      </Link>
      {pathname !== "/upload" && (
        <NavLink href="/upload" className="btn btn-primary text-white">
          Get Started
        </NavLink>
      )}
      {/*      <div className="flex gap-6 ">
        <nav className="flex gap-4 items-center">
          {pathname === "/upload" && (
            <NavLink
              href="/dashboard"
              className="btn btn-ghost text-normal font-light"
            >
              Dashboard
            </NavLink>
          )}
          <SignedOut>
            <SignInButton>
              <button className="btn btn-outline">Log in</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          {pathname !== "/upload" && (
            <NavLink href="/upload" className="btn btn-primary text-white">
              Get Started
            </NavLink>
          )}
        </nav>
      </div> */}
    </div>
  );
};
