import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { user } from "./schema";

export declare global {
	declare type NewUserPayload = InferInsertModel<typeof user>;
	declare type UserModel = InferSelectModel<typeof user>;
}
