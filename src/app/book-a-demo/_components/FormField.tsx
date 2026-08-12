import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormField({ label, className = "", ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-geist text-[18px] font-medium leading-[20px] tracking-[-0.1px] text-slate-900">
        {label}
      </label>
      <input
        {...props}
        className={`font-inter h-[48px] w-full border border-slate-100 bg-[#F8FAFC] px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none ${className}`}
      />
    </div>
  );
}