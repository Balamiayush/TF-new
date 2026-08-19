import CardCom from "@/shared/ui/card/CardCom";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import GitterImage from "@/shared/ui/GitterImg";
import React from "react";
import type { ArticleData } from "@/app/blog/type";

export default function SameCategoryBlog({
  relatedArticles,
}: {
  relatedArticles: ArticleData[];
}) {
  return (
    <section className="relative z-[10] w-full bg-slate-50 pt-16 pb-12">
      <LayoutWrapper>
        <h3 className="font-geist mb-4.5 text-[28px] font-medium text-slate-900 md:text-[48px]">
          Explore more articles
        </h3>
      </LayoutWrapper>

      <div className="relative flex flex-col gap-12 py-8">
        <GitterImage />
        <LayoutWrapper>
          {relatedArticles.length > 0 ? (
            <div className="relative z-[10] grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article) => {
                const cardImg = article.image
                  ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${article.collectionId}/${article.id}/${article.image}`
                  : "/placeholder-image.webp";

                return (
                  <CardCom
                    key={article.id}
                    story={{
                      id: article.id,
                      title: article.title,
                      category: article.category,
                      date: new Date(article.created).toLocaleDateString(),
                      imageSrc: cardImg,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500">
              No related articles found in this category.
            </p>
          )}
        </LayoutWrapper>
      </div>
    </section>
  );
}
