"use client";

import React from "react";

export type FormStatus = {
  type: "idle" | "success" | "error";
  message?: string;
};

interface FormStatusAlertProps {
  status: FormStatus;
  successMessage?: string;
}

export function FormStatusAlert({
  status,
  successMessage = "Thanks! We'll be in touch shortly.",
}: FormStatusAlertProps) {
  if (status.type === "idle") return null;

  if (status.type === "error") {
    return (
      <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {status.message}
      </div>
    );
  }

  if (status.type === "success") {
    return (
      <div className="border border-green-200 bg-green-50 p-3 text-sm text-green-800">
        {successMessage}
      </div>
    );
  }

  return null;
}

export default FormStatusAlert;
