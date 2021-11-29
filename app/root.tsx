import { Outlet, useCatch, type LinksFunction, type MetaFunction } from "remix";

import Document from "~/Document";
import themeStylesUrl from "~/styles/theme.css";
import globalStylesUrl from "~/styles/global.css";

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,800;1,400;1,700&display=swap",
    },
    { rel: "stylesheet", href: themeStylesUrl },
    { rel: "stylesheet", href: globalStylesUrl },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "Siddhant Gupta" };
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <h1>{"There was an error"}</h1>
      <p>{error.message}</p>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message =
        "Oops! Looks like you tried to visit a page that you do not have access to.";
      break;
    case 404:
      message =
        "Oops! Looks like you tried to visit a page that does not exist.";
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  const heading = `${caught.status}: ${caught.statusText}`;

  return (
    <Document title={heading}>
      <h1>{heading}</h1>
      <p>{message}</p>
    </Document>
  );
}
