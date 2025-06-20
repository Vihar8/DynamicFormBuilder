"use client"; // Required if you're using App Router

import React, { useEffect, useRef, useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js router (App Router)

const TopMenu = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const [dropdownOpen1, setDropdownOpen1] = useState(false); // fix for dropdown logic
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="wrapper flex lg:justify-between w-full">
        <nav className="w-full">
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <MenuFoldOutlined className="text-subtitle1" />
          </label>

          <div className="nav-content">
            <ul className="links">
              <li>
                <Link href="/formbuilder" onClick={() => setDropdownOpen(false)}>Form Builder</Link>
              </li>
              <li>
                <Link href="/preview" onClick={() => setDropdownOpen(false)}>Preview</Link>
              </li>
              <li>
                <Link href="/export" onClick={() => setDropdownOpen(false)}>Export</Link>
              </li>
              <li>
                <Link href="/formlist" onClick={() => setDropdownOpen(false)}>Form List</Link>
              </li>

              {/* Mobile View Login Button */}
              <li className="block lg:!hidden">
                <div className="space-y-1 mt-4 ml-3 mb-2" style={{ width: "90%" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleLogin}
                    className="btnStyle roundedBtn"
                  >
                    Login
                  </Button>
                </div>
              </li>
            </ul>

            {/* Desktop View Login Button */}
            <ul className="hidden lg:flex space-x-4 items-center z-10">
              <li className="relative">
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleLogin}
                  className="btnStyle roundedBtn"
                >
                  Login
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopMenu;
