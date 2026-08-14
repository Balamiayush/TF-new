"use client";

import React, { useState } from "react";
import Button from "@/shared/ui/buttons/Button";
import FormField from "./FormField"; 
import { DropDown } from "@/shared/ui/DropDown";

export interface ContactFormData {
  name: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  industry: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

const INDUSTRY_OPTIONS = [
  { label: "Fintech", href: "#" },
  { label: "Banking", href: "#" },
  { label: "E-commerce", href: "#" },
  { label: "SaaS", href: "#" },
  { label: "Healthcare", href: "#" },
];

export default function ContactForm({
  onSubmit,
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    workEmail: "",
    phoneNumber: "+977 - ",
    companyName: "",
    industry: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-[584px] flex-col gap-4 md:gap-6 ${className}`}
    >
      <FormField
        label="Name"
        type="text"
        name="name"
        placeholder="Hello"
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
          label="Phone Number"
          type="text"
          name="phoneNumber"
          placeholder="+977 - "
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          label="Company Name"
          type="text"
          name="companyName"
          placeholder="Hello"
          value={formData.companyName}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-2">
          <label className="font-geist text-[16px] leading-[20px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
            Industry
          </label>
          <div className="w-full">
         <DropDown
  label={formData.industry || "Please Select"}
  items={INDUSTRY_OPTIONS}
  onSelect={(selectedIndustry) =>
    setFormData((prev) => ({ ...prev, industry: selectedIndustry }))
  }
  buttonClassName="font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
  menuClassName="absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl"
/>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-geist text-[16px] leading-[20px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
          How can we help?
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your product, existing content, goals, team size, or anything else you'd like to go over in the call."
          value={formData.message}
          onChange={handleChange}
          className="font-inter w-full resize-none border border-slate-100 bg-[#F8FAFC] p-4 text-[14px] leading-[150%] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none md:text-[15px]"
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600"
        >
          Book a call
        </Button>

        <p className="font-inter text-[13px] leading-[140%] text-slate-700 md:text-[14px]">
          By submitting this form, you confirm that you have read and understand
          thirdfactor’s{" "}
          <a
            href="/privacy"
            className="text-slate-900 underline underline-offset-2 hover:text-blue-600"
          >
            Privacy Notice.
          </a>
        </p>
      </div>
    </form>
  );
}