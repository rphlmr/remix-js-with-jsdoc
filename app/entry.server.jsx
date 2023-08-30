/**
 * By default, Remix will handle generating the HTTP Response for you. You are free to delete this file if you'd like
 * to, but if you ever want it revealed again, you can run `npx remix reveal` ✨ For more information, see
 * https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import { Headers, Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";

/**
 * Handle Function
 *
 * @typedef {(
 * 	request: Request,
 * 	responseStatusCode: number,
 * 	responseHeaders: Headers,
 * 	remixContext: import("@remix-run/node").EntryContext,
 * ) => Promise<unknown>} RequestHandler
 */

const ABORT_DELAY = 5_000;

/** @type {RequestHandler} */
export default function handleRequest(
	request,
	responseStatusCode,
	responseHeaders,
	remixContext,
) {
	return isbot(request.headers.get("user-agent"))
		? handleBotRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext,
		  )
		: handleBrowserRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext,
		  );
}

/** @type {RequestHandler} */
function handleBotRequest(
	request,
	responseStatusCode,
	responseHeaders,
	remixContext,
) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer
				context={remixContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,

			{
				onAllReady() {
					shellRendered = true;
					const body = new PassThrough();

					responseHeaders.set("Content-Type", "text/html");

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					);

					pipe(body);
				},
				onShellError(error) {
					reject(error);
				},
				onError(error) {
					responseStatusCode = 500;
					// Log streaming rendering errors from inside the shell.  Don't log
					// errors encountered during initial shell rendering since they'll
					// reject and get logged in handleDocumentRequest.
					if (shellRendered) {
						console.error(error);
					}
				},
			},
		);

		setTimeout(abort, ABORT_DELAY);
	});
}

/** @type {RequestHandler} */
function handleBrowserRequest(
	request,
	responseStatusCode,
	responseHeaders,
	remixContext,
) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer
				context={remixContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,

			{
				onShellReady() {
					shellRendered = true;
					const body = new PassThrough();

					responseHeaders.set("Content-Type", "text/html");

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					);

					pipe(body);
				},
				onShellError(error) {
					reject(error);
				},
				onError(error) {
					responseStatusCode = 500;
					// Log streaming rendering errors from inside the shell.  Don't log
					// errors encountered during initial shell rendering since they'll
					// reject and get logged in handleDocumentRequest.
					if (shellRendered) {
						console.error(error);
					}
				},
			},
		);

		setTimeout(abort, ABORT_DELAY);
	});
}
