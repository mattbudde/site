import { TextHeading } from "@/components/text-heading";
import Link from "next/link";
import { getPosts } from "./blog/utils";

export default async function Home() {
	const posts = await getPosts();

	return (
		<div>
			<main className="flex flex-col gap-8">
				<div className="space-y-2">
					<TextHeading>Hi, I&apos;m Matt</TextHeading>
					<p className="text-gray-500 md:text-xl">
						I&apos;m a frontend developer, music lover, hockey enjoyer, gamer
						and{" "}
						<span className="text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
							insert random interest of the month here.
						</span>
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<TextHeading>Recent Posts</TextHeading>
					<div className="h-px bg-gray-600" />
					<div className="space-y-4">
						{posts.map((post) => (
							<div key={post.slug} className="space-y-1">
								<Link
									href={`/blog/${post.slug}`}
									className="text-lg font-medium hover:underline"
								>
									{post.title}
								</Link>
								<p className="text-sm text-gray-500">
									{new Date(post.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
