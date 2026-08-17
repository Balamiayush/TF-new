"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@/shared/icons/CloseIcon";
import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";
import FormField from "@/shared/ui/FormField";
import { useLenisContext } from "@/store/lenis-context";

export interface ContactFormData {
  name: string;
  workEmail: string;
  companyName: string;
  industry: string;
  phoneNumber: string;
  referralSource: string;
}

interface ContactUsProps {
  onClose?: () => void;
  onSubmit?: (data: ContactFormData) => void;
}

const INDUSTRY_OPTIONS = [
  { label: "Fintech", href: "#" },
  { label: "Banking", href: "#" },
  { label: "E-commerce", href: "#" },
  { label: "SaaS", href: "#" },
  { label: "Healthcare", href: "#" },
];

const REFERRAL_OPTIONS = [
  { label: "Search Engine (Google, Bing)", href: "#" },
  { label: "Social Media (LinkedIn, Twitter)", href: "#" },
  { label: "Word of Mouth / Colleague", href: "#" },
  { label: "Blog / Article", href: "#" },
  { label: "Other", href: "#" },
];

export default function ContactUs({ onClose, onSubmit }: ContactUsProps) {
  const lenis = useLenisContext();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    workEmail: "",
    companyName: "",
    industry: "",
    phoneNumber: "+977 - ",
    referralSource: "",
  });

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = originalStyle;
    };
  }, [lenis]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={handleClose}
      className="fixed inset-0 z-[100000] flex h-screen w-full items-center justify-center bg-black/20 backdrop-blur-[20px]"
      data-lenis-prevent
    >
      <motion.div
        initial={{
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 0.96,
          y: -12,
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          y: 0,
          opacity: 1,
        }}
        exit={{
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 0.9,
          y: -8,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], 
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[774px] flex-col gap-[48px] bg-white p-8 "
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <p className="text-[34px] leading-[1.1] font-medium tracking-[-0.6px]">
            Contact us
          </p>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1 transition-opacity hover:opacity-70"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 md:gap-7"
        >
          {/* Name Field */}
          <FormField
            label="Name"
            type="text"
            name="name"
            placeholder="Urja khadka"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="Work email"
              type="email"
              name="workEmail"
              placeholder="example@thirdfactor.ai"
              value={formData.workEmail}
              onChange={handleChange}
            />

            <FormField
              label="Company Name"
              type="text"
              name="companyName"
              placeholder="Company"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-geist text-[16px] leading-[20px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
                Industry
              </label>
              <div className="w-full">
                <DropDown
                  label={formData.industry || "Please Select"}
                  items={INDUSTRY_OPTIONS}
                  onSelect={(selectedIndustry) =>
                    setFormData((prev) => ({
                      ...prev,
                      industry: selectedIndustry,
                    }))
                  }
                  buttonClassName="font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                  menuClassName="absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl"
                />
              </div>
            </div>

            <FormField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              placeholder="+977 - "
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-geist text-[16px] leading-[20px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
              How did you hear about us?
            </label>
            <div className="w-full">
              <DropDown
                label={formData.referralSource || "Please Select"}
                items={REFERRAL_OPTIONS}
                onSelect={(selectedSource) =>
                  setFormData((prev) => ({
                    ...prev,
                    referralSource: selectedSource,
                  }))
                }
                buttonClassName="font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                menuClassName="absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl"
              />
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            variant="primary"
            className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600"
          >
            Submit request
          </Button>

          <p className="font-inter text-[13px] leading-[140%] text-slate-700 md:text-[14px]">
            By submitting this form, you confirm that you have read <br /> and
            understand thirdfactor’s{" "}
            <a
              href="/privacy"
              className="text-slate-900 underline underline-offset-2 hover:text-blue-600"
            >
              Privacy Notice.
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
