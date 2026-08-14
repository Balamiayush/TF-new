
import { MegaMenuData } from "@/shared/types";

export const productsMenuData: MegaMenuData = {
  heading: "Explore our suite of features",
  categories: [
    {
      title: "Onboarding",
      items: [
        { label: "Global KYC", href: "/products/kyc" },
        { label: "Global KYB", href: "/products/kyb" },
        { label: "Identity Verification", href: "/products/identity-verification" },
        { label: "Bank Verification", href: "/products/bank-verification" },
        { label: "Credit Underwriting", href: "/products/credit-underwriting" },
      ],
    },
    {
      title: "Fraud Prevention",
      items: [
        { label: "Agentic Fraud Ops", href: "/products/agentic-fraud" },
        { label: "Device & Behavior", href: "/products/device-behavior" },
        { label: "Payment Fraud", href: "/products/payment-fraud" },
        { label: "Bank Transactions", href: "/products/bank-transactions" },
        { label: "Card Issuing Fraud", href: "/products/card-issuing-fraud" },
        { label: "Merchant Monitoring", href: "/products/merchant-monitoring" },
        { label: "Policy Abuse", href: "/products/policy-abuse" },
      ],
    },
    {
      title: "Cyber Security",
      items: [
        { label: "Agentic AML Ops", href: "/products/aml-ops" },
        { label: "Transaction Monitoring", href: "/products/transaction-monitoring" },
        { label: "Customer Risk Rating", href: "/products/risk-rating" },
        { label: "Sanctions Screening", href: "/products/sanctions-screening" },
        { label: "Case Management", href: "/products/case-management" },
        { label: "Sponsor Monitor", href: "/products/sponsor-monitor" },
      ],
    },
  ],
  featured: {
    title: "Platform",
    description: "Agentic risk platform to fight financial crime",
    previewImage: "/images/platform-preview.jpg", // replace with actual path
    links: [
      { label: "Agentic AML Ops", href: "/platform/aml-ops" },
      { label: "Transaction Monitoring", href: "/platform/transaction-monitoring" },
      { label: "Customer Risk Rating", href: "/platform/risk-rating" },
      { label: "Sanctions Screening", href: "/platform/sanctions-screening" },
      { label: "Case Management", href: "/platform/case-management" },
      { label: "Sponsor Monitor", href: "/platform/sponsor-monitor" },
    ],
  },
};