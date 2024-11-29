import { Link } from "@remix-run/react";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWJjZmNiZGVjNWRlMjQxMDhiNjEyMDY0ZDY4YWYzOSIsIm5iZiI6MTczMjg1OTY2OC4zNjU0ODExLCJzdWIiOiI2NzQ5NTYxZGIzZDNlYjkzM2JhMjRlZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QJYyiqVOoZiahmFSpn6pe5b5DKN_NHjSeRxLBVZWmJc",
      },
    }
  );
  return Response.json(await url.json());
}

export default function MovieDetails() {
  const data: any = useLoaderData();
  return (
    <div className="min-h-screen p-10 ">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] object-cover w-full rounded-lg"
      />

      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage: </span>{" "}
            <Link to={data.homepage} target="_blank">
              Link
            </Link>
          </h1>
          <h1>
            <span>Original Language: </span> {data.original_language}
          </h1>
          <p>
            <span className="underline">Overview: </span>
            {data.overview}
          </p>
          <p>
            <span className="underline">Release Date: </span>
            {data.release_date}
          </p>
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
