import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";


const streamlineData = [
  {
    title: "White-Label UI",
    description:
      "Native iOS and Android SDKs. Embed liveness detection and document capture in your app, fully branded.",
    imageSrc: "/images/white-label-ui.png",
    cardClass: "w-full lg:flex-1",
    textMaxW: "max-w-[294px]",
  },
  {
    title: "Build any identity workflow",
    description:
      "Use iFrame or headless React components for styling identity verification and fraud prevention.",
    imageSrc: "/images/build-identity-workflow.png",
    cardClass: "w-full lg:flex-1",
    textMaxW: "max-w-[260px]",
  },
  {
    title: "Full data ownership",
    description:
      "Your biometric scores, document data, and audit logs never leave your infrastructure. Not once.",
    imageSrc: "/images/full-data-ownership.png",
    cardClass: "w-full lg:w-[504px]",
    textMaxW: "max-w-[240px]",
  },
  {
    title: "REST API and Webhooks",
    description:
      "Clean REST endpoints for every capability. Real-time webhooks and streaming callbacks for verification events.",
    imageSrc: "/images/rest-api-webhooks.png",
    cardClass: "w-full lg:flex-1",
    textMaxW: "max-w-[280px]",
  },
];

export default function Streamline() {
  return (
    <div className="relative  w-full bg-white py-21">
      <LayoutWrapper>
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <h1 className="max-w-[620px] text-[48px] font-medium leading-[110%] tracking-[-0.6px] text-black">
            Streamline user verification from one dashboard.
          </h1>
          <p className="max-w-[554px] text-[16px] leading-[1.4] tracking-[-0.3px] text-gray-500">
            Identity events like onboarding and screening rely on separate
            tools. Third Factor unifies them into one platform with a single
            integration and audit trail.
          </p>
        </div>

 
        <div className="mt-21 flex flex-col gap-3">
      
          <div className="flex flex-col gap-3 lg:flex-row">
            {streamlineData.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className={`relative flex h-[266px] justify-between overflow-hidden rounded-lg bg-[#F1F5F9] p-8 ${card.cardClass}`}
              >
                <div className="flex flex-col justify-start z-10">
                  <h3 className="font-geist text-[24px] font-medium leading-[100%] tracking-[0.6px] text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-[22px] text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF] ${card.textMaxW}`}
                  >
                    {card.description}
                  </p>
                </div>

             
                <div className="absolute right-6 bottom-4 top-4 flex w-[220px] items-center justify-center">
                  {/* <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="h-auto max-h-full w-auto object-contain"
                  /> */}
                </div>
              </div>
            ))}
          </div>

        
          <div className="flex flex-col gap-3 lg:flex-row">
            {streamlineData.slice(2, 4).map((card, index) => (
              <div
                key={index}
                className={`relative flex h-[266px] justify-between overflow-hidden rounded-lg bg-[#F1F5F9] p-8 ${card.cardClass}`}
              >
                <div className="flex flex-col justify-start z-10">
                  <h3 className="font-geist text-[24px] font-medium leading-[100%] tracking-[0.6px] text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-[22px] text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF] ${card.textMaxW}`}
                  >
                    {card.description}
                  </p>
                </div>

             
                <div className="absolute right-6 bottom-4 top-4 flex w-[220px] items-center justify-center">
                  {/* <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="h-auto max-h-full w-auto object-contain"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}