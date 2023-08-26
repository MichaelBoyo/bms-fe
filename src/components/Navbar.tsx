import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import logo from "@/assets/booksy.png";

export const Navbar = () => {
  const session = useSession();
  // console.log(session)

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
  };

  return (
    <div className="navbar border-b border-base-200 py-4">
      <Link href="/" className="flex-1">
        <img src={logo.src} alt="Booksy Logo" className="rounded-full w-10" />
      </Link>
      <div className="flex-none gap-2">
        {!session.data && (
          <>
            <Link href="/SignUp" className="btn btn-sm btn-outline btn-primary">
              Create an account
            </Link>
            <Link href="/Login" className="btn btn-sm btn-primary">
              Login
            </Link>
          </>
        )}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
          {session.data && (
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content space-y-1 bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
