import React from 'react';
import Integrate, { StepsDataType } from './IntegrateSection';
import IntegrateMobile from './IntegrateMobile';

export default function IntegrateMain() {
  const stepsData: StepsDataType[] = [
    {
      id: 'selfie',
      title: 'Selfie capture',
      description:
        'Passive liveness detection confirms a real person is present. Without asking them to do anything. Works in seconds. Blocks bots, deepfakes, and replay attacks.',
      imgSrc:
        'https://images.pexels.com/photos/31145167/pexels-photo-31145167.jpeg',
    },
    {
      id: 'upload',
      title: 'Upload document',
      description:
        "Automated OCR and document authenticity verification for passports, driver's licenses, and national IDs across global formats.",
      imgSrc:
        'https://images.pexels.com/photos/15924114/pexels-photo-15924114.jpeg',
    },
    {
      id: 'gesture',
      title: 'Active gesture',
      description:
        'Prompt users with randomized motion challenges to add an un-spoofable layer of biometric security when required.',
      imgSrc:
        'https://images.pexels.com/photos/38135288/pexels-photo-38135288.jpeg',
    },
    {
      id: 'videokyc',
      title: 'Video KYC',
      description:
        'High-trust video verification sessions with live agent integration and recorded audit logs for strict regulatory compliance.',
      imgSrc:
        'https://images.pexels.com/photos/38845229/pexels-photo-38845229.jpeg',
    },
  ];

  return (
    <div>
      <Integrate stepsData={stepsData} />
      <IntegrateMobile stepsData={stepsData} />
    </div>
  );
}