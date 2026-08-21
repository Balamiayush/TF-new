"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { productsMenuData } from "@/shared/data/products-menu";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import UserAddedIcon from "@/shared/icons/UserAddedIcon";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

interface ProductsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProductsDropdownComponent({ isOpen, onClose }: ProductsDropdownProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-lenis-prevent", "true");
    } else {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[3.75vw] z-[9998] backdrop-blur-3xl"
            onClick={onClose}
            data-lenis-prevent
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="no-scrollbar absolute top-full right-0 left-0 z-[9999] mx-auto  overflow-y-auto rounded-[0px_0px_0.417vw_0.417vw] bg-white pt-[0.625vw] pb-[1.667vw]"
            data-lenis-prevent
          >
            <LayoutWrapper className="max-w-[1450px]!">
              <div className="flex gap-[0.833vw]">
                <div className="flex w-full items-stretch justify-between gap-[1.667vw] rounded-[0.417vw] border border-slate-200/80 bg-[#F4F7FC] p-[1.25vw]">
                  {/* Left Section */}
                  <div className="flex flex-1 flex-col gap-[1.25vw]">
                    {/* Heading */}
                    <h3 className="text-[1.667vw] leading-[1.15] font-medium tracking-[-0.016vw] text-slate-900 lg:text-[1.875vw]">
                      {productsMenuData.heading}
                    </h3>

                    {/* 2x2 Grid Layout for Categories */}
                    <div className="grid grid-cols-1 gap-[0.625vw] sm:grid-cols-2 lg:gap-[0.625vw]">
                      {productsMenuData.categories.map((category, idx) => (
                        <div
                          key={category.title || idx}
                          className="flex flex-col rounded-[0.3125vw] border border-slate-200/60 bg-white p-[0.417vw]"
                        >
                          {/* Category Header */}
                          <div className="mb-[0.3125vw] border-b border-slate-100 pb-[0.417vw]">
                            <span className="text-[0.729vw] leading-[100%] tracking-wide text-slate-400">
                              {category.title}
                            </span>
                          </div>

                          <ul className="flex flex-col gap-[0.208vw]">
                            {category.items.map((item, itemIdx) => (
                              <li key={`${idx}-${itemIdx}`}>
                                <Link
                                  href={"/"}
                                  // onClick={onClose}
                                  className="group flex cursor-not-allowed items-center justify-between rounded-[0.104vw] p-[0.417vw] text-[0.729vw] leading-[130%] duration-300 ease-in-out"
                                >
                                  <div className="flex items-center gap-[0.521vw]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      fill="none"
                                      viewBox="0 0 14 14"
                                    >
                                      <path
                                        fill="#1E293B"
                                        d="M14 7.074q0 .388-.041.766c-.326 3.064-2.585 5.54-5.52 6.16V9.784a3.08 3.08 0 0 0 1.665-2.73 3.08 3.08 0 0 0-1.736-2.766A3.1 3.1 0 0 0 7 3.973c-1.714 0-3.104 1.38-3.104 3.08 0 1.187.675 2.216 1.664 2.73V14a6.99 6.99 0 0 1-3.917-2.372A7.1 7.1 0 0 1 0 7.074C0 5.34.618 3.752 1.643 2.521A7 7 0 0 1 4.432.492 6.9 6.9 0 0 1 7 0c3.61 0 6.581 2.762 6.959 6.309q.041.377.041.765"
                                      ></path>
                                    </svg>
                                    <span>{item.label}</span>
                                  </div>
                                  <div className="flex -rotate-90 flex-col opacity-0 transition-opacity duration-300">
                                    <DropdownArrow />
                                    <DropdownArrow />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    router.push("/platform");
                  }}
                  className="relative flex h-[34.323vw] w-[26.875vw] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[0.625vw] p-[1.667vw] text-white shadow-lg"
                  style={{
                    background:
                      "linear-gradient(179.91deg, #3B82F6 0.08%, #60A5FA 54.75%, #2563EB 97.46%, #2563EB 125.56%)",
                  }}
                >
                  <div className="pointer-events-none absolute top-0 left-0 opacity-80">
                    <svg
                      width="18.125vw"
                      height="18.229vw"
                      fill="none"
                      viewBox="0 0 348 350"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <foreignObject
                        width="475.96"
                        height="472.328"
                        x="-96.558"
                        y="-90.559"
                      >
                        <div
                          style={{
                            backdropFilter: "blur(0.833vw)",
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </foreignObject>
                      <g data-figma-bg-blur-radius="32" opacity="0.8">
                        <path
                          fill="url(#paint0_linear_3272_1582)"
                          fillOpacity="0.2"
                          d="M144.005 349.769c7.612-.017 15.117-.419 22.515-1.244 90.119-9.696 162.85-75.751 180.883-161.39l-124.04.269c-15.054 28.883-45.317 48.652-80.203 48.727-35.697.078-66.646-20.508-81.476-50.451-5.982-12.018-9.324-25.558-9.355-39.878-.108-49.994 40.4-90.611 90.438-90.72 34.886-.076 65.198 19.525 80.38 48.343l124.073-.269c-2.455-11.324-5.826-22.328-10.148-32.873-12.824-31.777-33.57-59.633-59.872-81.212-36.252-29.827-83.054-47.74-134.08-47.63-51.026.111-97.713 18.227-133.839 48.21-26.206 21.693-46.83 49.64-59.518 81.471-9.323 23.204-14.378 48.478-14.32 74.933.228 105.302 81.676 191.78 186.042 202.568 7.402.792 14.908 1.162 22.52 1.146"
                        />
                        <path
                          stroke="url(#paint1_radial_3272_1582)"
                          strokeOpacity="0.48"
                          d="M-64.057 146.055c.227 105.035 81.472 191.308 185.593 202.07h.002c7.383.791 14.871 1.161 22.466 1.144 7.594-.016 15.082-.418 22.461-1.241h.002c89.695-9.65 162.114-75.262 180.316-160.391l-123.121.267c-15.184 28.895-45.531 48.651-80.501 48.727-35.894.078-67.014-20.622-81.926-50.73-6.014-12.086-9.375-25.701-9.406-40.098-.109-50.27 40.623-91.112 90.937-91.221 34.971-.076 65.367 19.513 80.679 48.342l123.152-.267c-2.439-11.084-5.754-21.856-9.987-32.185l-.001-.002-.606-1.483c-12.835-31.081-33.292-58.338-59.12-79.53h-.001c-36.165-29.755-82.855-47.625-133.761-47.515S45.639-39.875 9.601-9.964v.001c-26.144 21.64-46.717 49.518-59.373 81.27l-.001.002c-9.3 23.144-14.342 48.355-14.284 74.746Z"
                        />
                      </g>
                      <defs>
                        <radialGradient
                          id="paint1_radial_3272_1582"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="matrix(-349.49978 1.50059 -1.5136 -352.53175 343 131)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop
                            offset="0.633"
                            stopColor="#fff"
                            stopOpacity="0.06"
                          />
                        </radialGradient>
                        <linearGradient
                          id="paint0_linear_3272_1582"
                          x1="256.754"
                          x2="256.5"
                          y1="268.314"
                          y2="28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.112" stopColor="#5FA7EC" />
                          <stop offset="0.486" stopColor="#3591EB" />
                          <stop offset="0.758" stopColor="#66AEF4" />
                        </linearGradient>
                        <clipPath
                          id="bgblur_0_3272_1582_clip_path"
                          transform="translate(96.558 90.559)"
                        >
                          <path d="M144.005 349.769c7.612-.017 15.117-.419 22.515-1.244 90.119-9.696 162.85-75.751 180.883-161.39l-124.04.269c-15.054 28.883-45.317 48.652-80.203 48.727-35.697.078-66.646-20.508-81.476-50.451-5.982-12.018-9.324-25.558-9.355-39.878-.108-49.994 40.4-90.611 90.438-90.72 34.886-.076 65.198 19.525 80.38 48.343l124.073-.269c-2.455-11.324-5.826-22.328-10.148-32.873-12.824-31.777-33.57-59.633-59.872-81.212-36.252-29.827-83.054-47.74-134.08-47.63-51.026.111-97.713 18.227-133.839 48.21-26.206 21.693-46.83 49.64-59.518 81.471-9.323 23.204-14.378 48.478-14.32 74.933.228 105.302 81.676 191.78 186.042 202.568 7.402.792 14.908 1.162 22.52 1.146" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col gap-[1.25vw]">
                    <span className="text-alpha-dark-800 text-[0.833vw] leading-[1]">
                      Platform
                    </span>
                    <div className="flex flex-col gap-[1.25vw]">
                      <h4 className="font-geist-pixel-circle text-[1.354vw] leading-[110%] tracking-[-0.016vw]">
                        Agentic risk platform to <br /> fight financial crime
                      </h4>

                      <div className="grid grid-cols-2 gap-x-[1.25vw] gap-y-[0.417vw] text-[0.729vw] font-normal text-blue-50/90">
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Agentic AML Ops
                        </Link>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Transaction Monitoring
                        </Link>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Customer Risk Rating
                        </Link>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Sanctions Screening
                        </Link>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Case Management
                        </Link>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          Sponsor Monitor
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-[0.104vw] -bottom-[0.104vw] left-[1.25vw] h-[14.0625vw] overflow-hidden rounded-tl-[0.833vw] border-t border-l border-white/20 bg-[#002B5B] p-[0.625vw] shadow-2xl">
                    <div className="h-full w-full overflow-hidden rounded-tl-[0.625vw] bg-[#F8FAFC]">
                      <Image
                        src="https://i.pinimg.com/1200x/50/6f/a8/506fa8197b20a1fa08369a463f973282.jpg"
                        alt="Dashboard Preview"
                        width={500}
                        height={300}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </LayoutWrapper>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const ProductsDropdown = React.memo(ProductsDropdownComponent);
