import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import Image from "next/image";

const storiesData = [
  {
    id: 1,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#CB6BED]", // Solid Purple
    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 2,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#121317]", // Dark Card
    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 3,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#0088D4]", // Solid Blue
    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
];

export default function ReadAllStories() {
  return (
    <section className="relative w-full bg-slate-50 py-21">
      <Image
        alt="gitter"
        fill
        className="pointer-events-none absolute h-full w-full"
        src={"/gitter.png"}
      />
      <LayoutWrapper>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-geist text-[26px] leading-[120%] font-medium tracking-[0px] text-[#1A1A1A] max-w-[280px] lg:max-w-[500px] lg:text-[40px]">
            Get insights, tips, and updates from our team.
          </h2>

          <Button variant="secondary">Read all stories</Button>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {storiesData.map((story) => (
            <div
              key={story.id}
              className="group flex w-[280px] shrink-0 cursor-pointer snap-start flex-col md:w-full"
            >
              <div
                className={`relative h-[256.5px] w-full overflow-hidden rounded-lg border border-gray-100 ${story.bgClass}`}
              >
                {story.imageSrc ? (
                  <img
                    src={story.imageSrc}
                    alt={story.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="font-inter mt-4 flex items-center gap-1.5 text-[12px] leading-[100%] font-medium tracking-[0%] text-[#1A1A1A]/60 uppercase">
                <span>{story.category}</span>
                <span>•</span>
                <span>{story.date}</span>
              </div>

              <h3 className="font-geist mt-2 text-[18px] leading-[120%] font-medium tracking-tight text-[#1A1A1A] transition-colors group-hover:text-blue-600">
                {story.title}
              </h3>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
