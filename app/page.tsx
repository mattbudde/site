import { TextHeading } from "@/components/text-heading";
import Link from "next/link";
import { getPosts } from "./blog/utils";

export default async function Home() {
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
						{(await getPosts())
							.sort(
								(a, b) =>
									new Date(b.data.date).getTime() -
									new Date(a.data.date).getTime(),
							)
							.map((post) => (
								<div key={post.data.slug} className="space-y-1">
									<Link
										href={`/blog/${post.data.slug}`}
										className="text-lg font-medium hover:underline"
									>
										{post.data.title}
									</Link>
									<p className="text-sm text-gray-500">
										{new Date(post.data.date).toLocaleDateString("en-US", {
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
