"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "@/shared/ui/buttons/Button";
import ContactUs from "@/shared/layouts/contact-us/ContactUs";

interface ContactUsButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "tertiary" | "contactus";
  className?: string;
  onSuccess?: () => void;
}

export default function ContactUsButton({
  children = "Contact us",
  variant = "contactus",
  className,
  onSuccess,
}: ContactUsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <ContactUs
            onClose={() => setIsOpen(false)}
            onSuccess={onSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}