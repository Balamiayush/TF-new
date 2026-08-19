"use client";

import React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";
import FormField from "@/shared/ui/FormField";
import { submitDemoRequest } from "@/services/demo.service";
import { DemoFormData, demoSchema } from "@/schemas/demo.schema";
import useFormSubmit from "@/hook/useFormSubmit";
import FormStatusAlert from "@/shared/ui/FormStatusAlert";

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

const FIELDS: {
  name: keyof DemoFormData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Hello" },
  { name: "workEmail", label: "Work email", type: "email", placeholder: "example@thirdfactor.ai" },
  { name: "phoneNumber", label: "Phone Number", type: "text", placeholder: "+977 - " },
  { name: "companyName", label: "Company Name", type: "text", placeholder: "Hello" },
];

const inputBase =
  "font-inter w-full border border-slate-100 bg-[#F8FAFC] text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none";
const labelClass =
  "font-geist text-[16px] font-medium tracking-[-0.1px] text-slate-900 md:text-[18px]";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className={labelClass}>{children}</label>
);

export default function BookADemoForm({ onSubmitSuccess, className = "" }: ContactFormProps) {
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

  const { status, handleSubmit: handleFormSubmit } = useFormSubmit<DemoFormData>({
    submitFn: async (data) => {
      const res = await submitDemoRequest(data);
      reset();
      return res;
    },
    onSuccess: onSubmitSuccess,
  });

  return (
    <div className={`w-full max-w-[584px] ${className}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-full flex-col gap-4 md:gap-6" noValidate>
        <FormField
          label={FIELDS[0].label}
          type={FIELDS[0].type}
          placeholder={FIELDS[0].placeholder}
          error={errors[FIELDS[0].name]?.message}
          {...register(FIELDS[0].name)}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FIELDS.slice(1, 3).map((f) => (
            <FormField
              key={f.name}
              label={f.label}
              type={f.type}
              placeholder={f.placeholder}
              error={errors[f.name]?.message}
              {...register(f.name)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label={FIELDS[3].label}
            type={FIELDS[3].type}
            placeholder={FIELDS[3].placeholder}
            error={errors[FIELDS[3].name]?.message}
            {...register(FIELDS[3].name)}
          />

          <div className="flex flex-col gap-2">
            <Label>Industry</Label>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <DropDown
                  label={field.value || "Please Select"}
                  items={INDUSTRY_OPTIONS}
                  onSelect={field.onChange}
                  buttonClassName={`${inputBase} flex h-[48px] items-center justify-between px-4 text-[15px]`}
                  menuClassName="absolute top-full left-0 z-50 mt-2 w-full rounded-xs border border-slate-200 bg-white p-1 shadow-xl"
                />
              )}
            />
            {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>How can we help?</Label>
          <textarea
            rows={4}
            placeholder="Tell us about your product, existing content, goals, team size, or anything else you'd like to go over in the call."
            className={`${inputBase} scrollbar-hidden resize-none p-4 text-[14px] leading-[150%] placeholder:text-slate-400 md:text-[15px]`}
            {...register("message")}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <FormStatusAlert status={status} />

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || status.type === "success"}
            className="h-[52px] w-full justify-center bg-[#0070F3] text-[16px] font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : status.type === "success" ? "Submitted" : "Book a call"}
          </Button>
          <p className="font-inter text-[13px] leading-[140%] text-slate-700 md:text-[14px]">
            By submitting this form, you confirm that you have read and understand thirdfactor's{" "}
            <Link href="/privacy" className="text-slate-900 underline underline-offset-2 hover:text-blue-600">
              Privacy Notice.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}