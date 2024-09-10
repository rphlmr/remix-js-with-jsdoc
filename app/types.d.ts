import type {
  useActionData,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import type {
  MetaFunction as RemixMetaFunction,
  MetaArgs as RemixMetaArgs,
  LinksFunction as RemixLinksFunction,
  LoaderFunctionArgs as RemixLoaderFunctionArgs,
} from "@remix-run/node";

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  /*
   *	Remix run types
   */
  type MetaFunction = RemixMetaFunction;
  type MetaArgs = RemixMetaArgs;
  type LinksFunction = RemixLinksFunction;
  type LoaderFunctionArgs = RemixLoaderFunctionArgs;
  type LoaderData<Loader> = ReturnType<typeof useLoaderData<Loader>>;
  type RouteLoaderData<Loader> = ReturnType<typeof useRouteLoaderData<Loader>>;
  type ActionData<Action> = ReturnType<typeof useActionData<Action>>;
  type AwaitedReturnType<T extends (...args: any) => any> = Awaited<
    ReturnType<T>
  >;
}
