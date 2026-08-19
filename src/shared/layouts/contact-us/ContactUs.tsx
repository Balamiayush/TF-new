"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@/shared/icons/CloseIcon";
import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";
import FormField from "@/shared/ui/FormField";
import { useLenisContext } from "@/store/lenis-context";

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------
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
  onSuccess?: () => void;
}

type SubmitStatus = "idle" | "success" | "error";

const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  workEmail: "",
  companyName: "",
  industry: "",
  phoneNumber: "+977 - ",
  referralSource: "",
};

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

const DROPDOWN_BTN_CLASS =
  "font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none";

const DROPDOWN_MENU_CLASS =
  "absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl";

// ----------------------------------------------------------------------
// Motion Variants
// ----------------------------------------------------------------------
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 0.96, y: -12, opacity: 0 },
  visible: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0, opacity: 1 },
  exit: { clipPath: "inset(0% 0% 100% 0%)", scale: 0.9, y: -8, opacity: 0 },
};

// ----------------------------------------------------------------------
// Custom Hooks
// ----------------------------------------------------------------------
function useScrollLock() {
  const lenis = useLenisContext();

  useEffect(() => {
    if (lenis) lenis.stop();
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = originalStyle;
    };
  }, [lenis]);
}

function useContactForm(onSuccess?: () => void, onClose?: () => void) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setApiError(null);

    const isInvalid = Object.values(formData).some((val) => !val.trim());
    if (isInvalid) {
      setSubmitStatus("error");
      setApiError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to submit the contact message.");
      }

      setSubmitStatus("success");
      onSuccess?.();

      // Optionally close after 2 seconds on success
      setTimeout(() => {
        onClose?.();
      }, 2000);
    } catch (err: any) {
      setSubmitStatus("error");
      setApiError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    submitStatus,
    apiError,
    handleChange,
    handleSelect,
    handleSubmit,
  };
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function ContactUs({ onClose, onSuccess }: ContactUsProps) {
  useScrollLock();

  const {
    formData,
    isLoading,
    submitStatus,
    apiError,
    handleChange,
    handleSelect,
    handleSubmit,
  } = useContactForm(onSuccess, onClose);

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onClose}
      className="fixed inset-0 z-[100000] flex h-screen w-full items-center justify-center bg-black/20 backdrop-blur-[20px]"
      data-lenis-prevent
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[774px]   flex-col gap-[48px] bg-white p-8"
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <p className="text-[34px] font-medium leading-[1.1] tracking-[-0.6px]">
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
          id="contact-form"
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 md:gap-7"
        >
          

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
              <label className="font-geist text-[16px] font-medium leading-[20px] tracking-[-0.1px] text-slate-900 md:text-[18px]">
                Industry
              </label>
              <div className="w-full">
                <DropDown
                  label={formData.industry || "Please Select"}
                  items={INDUSTRY_OPTIONS}
                  onSelect={(val) => handleSelect("industry", val)}
                  buttonClassName={DROPDOWN_BTN_CLASS}
                  menuClassName={DROPDOWN_MENU_CLASS}
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
            <label className="font-geist text-[16px] font-medium leading-[20px] tracking-[-0.1px] text-slate-900 md:text-[18px]">
              How did you hear about us?
            </label>
            <div className="w-full">
              <DropDown
                label={formData.referralSource || "Please Select"}
                items={REFERRAL_OPTIONS}
                onSelect={(val) => handleSelect("referralSource", val)}
                buttonClassName={DROPDOWN_BTN_CLASS}
                menuClassName={DROPDOWN_MENU_CLASS}
              />
            </div>
          </div>
        </form>

       
        <div className="flex flex-col gap-3">
        
        {submitStatus === "error" && (
            <div className=" rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {apiError}
            </div>
          )}

          {submitStatus === "success" && (
            <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
              Thanks! We&apos;ll be in touch shortly.
            </div>
          )}
          <Button
            type="submit"
            form="contact-form"
            variant="primary"
            disabled={isLoading || submitStatus === "success"}
            className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : submitStatus === "success" ? "Submitted" : "Submit request"}
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