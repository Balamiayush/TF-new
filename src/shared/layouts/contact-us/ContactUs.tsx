"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CloseIcon from "@/shared/icons/CloseIcon";
import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";
import FormField from "@/shared/ui/FormField";
import { contactSchema, ContactFormData } from "@/schemas/contact.schema";
import useFormSubmit from "@/hook/useFormSubmit";
import FormStatusAlert from "@/shared/ui/FormStatusAlert";
import { submitDemoRequest } from "@/services/contact.service";
import useScrollLock from "@/hook/useScrollLock";


if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface ContactUsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const INDUSTRY_OPTIONS = [
  "Fintech",
  "Banking",
  "E-commerce",
  "SaaS",
  "Healthcare",
].map((label) => ({ label, href: "#" }));

const REFERRAL_OPTIONS = [
  "Search Engine (Google, Bing)",
  "Social Media (LinkedIn, Twitter)",
  "Word of Mouth / Colleague",
  "Blog / Article",
  "Other",
].map((label) => ({ label, href: "#" }));

const DROPDOWN_BTN_CLASS =
  "font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none";

const DROPDOWN_MENU_CLASS =
  "absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl";

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

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="font-geist text-[16px] leading-[20px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
    {children}
  </label>
);

export default function ContactUs({
  isOpen,
  onClose,
  onSuccess,
}: ContactUsProps) {
  // Pass isOpen directly into your Lenis-aware scroll lock hook
  useScrollLock(isOpen);

  const { status, handleSubmit: handleFormSubmit } =
    useFormSubmit<ContactFormData>({
      submitFn: submitDemoRequest,
      onSuccess,
      onClose,
      closeDelay: 2000,
    });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      companyName: "",
      industry: "",
      phoneNumber: "+977 - ",
      referralSource: "",
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      bodyOpenClassName="overflow-hidden"
      className="mantine-Drawer-root flex h-screen w-full items-center justify-center border-none bg-transparent p-0 outline-none"
      overlayClassName="fixed inset-0 z-[99999] bg-transparent"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[99999] flex h-screen w-full items-center justify-center bg-black/20 backdrop-blur-[20px]"
            data-lenis-prevent
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-[774px] flex-col gap-[48px] overflow-y-auto bg-white p-8"
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
                id="contact-form"
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex w-full flex-col gap-4 md:gap-7"
                noValidate
              >
                <FormField
                  label="Name"
                  type="text"
                  placeholder="Urja khadka"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    label="Work email"
                    type="email"
                    placeholder="example@thirdfactor.ai"
                    error={errors.workEmail?.message}
                    {...register("workEmail")}
                  />
                  <FormField
                    label="Company Name"
                    type="text"
                    placeholder="Company"
                    error={errors.companyName?.message}
                    {...register("companyName")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Industry</FieldLabel>
                    <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <DropDown
                          label={field.value || "Please Select"}
                          items={INDUSTRY_OPTIONS}
                          onSelect={field.onChange}
                          buttonClassName={DROPDOWN_BTN_CLASS}
                          menuClassName={DROPDOWN_MENU_CLASS}
                        />
                      )}
                    />
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.industry.message}
                      </p>
                    )}
                  </div>

                  <FormField
                    label="Phone Number"
                    type="text"
                    placeholder="+977 - "
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <FieldLabel>How did you hear about us?</FieldLabel>
                  <Controller
                    name="referralSource"
                    control={control}
                    render={({ field }) => (
                      <DropDown
                        label={field.value || "Please Select"}
                        items={REFERRAL_OPTIONS}
                        onSelect={field.onChange}
                        buttonClassName={DROPDOWN_BTN_CLASS}
                        menuClassName={DROPDOWN_MENU_CLASS}
                      />
                    )}
                  />
                  {errors.referralSource && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.referralSource.message}
                    </p>
                  )}
                </div>
              </form>

              {/* Footer Actions */}
              <div className="flex flex-col gap-3">
                <FormStatusAlert status={status} />

                <Button
                  type="submit"
                  form="contact-form"
                  variant="primary"
                  disabled={isSubmitting || status.type === "success"}
                  className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : status.type === "success"
                      ? "Submitted"
                      : "Submit request"}
                </Button>

                <p className="font-inter text-[13px] leading-[140%] text-slate-700 md:text-[14px]">
                  By submitting this form, you confirm that you have read{" "}
                  <br className="max-lg:hidden" /> and understand thirdfactor’s{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-slate-900 underline underline-offset-2 hover:text-blue-600"
                  >
                    Privacy Notice.
                  </Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}