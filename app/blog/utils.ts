import fs from "node:fs";
import path from "node:path";

interface Frontmatter {
	title: string;
	description: string;
	date: string;
	[key: string]: string;
}

export async function getPosts() {
	const postsDirectory = path.join(process.cwd(), "content");
	const filenames = fs.readdirSync(postsDirectory);

	return filenames.map((filename) => {
		const { data, content } = parseFrontmatter(filename);

		const frontmatter: Frontmatter = {
			title: data.title,
			description: data.description,
			date: data.date,
			...data,
		};

		return {
			slug: filename.replace(/\.(md|mdx)?$/, ""),
			frontmatter,
			content,
		};
	});
}

export async function getPost(slug: string) {
	const posts = await getPosts();
	const post = posts.find((post) => post.slug === slug);

	if (!post) {
		return null;
	}

	const { frontmatter, content } = post;

	return {
		slug: post.slug,
		frontmatter,
		content,
	};
}

const parseFrontmatter = (filename: string): { data: Record<string, string>; content: string } => {
	const fileContent = fs.readFileSync(
		path.join(process.cwd(), "content", filename),
		"utf8",
	);

	if (!fileContent.startsWith("---")) {
		return { data: {}, content: fileContent };
	}

	const endDelimiterIndex = fileContent.indexOf("---", 3);
	if (endDelimiterIndex === -1) {
		return { data: {}, content: fileContent };
	}

	const frontmatterStr = fileContent.slice(3, endDelimiterIndex).trim();
	const content = fileContent.slice(endDelimiterIndex + 3).trim();

	const data: Record<string, string> = {};
	frontmatterStr.split("\n").forEach((line) => {
		const [key, ...valueParts] = line.split(":");
		if (key && valueParts.length) {
			data[key.trim()] = valueParts.join(":").trim();
		}
	});

	return { data, content };
};
