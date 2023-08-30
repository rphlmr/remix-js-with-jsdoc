import { useRootLoaderData } from "~/root";

/** @type {MetaFunction} */
export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	const { title } = useRootLoaderData();

	return (
		<div>
			<h1>Index</h1>
			<h2>{title}</h2>
		</div>
	);
}
