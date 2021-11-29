import {
  // useLoaderData,
  // json,
  // Link,
  type MetaFunction,
  // type LoaderFunction,
} from "remix";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  // let data = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <p data-caption>{"Frontend & ui developer"}</p>
        <h1>I bring designs to life on your screen.</h1>
      </main>
    </div>
  );
}
