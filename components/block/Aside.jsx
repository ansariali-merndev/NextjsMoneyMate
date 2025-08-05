"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "../../assets/profile.webp";
import {
  FaTachometerAlt,
  FaList,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";
import Image from "next/image";

const navItem = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/category", label: "Category", icon: <FaList /> },
  { path: "/income", label: "Income", icon: <FaMoneyBillWave /> },
  { path: "/expense", label: "Expense", icon: <FaWallet /> },
];

export const Aside = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col justify-center items-center my-8">
        <Image
          src={profile}
          alt="Profile"
          style={{ height: "30px", width: "30px" }}
          priority={true}
        />
        <p>Ansari Ali</p>
      </div>
      <nav className="px-6 flex flex-col gap-6 my-8">
        {navItem.map((item, index) => (
          <Link
            key={`${item.label}-${index}`}
            className={`flex gap-2 items-center justify-start text-sm font-semibold  px-4 py-2 w-[130px] rounded-md transform transition-colors duration-200  ${
              pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-500"
            }`}
            href={item.path}
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
};
