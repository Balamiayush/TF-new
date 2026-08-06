"use client";

import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and offer invoice-based billing for Enterprise customers. Annual plans can also be paid via bank transfer.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and offer invoice-based billing for Enterprise customers. Annual plans can also be paid via bank transfer.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and offer invoice-based billing for Enterprise customers. Annual plans can also be paid via bank transfer.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and offer invoice-based billing for Enterprise customers. Annual plans can also be paid via bank transfer.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and offer invoice-based billing for Enterprise customers. Annual plans can also be paid via bank transfer.",
  },
];

export default function FAQ() {
  // Set first item open by default to match your design screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-21">
      <div className="mx-auto max-w-[768px] px-4">
        {/* Header Title */}
        <h2 className="font-geist text-center text-[40px] font-normal leading-[120%] tracking-[0px] text-[#0F172A]">
          Frequently Asked Questions
        </h2>

        {/* Accordion List */}
        <div className="mt-12 flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => toggleAccordion(index)}
                className="cursor-pointer rounded-lg bg-[#F1F5F9] p-6 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-geist text-[20px] font-medium leading-[120%] tracking-[0px] text-[#0F172A]">
                    {item.question}
                  </h3>

                  {/* Plus / Minus Icon */}
                  <span className="text-xl text-[#0F172A]">
                    {isOpen ? (
                      <svg
                        width="16"
                        height="2"
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H15"
                          stroke="#0F172A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 1V15M1 8H15"
                          stroke="#0F172A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Answer Content */}
                {isOpen && (
                  <p className="font-inter mt-3 max-w-[560px] text-[16px] font-normal leading-[130%] tracking-[-0.5px] text-[#475569]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}