import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
      <h1>Welcome to Remix</h1>
      <ul>
        {
          posts.map((post)=>(
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>))
        }
      </ul>
    </div>
  );
}
