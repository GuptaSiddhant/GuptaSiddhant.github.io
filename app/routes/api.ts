import { json, type LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  return json({ hello: "world" });
};
