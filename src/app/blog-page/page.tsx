import ArrowIcon from "@/shared/icons/ArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import Image from "next/image";
import React from "react";

export default function page() {
  const tableOfContents = [
    {
      id: "section-1",
      title:
        "How AI is scaling modern phishing scams and impersonation attacks",
      active: true,
    },
    {
      id: "section-2",
      title: "Unmasking AI-generated spoofed domains",
      active: false,
    },
    {
      id: "section-3",
      title: "Detecting coached users & session anomalies",
      active: false,
    },
    {
      id: "section-4",
      title: "Future-proofing identity verification against deepfakes",
      active: false,
    },
  ];

  const exploreArticles = [
    {
      id: 1,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 4,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 5,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 6,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900">
      {/* Main Post Section */}
      <LayoutWrapper>
        {/* Header Content */}
        <div className="flex flex-col items-start gap-[32px] pt-6 pb-8">
          <Button variant="tertiary">
            <ArrowIcon className="rotate-180" strokeWidth={2} />
            Back
          </Button>
          <h3 className="max-w-[703px] text-[28px] leading-[1.2] font-medium max-md:text-[32px] md:text-[42px]">
            AI fraud detection: The signals that catch cloned sites, coached
            users, and bots in real-time
          </h3>
          <div className="flex items-center justify-between gap-2">
            <div className="box h-9.5 w-9.5 rounded-sm bg-[#110017]"></div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[16px] leading-[100%] font-medium">
                Thirdfactor Team
              </p>
              <div className="font-inter flex items-center gap-2.5 text-sm leading-[1.1] text-slate-700">
                <p>7 min read</p>
                <div className="h-2 w-2 bg-slate-200"></div>
                <p>Jul 10, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Image */}
        <div className="py-8">
          <div className="relative h-[240px] w-full max-w-[834px] overflow-hidden rounded-lg bg-pink-300 sm:h-[320px] md:h-[437px]">
            <Image
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop"
              alt="AI Fraud Detection Hero"
              fill
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12 pb-20 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <article className="font-inter flex-1 space-y-3 text-[16px] leading-[150%] text-[#232529] lg:max-w-[810px]">
            <p>
              Financial fraud has evolved rapidly into a hyper-targeted, fully
              automated enterprise. As security controls get stronger, bad
              actors are shifting away from brute force and instead abusing user
              trust at scale—cloning legitimate web applications, deploying AI
              bots, and live-coaching users to hand over credential tokens.
            </p>
            <p>
              Traditional session signals like IP reputation and browser user
              agents are no longer sufficient to stop these threats. Modern
              attacks run through stealth residential proxies and headless
              browser instances designed specifically to mirror regular human
              behavior pixel-for-pixel.
            </p>
            <p>
              To stay ahead, risk engines must shift toward dynamic real-time
              telemetry. By tracking subtle physical micro-interactions—such as
              dynamic cursor velocity, focus event timings, and structural
              layout mutations—security teams can intercept automated takeover
              attempts before transactions finalize.
            </p>

            {/* Section 1 */}
            <h2
              id="section-1"
              className="font-geist max-w-[643px] pt-8 text-[26px] leading-[130%] font-medium text-slate-900 md:text-[32px]"
            >
              How AI is scaling modern phishing scams and impersonation attacks
            </h2>
            <p>
              Generative AI tools allow malicious actors to mirror entire web
              interfaces within seconds. Combined with real-time OTP
              interceptors, these cloned sites trap legitimate users into
              entering sensitive multi-factor authentication codes that bypass
              standard perimeter defenses.
            </p>
            <p>
              Detecting these proxies relies on catching environmental
              discrepancies—such as canvas fingerprint mismatches, missing
              browser APIs, or unnatural delays introduced during proxy packet
              forwarding.
            </p>

            {/* Inline Infographic Diagram */}
            <div className="relative my-12 h-[220px] w-full overflow-hidden rounded-lg bg-amber-50/40 p-4 sm:h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop"
                alt="Phishing Flow Infographic"
                fill
                className="object-cover"
              />
            </div>

            <h2
              id="section-2"
              className="font-geist text-[26px] leading-[130%] font-medium text-[#232529] md:text-[32px]"
            >
              Unmasking AI-generated spoofed domains
            </h2>
            <p>
              Beyond visual duplication, automated scripts scan DNS registers to
              purchase lookalike domains in real-time. When coupled with
              automated SSL certificates, these sites pass basic visual trust
              checks for everyday web users.
            </p>
            <p>
              Protecting users requires continuous DOM-tree hash validation and
              automated origin detection to identify when legitimate application
              state is rendered on unauthorized origins.
            </p>
          </article>

          <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[286px]">
            <div>
              <h4 className="font-geist mb-5 text-[18px] leading-none font-medium text-slate-900">
                In this article
              </h4>
              <nav className="relative flex flex-col gap-5 border-l-2 border-slate-200/80">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`font-inter relative pl-4 text-[14px] leading-[135%] transition-colors hover:text-[#D14FFF] ${
                      item.active
                        ? "font-medium text-[#D14FFF]"
                        : "text-slate-400"
                    }`}
                  >
                    {item.active && (
                      <span className="absolute top-0 left-[-2px] h-full w-[2px] rounded-full bg-[#D14FFF]" />
                    )}
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </LayoutWrapper>

      <section className="w-full bg-slate-50 py-16">
        <LayoutWrapper>
          <div className="mb-15 flex flex-col gap-21">
            <h3 className="font-geist text-[28px] font-medium text-slate-900 md:text-[48px]">
              Explore more articles
            </h3>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exploreArticles.map((article) => (
                <CardCom
                  key={article.id}
                  story={{
                    id: article.id,
                    title: article.title,
                    category: article.category,
                    date: article.date,
                    imageSrc: article.image,
                  }}
                />
              ))}
            </div>
          </div>
        </LayoutWrapper>
      </section>
    </div>
  );
}
