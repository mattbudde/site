export default function Loading() {
	return (
		<article className="px-4 py-10 prose prose-invert max-w-none animate-pulse">
			<div className="h-6 bg-zinc-800 rounded w-1/2" />
			<div className="h-6 bg-zinc-800 rounded w-1/4 mt-2" />
			<div className="space-y-4 mt-6">
				<div className="h-4 bg-zinc-800 rounded w-3/4" />
				<div className="h-4 bg-zinc-800 rounded w-11/12" />
				<div className="h-4 bg-zinc-800 rounded w-4/5" />
				<div className="h-4 bg-zinc-800 rounded w-11/12" />
				<div className="h-4 bg-zinc-800 rounded w-3/4" />
				<div className="h-4 bg-zinc-800 rounded w-5/6" />
				<div className="h-4 bg-zinc-800 rounded w-2/3" />
			</div>
		</article>
	);
}
