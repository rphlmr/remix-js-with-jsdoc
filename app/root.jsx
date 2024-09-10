import { json } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";

/** @param {LoaderFunctionArgs} args */
export function loader({ request }) {
  console.log(new URL(request.url).pathname); // "/"
  return json({ title: "Hello World!" });
  // need the payload 'as const'? 👇
  // return json(/** @type {const} */ ({ title: "Hello World!" }));
}

/** @param {React.PropsWithChildren} props */
export function Layout({ children }) {
  /** @type {LoaderData<typeof loader>} */
  const data = useLoaderData(); // typed as { title: string }

  console.log(data); // { title: "Hello World!" }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function useRootLoaderData() {
  /** @type {RouteLoaderData<typeof loader>} */
  const data = useRouteLoaderData("root");

  if (data === undefined) {
    throw new Error(
      "useRootLoaderData must be used within the root route or its children",
    );
  }

  return data;
}

export default function App() {
  return <Outlet />;
}
