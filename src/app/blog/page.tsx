import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import Image from "next/image";


export default function page() {
  const categories = [
    { name: "All", count: 12 },
    { name: "Identity", count: 10 },
    { name: "Compliance", count: 10 },
    { name: "AI", count: 10 },
    { name: "Security", count: 10 },
    { name: "Product", count: 10 },
  ];

  const blogPosts = [
    {
      id: 1,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 4,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 5,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 6,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 7,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 8,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 9,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 10,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 11,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 12,
      category: "Marketing",
      title: "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 pt-[120px]">
          <h2 className="text-[26px] font-medium leading-[1.2] text-black max-md:max-w-[201px] lg:text-[48px]">
            The Thirdfactor Blogs
          </h2>

         <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] max-md:[&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:pb-0">
  {categories.map((category) => (
    <div key={category.name} className="group shrink-0">
      <Button variant="tertiary">
        {category.name}{" "}
        <span className="font-geist-pixel-circle text-blue-500 group-hover:text-white">
          [{category.count}]
        </span>
      </Button>
    </div>
  ))}
</div>
        </div>

        <div className="blog-cards-container mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1: Featured Left */}
          <div className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-2 md:col-span-2 md:flex-row md:items-center md:gap-6">
            <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-black/5 md:h-full md:w-1/2">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between py-2 max-md:mt-4">
              <div>
                <div className="font-inter text-[13px] font-medium text-slate-500">
                  {blogPosts[0].category}
                </div>
                <h3 className="font-geist mt-3 text-[20px] font-medium leading-[130%] tracking-[-0.3px] text-slate-900 transition-colors group-hover:text-blue-600 lg:text-[22px]">
                  {blogPosts[0].title}
                </h3>
              </div>
              <div className="font-inter mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-500">
                <span>{blogPosts[0].date}</span>
              </div>
            </div>
          </div>

          <CardCom
            story={{
              id: blogPosts[1].id,
              title: blogPosts[1].title,
              category: blogPosts[1].category,
              date: blogPosts[1].date,
              imageSrc: blogPosts[1].image,
            }}
          />

     
          <div className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2 md:flex-row md:items-center md:gap-6">
            <div className="flex flex-1 flex-col justify-between py-2 max-md:order-2 max-md:mt-4">
              <div>
                <div className="font-inter text-[13px] font-medium text-slate-500">
                  {blogPosts[2].category}
                </div>
                <h3 className="font-geist mt-3 text-[20px] font-medium leading-[130%] tracking-[-0.3px] text-slate-900 transition-colors group-hover:text-blue-600 lg:text-[22px]">
                  {blogPosts[2].title}
                </h3>
              </div>
              <div className="font-inter mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-500">
                <span>{blogPosts[2].date}</span>
              </div>
            </div>
            <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-black/5 max-md:order-1 md:h-full md:w-1/2">
              <Image
                src={blogPosts[2].image}
                alt={blogPosts[2].title}
                fill
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <CardCom
            story={{
              id: blogPosts[3].id,
              title: blogPosts[3].title,
              category: blogPosts[3].category,
              date: blogPosts[3].date,
              imageSrc: blogPosts[3].image,
            }}
          />

          {/* Grid standard items using CardCom */}
          {blogPosts.slice(4).map((post) => (
            <CardCom
              key={post.id}
              story={{
                id: post.id,
                title: post.title,
                category: post.category,
                date: post.date,
                imageSrc: post.image,
              }}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary">View more blog</Button>
        </div>
      </LayoutWrapper>
    </div>
  );
}