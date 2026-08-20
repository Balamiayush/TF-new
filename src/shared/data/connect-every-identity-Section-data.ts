type AccordionItem = {
  id: number;
  title: string;
  description: string;
  src?: string;
};

type FeatureItem = {
  id: number;
  tag: string;
  title: string;
  description: string;

  src: string;
  ACCORDION_DATA: AccordionItem[];
};

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    tag: "Device and behavior",
    title: "Spot suspicious behavior from onboarding to payments",
    description:
      "Proprietary device and behavioral signals uncover early signs of fraud, without adding friction.",

    src: "/images/connect-every-identity-section/suspicious-behaviour-spotting.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "Face Detection",
        description:
          "Confirms a real, clearly visible face is present before verification begins.",
      },
      {
        id: 2,
        title: "Liveness Detection",
        description:
          "Active and passive checks prove the face belongs to a live, present person.",
      },
      {
        id: 3,
        title: "Face Matching",
        description: "Matches the detected face against the document.",
      },
    ],
  },
  {
    id: 2,
    tag: "Identity Verification",
    title: "Verify real identities in milliseconds",
    description: "Automated document scanning and face matching",
    src: "/images/connect-every-identity-section/verify-Identities-in.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "Document Verification & OCR",
        description:
          "Reads official documents — including handwritten Nepali document.",
      },
      {
        id: 2,
        title: "1:1 Face Match",
        description:
          "Confirms the live person is the same person on the submitted document.",
      },
      {
        id: 3,
        title: "1:N Face Match",
        description:
          "Compares one face against many to detect duplicates, fraud rings, and repeat applicants.",
      },
    ],
  },
  {
    id: 3,
    tag: "Compliance & Security",
    title: "Stay compliant with ever-changing regulations",
    description:
      "Bank-grade infrastructure built to scale effortlessly across jurisdictions.",
    src: "/images/connect-every-identity-section/stay-compliant-with.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "KYC / AML / PEP Screening",
        description: "Automated checks against sanction, PEP data.",
      },
      {
        id: 2,
        title: "On-Prem & Zero Data Retention",
        description: "Fully self-hosted and stateless.",
      },
      {
        id: 3,
        title: "Audit-Ready by Design",
        description:
          "Every verification and decision is logged with a human-in-the-loop trail.",
      },
    ],
  },
];
