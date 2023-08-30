import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { user } from "./schema";

declare global {
	type NewUserPayload = InferInsertModel<typeof user>;
	type UserModel = InferSelectModel<typeof user>;
}
