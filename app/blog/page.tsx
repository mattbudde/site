import { TextHeading } from "@/components/text-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
					<Card key={post.data.title}>
						<CardHeader>
							<CardTitle>{post.data.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{post.data.description}</p>
							<Link
								href={`/blog/${post.data.slug}`}
								className="text-blue-500 hover:underline"
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
