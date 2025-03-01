import fs from "fs";
import path from "path";

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    ...parseFrontmatter(filename),
  }));
}

const parseFrontmatter = (filename: string) => {
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
