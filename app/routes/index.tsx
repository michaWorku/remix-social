import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Post } from "~/components/Post";
import { getPosts } from "~/services/posts.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction =async () => {
  const data = {posts: await getPosts()}

  return json<LoaderData>(data)
}

export default function Index() {
  const {posts} = useLoaderData() as LoaderData
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <ul>
        {
          posts.map((post)=>(
          <li key={post.id}>
            <Post header={post.title}>
              {post.body}
            </Post>
          </li>))
        }
      </ul>
    </div>
  );
}
