import prisma from "@/lib/prisma";
import BlogPost from "@/components/Post";


const getData = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

export default async function Page() {
  const data = await getData();
  return (
    <section className="page">
      {/* <h1>Public Feed</h1> */}
      {/* <main> */}
        {data.props.feed.map((post) => {
          if (post)
            return (
              <div key={post.id} className="post">
                <BlogPost post={post} />
              </div>
            );
        })}
      {/* </main> */}
    </section>
  );
}
