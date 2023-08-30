export declare global {
	declare type User = Prettify<UserModel & { tag: string }>;
}
