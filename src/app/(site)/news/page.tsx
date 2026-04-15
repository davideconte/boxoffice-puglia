import Link from "next/link";
import { getArticles, getFeaturedArticle } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import type { Metadata } from "next";
import type { Article } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News ed Articoli",
  description: "Notizie, interviste, guide e approfondimenti sugli eventi pugliesi.",
};

export default async function NewsPage() {
  const [featured, articles] = await Promise.all([
    getFeaturedArticle().catch(() => null),
    getArticles().catch(() => []),
  ]);

  const rest = articles.filter((a: Article) => a._id !== featured?._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="text-5xl md:text-7xl font-mars text-brand-dark uppercase tracking-wide leading-none mb-10 pb-6 border-b-2 border-brand-dark">
        News ed Articoli
      </h1>

      {articles.length === 0 && (
        <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300">
          <Newspaper className="mx-auto text-brand-gray mb-4" size={48} />
          <h3 className="font-extrabold text-2xl text-brand-dark uppercase mb-2">Nessun articolo</h3>
          <p className="font-bold text-brand-gray uppercase tracking-widest">Attualmente non ci sono news pubblicate.</p>
        </div>
      )}

      {/* Featured article */}
      {featured && (
        <Link href={`/news/${featured.slug.current}`} className="group block mb-12 border-2 border-brand-dark transition-transform hover:-translate-y-1">
          <div className="relative bg-brand-dark h-72 sm:h-96">
            {featured.image?.asset && (
              <img
                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${featured.image.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`}
                alt={featured.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="inline-block bg-brand-yellow text-brand-dark text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 border-2 border-brand-dark">
                In evidenza
              </span>
              <h2 className="text-white font-extrabold uppercase leading-none text-3xl sm:text-4xl mb-4 group-hover:text-brand-lime transition-colors">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-white/80 font-medium text-lg max-w-3xl line-clamp-2">{featured.excerpt}</p>
              )}
              <p className="text-white/60 font-bold uppercase tracking-widest text-xs mt-4">{formatDate(featured.publishedAt)}</p>
            </div>
          </div>
        </Link>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article: Article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const imgUrl = article.image?.asset
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${article.image.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`
    : null;

  return (
    <Link href={`/news/${article.slug.current}`} className="group flex flex-col bg-white border-2 border-brand-dark h-full transition-transform hover:-translate-y-1">
      <div className="aspect-[16/9] overflow-hidden bg-brand-dark border-b-2 border-brand-dark">
        {imgUrl ? (
          <img src={imgUrl} alt={article.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Newspaper className="text-gray-300" size={40} />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {article.categories?.[0] && (
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2 block">{article.categories[0].title}</span>
        )}
        <h3 className="font-extrabold text-xl uppercase leading-none text-brand-dark mb-4 line-clamp-3 group-hover:text-brand-blue transition-colors">
          {article.title}
        </h3>
        {article.excerpt && <p className="text-sm font-medium text-brand-dark line-clamp-2 mb-4 flex-1">{article.excerpt}</p>}
        <p className="text-xs font-bold text-brand-gray uppercase tracking-widest pt-4 border-t-2 border-gray-100 mt-auto">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
