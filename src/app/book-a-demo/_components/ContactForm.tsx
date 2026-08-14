"use client";

import React, { useState } from "react";
import Button from "@/shared/ui/buttons/Button";
import FormField from "./FormField"; // adjust import path as needed

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      {/* Name Field */}
      <FormField
        label="Name"
        type="text"
        name="name"
        placeholder="Hello"
        value={formData.name}
        onChange={handleChange}
      />

      {/* Email & Phone - Stacked on Mobile, 2-Cols on Desktop */}
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

      {/* Company & Industry - Stacked on Mobile, 2-Cols on Desktop */}
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
          <div className="relative w-full">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="font-inter h-[48px] w-full appearance-none border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <option value="" disabled hidden>
                Please Select
              </option>
              <option value="Fintech">Fintech</option>
              <option value="Banking">Banking</option>
              <option value="E-commerce">E-commerce</option>
              <option value="SaaS">SaaS</option>
              <option value="Healthcare">Healthcare</option>
            </select>
            {/* Custom Caret Arrow */}
            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Textarea Field */}
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

      {/* Submit Button & Disclaimer */}
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