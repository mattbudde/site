import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'content')
    const filenames = fs.readdirSync(postsDirectory)

    return filenames.map((filename) => ({
        slug: filename.replace(/\.(md|mdx)?$/, ''),
    }))
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { default: Post, title, description, date } = await import(`@/content/${slug}.mdx`)

    return (
        <article>
            <h1>{title}</h1>
            <time dateTime={date}>{date}</time>
            <p>{description}</p>
            <Post />
        </article>
    )
}

export const dynamicParams = false