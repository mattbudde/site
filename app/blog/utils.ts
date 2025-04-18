import fs from "node:fs";
import path from "node:path";

interface Frontmatter {
	title: string;
	description: string;
	date: string;
	[key: string]: string;  // Allow for additional frontmatter fields
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
			...data  // Include any additional frontmatter fields
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

	// Check if the file starts with frontmatter delimiter
	if (!fileContent.startsWith("---")) {
		return { data: {}, content: fileContent };
	}

	// Find the end of frontmatter
	const endDelimiterIndex = fileContent.indexOf("---", 3);
	if (endDelimiterIndex === -1) {
		return { data: {}, content: fileContent };
	}

	// Extract frontmatter and content
	const frontmatterStr = fileContent.slice(3, endDelimiterIndex).trim();
	const content = fileContent.slice(endDelimiterIndex + 3).trim();

	// Parse frontmatter as key-value pairs
	const data: Record<string, string> = {};
	frontmatterStr.split("\n").forEach((line) => {
		const [key, ...valueParts] = line.split(":");
		if (key && valueParts.length) {
			data[key.trim()] = valueParts.join(":").trim();
		}
	});

	return { data, content };
};
