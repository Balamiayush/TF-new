import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import Image from "next/image";

interface BlogPost {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

interface FeaturedCardProps {
  post: BlogPost;
  reversed?: boolean;
}

function FeaturedCard({ post, reversed = false }: FeaturedCardProps) {
  return (
    <div className="group flex cursor-pointer flex-col justify-between rounded-[8px] border border-slate-200 bg-white p-2 transition-all duration-300 hover:bg-slate-100 hover:translate-y-[-2.5%] md:col-span-2 md:flex-row md:gap-6">
      <div
        className={`relative h-[240px] w-full overflow-hidden rounded-[6px] border border-black/5 md:h-full md:w-1/2 ${
          reversed ? "max-md:order-1" : ""
        }`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div
        className={`flex flex-1 flex-col justify-between py-2 max-md:mt-4 ${
          reversed ? "max-md:order-2" : ""
        }`}
      >
        <div>
          <div className="font-inter text-[14px] font-medium text-slate-500">
            {post.category}
          </div>
          <h3 className="font-geist mt-3 text-[20px] font-medium leading-[130%] tracking-[-0.3px] text-slate-900 transition-colors group-hover:text-blue-600 lg:text-[22px]">
            {post.title}
          </h3>
        </div>
        <div className="font-inter mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-500">
          <div className="font-inter mt-6 flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <span className="text-[10px] text-slate-700">•</span>
              <span>{post.date}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function page() {
  const categories = [
    { name: "All", count: 12 },
    { name: "Identity", count: 10 },
    { name: "Compliance", count: 10 },
    { name: "AI", count: 10 },
    { name: "Security", count: 10 },
    { name: "Product", count: 10 },
  ];

  const blogPosts: BlogPost[] = [
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
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
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
    {
      id: 7,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 8,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 9,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 10,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 11,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 12,
      category: "Marketing",
      title:
        "Fraudology: Closing the chargeback representment gap between issuers and",
      date: "JUL 7, 2026",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1170&auto=format&fit=crop",
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
          {blogPosts[0] && <FeaturedCard post={blogPosts[0]} />}

          {blogPosts[1] && (
            <CardCom
              story={{
                id: blogPosts[1].id,
                title: blogPosts[1].title,
                category: blogPosts[1].category,
                date: blogPosts[1].date,
                imageSrc: blogPosts[1].image,
              }}
            />
          )}

          {/* Row 2: Featured Right (Reversed layout for mobile order) */}
          {blogPosts[2] && <FeaturedCard post={blogPosts[2]} reversed />}

          {blogPosts[3] && (
            <CardCom
              story={{
                id: blogPosts[3].id,
                title: blogPosts[3].title,
                category: blogPosts[3].category,
                date: blogPosts[3].date,
                imageSrc: blogPosts[3].image,
              }}
            />
          )}

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