import { TextHeading } from "@/components/text-heading";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getPosts } from "./utils";

export default async function Blog() {
	const posts = await getPosts();

	console.log(posts);

	return (
		<div className="max-w-4xl gap-4 flex flex-col">
			<TextHeading>Blog</TextHeading>
			<div className="space-y-4">
				{posts.map((post) => (
					<Card key={post.slug}>
						<CardHeader>
							<CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
							<CardDescription>{post.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Link
								className="text-blue-500 hover:underline"
								href={`/blog/${post.slug}`}
							>
								Read More
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
