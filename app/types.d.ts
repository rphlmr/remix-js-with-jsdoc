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

export declare global {
	declare type Prettify<T> = {
		[K in keyof T]: T[K];
	} & {};

	/*
	 *	Remix run types
	 */
	declare type MetaFunction = V2_MetaFunction;
	declare type LinksFunction = RemixLinksFunction;
	declare type LoaderArgs = RemixLoaderArgs;
	declare type LoaderData<Loader> = ReturnType<typeof useLoaderData<Loader>>;
	declare type RouteLoaderData<Loader> = ReturnType<
		typeof useRouteLoaderData<Loader>
	>;
	declare type ActionData<Action> = ReturnType<typeof useActionData<Action>>;
	declare type AwaitedReturnType<T> = Awaited<ReturnType<T>>;
}
