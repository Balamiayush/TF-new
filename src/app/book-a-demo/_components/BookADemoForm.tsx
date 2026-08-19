"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";
import FormField from "@/shared/ui/FormField";
import { submitDemoRequest } from "@/services/demo.service";
import { DemoFormData, demoSchema } from "@/schemas/demo.schema";

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
}

const INDUSTRY_OPTIONS = [
  { label: "Fintech", href: "#" },
  { label: "Banking", href: "#" },
  { label: "E-commerce", href: "#" },
  { label: "SaaS", href: "#" },
  { label: "Healthcare", href: "#" },
];

export default function BookADemoForm({
  onSubmitSuccess,
  className = "",
}: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      phoneNumber: "+977 - ",
      companyName: "",
      industry: "",
      message: "",
    },
  });

  const handleFormSubmit = async (data: DemoFormData) => {
    setSubmitStatus("idle");
    setApiError("");

    try {
      await submitDemoRequest(data);
      setSubmitStatus("success");
      reset();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (err: any) {
      setSubmitStatus("error");
      setApiError(err.message || "Something went wrong. Please try again.");

      setTimeout(() => {
        setSubmitStatus("idle");
        setApiError("");
      }, 3000);
    }
  };

  return (
    <div className={`w-full max-w-[584px] ${className}`}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col gap-4 md:gap-6"
        noValidate
      >
        <FormField
          label="Name"
          type="text"
          placeholder="Hello"
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
            label="Phone Number"
            type="text"
            placeholder="+977 - "
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Company Name"
            type="text"
            placeholder="Hello"
            error={errors.companyName?.message}
            {...register("companyName")}
          />

          <div className="flex flex-col gap-2">
            <label className="font-geist text-[16px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
              Industry
            </label>
            <div className="w-full">
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <DropDown
                    label={field.value || "Please Select"}
                    items={INDUSTRY_OPTIONS}
                    onSelect={(selectedIndustry) =>
                      field.onChange(selectedIndustry)
                    }
                    buttonClassName="font-inter flex h-[48px] w-full items-center justify-between border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                    menuClassName="absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl"
                  />
                )}
              />
            </div>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-500">
                {errors.industry.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-geist text-[16px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]">
            How can we help?
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your product, existing content, goals, team size, or anything else you'd like to go over in the call."
            className="font-inter w-full resize-none border border-slate-100 bg-[#F8FAFC] p-4 text-[14px] leading-[150%] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none md:text-[15px]"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>
        {submitStatus === "error" && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        {submitStatus === "success" && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            Thanks! We&apos;ll be in touch shortly.
          </div>
        )}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Book a call"}
          </Button>

          <p className="font-inter text-[13px] leading-[140%] text-slate-700 md:text-[14px]">
            By submitting this form, you confirm that you have read and
            understand thirdfactor’s{" "}
            <a
              href="/privacy"
              className="text-slate-900 underline underline-offset-2 hover:text-blue-600"
            >
              Privacy Notice.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
