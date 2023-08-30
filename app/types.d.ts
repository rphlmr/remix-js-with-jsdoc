import type {
	useActionData,
	useLoaderData,
	useRouteLoaderData,
} from "@remix-run/react";
import type {
	V2_MetaFunction,
	LinksFunction as RemixLinksFunction,
	LoaderArgs as RemixLoaderArgs,
} from "@remix-run/node";

declare global {
	type Prettify<T> = {
		[K in keyof T]: T[K];
	} & {};

	/*
	 *	Remix run types
	 */
	type MetaFunction = V2_MetaFunction;
	type LinksFunction = RemixLinksFunction;
	type LoaderArgs = RemixLoaderArgs;
	type LoaderData<Loader> = ReturnType<typeof useLoaderData<Loader>>;
	type RouteLoaderData<Loader> = ReturnType<
		typeof useRouteLoaderData<Loader>
	>;
	type ActionData<Action> = ReturnType<typeof useActionData<Action>>;
	type AwaitedReturnType<T extends (...args: any) => any> = Awaited<
		ReturnType<T>
	>;
}
