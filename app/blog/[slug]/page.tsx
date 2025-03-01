import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.(md|mdx)?$/, ""),
  }));
}

export default async function Page({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const {
    default: Post,
    title,
    description,
    date,
  } = await import(`@/content/${slug}.mdx`);

  return (
    <article className="max-w-2xl mx-auto px-4 py-10 text-white">
      <header className="mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2 text-white">{title}</h1>
        <time className="text-sm text-white" dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <p className="mt-4 text-xl text-white">{description}</p>
      </header>
      <div className="prose prose-lg prose-slate max-w-none text-white">
        <Post />
      </div>
    </article>
  );
}

export const dynamicParams = false;
