import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: "red", fontSize: "48px" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ color: "red", fontSize: "48px" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ color: "red", fontSize: "48px" }}>{children}</h4>
    ),
    p: ({ children }) => (
      <p style={{ color: "red", fontSize: "48px" }}>{children}</p>
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
