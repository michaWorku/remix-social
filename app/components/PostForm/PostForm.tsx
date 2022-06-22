import type {Props} from './types'

function PostForm({error, fields, method = 'post', ...props}: Props) {
  return (
    <form className="flex flex-col gap-4" method={method} {...props}>
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2 text-gray-600">
          Title
        </label>
        <input
          defaultValue={fields?.title}
          className="p-4"
          name="title"
          placeholder="Title of your post"
        />
        {
          error?.fieldErrors?.title?.map((title)=>(
                <p className="text-red-500">{title}</p>
          ))
        }
        {/* {false && error?.fieldErrors?.title?.length > 0 && (
          <p className="text-red-500">{error?.fieldErrors?.title?.toString()}</p>
        )} */}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-600">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          className="p-4"
          name="body"
          placeholder="Write something amazing"
        />
        {
          error?.fieldErrors?.body?.map((body)=>(
            <p className="text-red-500">{body}</p>
          ))
        }
        {/* {false && error?.fieldErrors?.body && (
          <p className="text-red-500">{error?.fieldErrors?.body[0]}</p>
        )} */}
      </div>
      {error?.formError && <p className="text-red-500">{error.formError}</p>}
      <button
        type="submit"
        className="transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100"
      >
        Create Post
      </button>
    </form>
  )
}

export default PostForm