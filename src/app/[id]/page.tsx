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

const getData = async (idIn: string) => {
  const feed = await prisma.post.findFirst({
    where: { id: idIn },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 10,
  }
}


export default async function Page({ params }: {params:{id:string} }) {
    // const { author, content, published, title} = params.stuff;
    const {props:{feed: post}} = await getData(params.id);

  return (
    <div className='prose dark:prose-invert'>
        <h2>{post?.title? post.title : `no title`}</h2>
    <p>By {post?.author?.name? `${post.author.name}` : `Unknown author`}</p>
    {post?.content?<ReactMarkdown>{post.content}</ReactMarkdown>:null} 
    {/* {!published && userHasValidSession && postBelongsToUser && (
      <button onClick={() => publishPost(props.id)}>Publish</button>
    )}
    {userHasValidSession && postBelongsToUser && (
      <button onClick={() => deletePost(props.id)}>Delete</button>
    )}*/}
  </div>  )
}