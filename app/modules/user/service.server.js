import { sql } from "drizzle-orm";
import { db } from "~/db";
import { user } from "~/db/schema";

const createNewUserQuery = db
	.insert(user)
	.values(sql.placeholder("newUser"))
	.returning()
	.prepare("create_new_user");

/**
 * Create a new user
 *
 * @param {NewUserPayload} newUser The new user to create. **Id will be generated if not provided.**
 */
export async function createUser(newUser) {
	const results = await createNewUserQuery.execute({ newUser });
	return results[0];
}

const findUserByIdQuery = db.query.user
	.findFirst({
		where: (user, { eq, sql }) => eq(user.id, sql.placeholder("id")),
	})
	.prepare("find_user_by_id");

/**
 * Find a user by their ID
 *
 * @param {UserModel["id"]} id
 * @returns {Promise<User | null>} // force return type to satisfy User or null, like normal TS
 */
export async function findUserById(id) {
	const user = await findUserByIdQuery.execute({ id });

	if (!user) {
		return null;
	}

	return {
		...user,
		tag: `${user.name}#${user.id}`,
	};
}

/** @typedef {Record<UserModel["id"], UserModel>} UserById */

async function getAll() {
	const results = await db.query.user.findMany();

	return results.reduce(
		(acc, curr) =>
			/** @satisfies {UserById} */ ({
				...acc,
				[curr.id]: {
					...curr,
				},
			}),
		/** @type {UserById} */ ({}),
	);
}
