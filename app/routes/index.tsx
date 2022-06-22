import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Post } from "~/components/Post";
import { PostForm } from "~/components/PostForm";
import { createPost, getPosts } from "~/services/posts.server";
import { CreatePost } from "~/services/validation";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

type ActionData = {
  error: {
    formError?: string[]
    fieldErrors?: {
      title: string[]
      body: string[]
    }
  }
  fields: {
    title: string
    body: string
  }
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawTitle = form.get('title')
  const rawBody = form.get('body')

  const result = CreatePost.safeParse({title: rawTitle, body: rawBody})

  if (!result.success) {
    return json(
      {error: result.error.flatten(), fields: {title: rawTitle, body: rawBody}},
      {status: 400},
    )
  }

  const post = await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
  })

  return redirect('/')
}

export const loader: LoaderFunction =async () => {
  const data = {posts: await getPosts()}

  return json<LoaderData>(data)
}

export default function Index() {
  const {posts} = useLoaderData() as LoaderData
  const formData = useActionData() as ActionData
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <div className="mb-8">
        <PostForm method="post" action="/?index" error={formData.error} fields={formData.fields} />
      </div>
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
