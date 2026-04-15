import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronRight, ArrowLeft, User } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Articolo non trovato" };

  return {
    title: article.seo?.title ?? article.title,
    description:
      article.seo?.description ??
      article.excerpt ??
      `Leggi l'articolo: ${article.title}`,
    openGraph: {
      title: article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
  if (!projectId || projectId === "placeholder") return [];
  const articles = await getArticles(20);
  return articles.map((a: { slug: { current: string } }) => ({ slug: a.slug.current }));
}

function ArticleBody({ body }: { body: any[] }) {
  if (!body || body.length === 0) {
    return (
      <p className="text-brand-gray italic">Contenuto non disponibile.</p>
    );
  }

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-a:text-brand-blue prose-strong:text-brand-dark">
      {body.map((block: any, i: number) => {
        if (block._type !== "block") return null;

        const Tag =
          block.style === "h2"
            ? "h2"
            : block.style === "h3"
            ? "h3"
            : block.style === "h4"
            ? "h4"
            : block.style === "blockquote"
            ? "blockquote"
            : "p";

        const text = block.children
          ?.map((child: any) => child.text ?? "")
          .join("") ?? "";

        if (!text.trim()) return null;

        return (
          <Tag key={block._key ?? i} className={block.style === "blockquote" ? "border-l-4 border-brand-blue pl-4 italic text-brand-gray" : undefined}>
            {text}
          </Tag>
        );
      })}
    </div>
  );
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

  const imageUrl = article.image?.asset
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${article.image.asset._ref
        .replace("image-", "")
        .replace(/-(\w+)$/, ".$1")}`
    : null;

  const relatedArticles = await getArticles(3);
  const otherArticles = relatedArticles.filter(
    (a: { slug: { current: string } }) => a.slug.current !== slug
  ).slice(0, 2);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-brand-gray">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/news"
            className="hover:text-brand-blue transition-colors"
          >
            News
          </Link>
          <ChevronRight size={14} />
          <span className="text-brand-dark truncate max-w-[200px]">
            {article.title}
          </span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-brand-gray hover:text-brand-blue transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Torna alle news
        </Link>

        {/* Category & date */}
        <div className="flex items-center gap-3 mb-4">
          {article.category && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: article.category.color
                  ? `${article.category.color}20`
                  : "#e0e7ff",
                color: article.category.color ?? "#013DFF",
              }}
            >
              {article.category.title}
            </span>
          )}
          {article.publishedAt && (
            <span className="flex items-center gap-1 text-xs text-brand-gray">
              <Calendar size={12} />
              <span className="capitalize">{formatDate(article.publishedAt)}</span>
            </span>
          )}
          {article.author && (
            <span className="flex items-center gap-1 text-xs text-brand-gray">
              <User size={12} />
              {article.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-brand-gray leading-relaxed mb-8 border-l-4 border-brand-blue pl-4">
            {article.excerpt}
          </p>
        )}

        {/* Hero image */}
        {imageUrl && (
          <div className="rounded-brand overflow-hidden mb-10 aspect-[16/7]">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="bg-white rounded-brand p-8 shadow-sm">
          <ArticleBody body={article.body} />
        </div>

        {/* Related */}
        {otherArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-brand-dark mb-6">
              Altre news
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherArticles.map((related: any) => {
                const relImageUrl = related.image?.asset
                  ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${related.image.asset._ref
                      .replace("image-", "")
                      .replace(/-(\w+)$/, ".$1")}`
                  : null;
                return (
                  <Link
                    key={related._id}
                    href={`/news/${related.slug.current}`}
                    className="group bg-white rounded-brand overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    {relImageUrl && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={relImageUrl}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 text-sm">
                        {related.title}
                      </h3>
                      {related.publishedAt && (
                        <p className="text-xs text-brand-gray mt-1 capitalize">
                          {formatDate(related.publishedAt)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
