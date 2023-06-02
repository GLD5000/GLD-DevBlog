import { ReactElement } from 'react'
import { prisma } from '../../lib/prisma'
import Post, { PostProps } from '@/components/Post'

// export const getServerSideProps = async () => {
//   const posts = await prisma.post.findMany()

//   return { props: { posts } }
// }

const getData = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
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

type Props = {
  feed: PostProps[]
}

export default async function Page() {
  const data = await getData();
  return (
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {data.props.feed.map((post) => {
            if (post) return <div key={post.id} className="post">
              <Post post={post} />
            </div>
          })}
        </main>
      </div>
      // <style jsx>{`
      //   .post {
      //     background: white;
      //     transition: box-shadow 0.1s ease-in;
      //   }

      //   .post:hover {
      //     box-shadow: 1px 1px 3px #aaa;
      //   }

      //   .post + .post {
      //     margin-top: 2rem;
      //   }
      // `}</style>
  )
}
