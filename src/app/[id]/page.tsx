import { PostProps } from '@/components/Post'
import { PrismaClient } from '@prisma/client'
import { title } from 'process'
import ReactMarkdown from 'react-markdown'

const prisma = new PrismaClient()

export async function generateStaticParams() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true},
      },
    },
  })

  return feed.map((post) => ({
    id:post.id,
  }))
}

type Props = {
  feed: PostProps[]
}


export default function Page({ params }: {params:{id:string} }) {
    // const { author, content, published, title} = params.stuff;
  return (
    <div>
      {params.id}
        {/* <h2>{title? title : `no title`}</h2>
    <p>By {author? `${author}` : `Unknown author`}</p>
    {content?<ReactMarkdown>{content}</ReactMarkdown>:null} */}
    {/* {!published && userHasValidSession && postBelongsToUser && (
      <button onClick={() => publishPost(props.id)}>Publish</button>
    )}
    {userHasValidSession && postBelongsToUser && (
      <button onClick={() => deletePost(props.id)}>Delete</button>
    )} */}
  </div>  )
}