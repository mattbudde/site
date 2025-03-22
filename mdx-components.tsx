import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
				{children}
			</h4>
		),
		p: ({ children }) => (
			<p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
		),
		ul: ({ children }) => (
			<ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
		),
		blockquote: ({ children }) => (
			<blockquote className="mt-6 border-l-2 pl-6 italic">
				{children}
			</blockquote>
		),
		img: (props) => (
			<Image
				sizes="100vw"
				style={{ width: "100%", height: "auto" }}
				{...(props as ImageProps)}
			/>
		),
		...components,
	};
}
