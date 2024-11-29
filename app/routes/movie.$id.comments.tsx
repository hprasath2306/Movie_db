import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { db } from "prisma/seed";

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await db.comment.findMany({
    where: {
      movieId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json({ data });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  });

  return Response.json({ data });
}

export default function Comments() {
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-5">Your Opinion</h1>

      <div>
        <Form method="POST">
          <textarea
            className="w-full border border-teal-500 rounded-lg p-2"
            name="comment"
            required
          ></textarea>
          <input type="hidden" name="id" value={id} />

          {navigation.state === "submitting" ? (
            <button
              type="button"
              disabled
              className="bg-teal-500 px-4 py-2 rounded-lg text-white"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-teal-500 px-4 py-2 rounded-lg text-white"
            >
              Comment
            </button>
          )}
        </Form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post: any) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
