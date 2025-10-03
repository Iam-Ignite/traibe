import type { Route } from "./+types/articles.$id";
import { Link } from "react-router";
import { prisma } from "~/lib/db.server";
import { formatDate } from "~/lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      parent: true,
      children: true,
    },
  });

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  return { article };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.article.title || "Article"} - Mini CMS` },
    { name: "description", content: data?.article.content.substring(0, 155) },
  ];
}

export default function ArticleDetail({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Articles
          </Link>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Title and Meta */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {article.category}
              </span>
              {article.parent && (
                <Link
                  to={`/articles/${article.parent.id}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Parent: {article.parent.title}
                </Link>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Created: {formatDate(article.createdAt)}</span>
              <span>•</span>
              <span>Updated: {formatDate(article.updatedAt)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Child Articles */}
          {article.children.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Related Articles
              </h2>
              <div className="space-y-2">
                {article.children.map((child) => (
                  <Link
                    key={child.id}
                    to={`/articles/${child.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">{child.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {child.content.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
            <Link to={`/editor?id=${article.id}`} className="btn-primary">
              Edit Article
            </Link>
            <Link to="/" className="btn-secondary">
              Back to Articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
