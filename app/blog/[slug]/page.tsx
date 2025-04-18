import fs from "node:fs";
import path from "node:path";
import { getPost } from "../utils";
import { MDXRemote } from "next-mdx-remote/rsc";

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
	const post = await getPost(slug);

	if (!post) {
		return <div>Post not found</div>;
	}

	const { frontmatter, content } = post;

	return (
		<article className="prose prose-invert max-w-none">
			<h1>{frontmatter.title}</h1>
			<p>{frontmatter.date}</p>
			<MDXRemote source={content} />
		</article>
	);
}
