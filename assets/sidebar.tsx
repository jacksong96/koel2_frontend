"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Link from "next/link";

const links = [
  { name: "Home", href: "/", icon: HomeOutlinedIcon },
  { name: "Upload", href: "/upload", icon: UploadFileOutlinedIcon },
  { name: "Maps", href: "/maps", icon: MapOutlinedIcon },
  { name: "Profile", href: "/profile", icon: PersonOutlinedIcon },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-black relative`}
    >
      <Image
        src="/control.jpg"
        className={`absolute cursor-pointer rounded-full
          -right-3 top-9 w-7 border-2 border-black ${!open && "rotate-180"}`}
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        alt="Expansion Button"
      />
      <div className="flex gap-x-4 items-center">
        <div>LOGO</div>
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Koel
        </h1>
      </div>
      <ul className="pt-6">
        {links.map((link) => (
          <li
            key={link.name}
            className={`flex text-sm items-center
              cursor-pointer p-2 hover:bg-green-50 hover:text-black rounded-md mt-2 ${
                pathname == link.href
                  ? "bg-green-50 text-black"
                  : "text-gray-300"
              } relative`}
          >
            <Link key={link.name} href={link.href} className="flex-1">
              <div className="flex gap-x-4 items-center">
                <link.icon className="w-6" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {link.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
