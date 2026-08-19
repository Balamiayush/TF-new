"use client";

import { useState } from "react";

type FormStatus = {
  type: "idle" | "success" | "error";
  message?: string;
};

interface UseFormSubmitOptions<TData> {
  submitFn: (data: TData) => Promise<unknown>;
  onSuccess?: () => void;
  onClose?: () => void;
  closeDelay?: number;
}

export function useFormSubmit<TData>({
  submitFn,
  onSuccess,
  onClose,
  closeDelay = 2000,
}: UseFormSubmitOptions<TData>) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleSubmit = async (data: TData) => {
    setStatus({ type: "idle" });
    try {
      await submitFn(data);
      setStatus({ type: "success" });
      onSuccess?.();

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, closeDelay);
      }
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
      });
    }
  };

  const resetStatus = () => setStatus({ type: "idle" });

  return { status, handleSubmit, resetStatus };
}

export default useFormSubmit;