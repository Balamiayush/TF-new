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
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee for all new subscriptions. If you are not satisfied, you can request a full refund through your billing settings or by contacting support.",
  },
  {
    id: 3,
    question: "Can I change my subscription plan later?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account dashboard. Changes will take effect immediately.",
  },
  {
    id: 4,
    question: "Do you offer discounts for non-profits and students?",
    answer:
      "Yes! We offer special pricing for educational institutions, students, and registered non-profit organizations. Reach out to our sales team with proof of status.",
  },
  {
    id: 5,
    question: "Is technical support available 24/7?",
    answer:
      "Our standard support team operates during business hours, but Enterprise customers receive around-the-clock dedicated technical assistance and fast SLA response times.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-21">
      <div className="mx-auto max-w-[768px] px-4">
      
        <h2 className="font-geist lg:text-center text-[26px] font-medium lg:text-[40px] max-md:max-w-[209px] leading-[120%] tracking-[0px] text-[#0F172A]">
          Frequently Asked Questions
        </h2>

      
        <div className="lg:mt-12 mt-8 flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => toggleAccordion(index)}
                className="cursor-pointer rounded-lg bg-[#F1F5F9] p-6 transition-colors duration-300 hover:bg-[#E2E8F0]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-geist text-[16px] lg:text-[20px] font-medium leading-[120%] tracking-[0px] text-[#0F172A]">
                    {item.question}
                  </h3>

                 
                  <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                
                    <span className="absolute h-[2px] w-full rounded-full bg-[#0F172A]" />
                    <span
                      className={`absolute h-full w-[2px] rounded-full bg-[#0F172A] transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-inter text-[14px] lg:max-w-[560px] lg:text-[16px] font-normal leading-[130%] tracking-[-0.5px] text-[#475569]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}