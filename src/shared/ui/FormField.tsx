import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id?: string;
}

export default function FormField({
  label,
  error,
  id,
  className = "",
  ...props
}: FormFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={fieldId}
        className="font-geist text-xl leading-5 font-medium tracking-[-0.1px] text-slate-900"
      >
        {label}
      </label>
      <input
        id={fieldId}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`font-inter h-12 w-full border bg-slate-50 px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-100 focus:border-blue-500"
        } ${className}`}
      />
      {error && (
        <span id={errorId} className="font-inter text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}