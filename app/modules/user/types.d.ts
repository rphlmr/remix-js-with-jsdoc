// Fix: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)
export {};

declare global {
	type User = Prettify<UserModel & { tag: string }>;
}
