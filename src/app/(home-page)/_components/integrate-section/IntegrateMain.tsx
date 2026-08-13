
import Integrate from './IntegrateSection';
import IntegrateMobile from './IntegrateMobile';
import { StepsDataType } from "./type";

export default function IntegrateMain() {
  const stepsData: StepsDataType[] = [
    {
      id: 'selfie',
      title: 'Selfie capture',
      description:
        'Passive liveness detection confirms a real person is present. Without asking them to do anything. Works in seconds. Blocks bots, deepfakes, and replay attacks.',
      imgSrc:
        'https://res.cloudinary.com/dfajjqglx/image/upload/v1786617023/mokeup_lneisr.png',
    },
    {
      id: 'upload',
      title: 'Upload document',
      description:
        "Automated OCR and document authenticity verification for passports, driver's licenses, and national IDs across global formats.",
      imgSrc:
        'https://res.cloudinary.com/dfajjqglx/image/upload/v1786617023/mokeup_lneisr.png',
    },
    {
      id: 'gesture',
      title: 'Active gesture',
      description:
        'Prompt users with randomized motion challenges to add an un-spoofable layer of biometric security when required.',
      imgSrc:
        'https://res.cloudinary.com/dfajjqglx/image/upload/v1786617023/mokeup_lneisr.png',
    },
    {
      id: 'videokyc',
      title: 'Video KYC',
      description:
        'High-trust video verification sessions with live agent integration and recorded audit logs for strict regulatory compliance.',
      imgSrc:
        'https://res.cloudinary.com/dfajjqglx/image/upload/v1786617023/mokeup_lneisr.png',
    },
  ];

  return (
    <div>
      <Integrate stepsData={stepsData} />
      <IntegrateMobile stepsData={stepsData} />
    </div>
  );
}