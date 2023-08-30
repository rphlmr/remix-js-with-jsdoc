import { cssBundleHref } from "@remix-run/css-bundle";
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

/** @type {LinksFunction} */
export const links = () => [
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

/** @param {LoaderArgs} args */
export function loader({ request }) {
	console.log(new URL(request.url).pathname); // "/"
	return json({ title: "Hello World!" });
	// need the payload 'as const'? 👇
	// return json(/** @type {const} */ ({ title: "Hello World!" }));
}

export default function App() {
	/** @type {LoaderData<typeof loader>} */
	const data = useLoaderData(); // typed as { title: string }

	console.log(data); // { title: "Hello World!" }

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
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
