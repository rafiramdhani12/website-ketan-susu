import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	userName: varchar('username', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	comment: text('comment').notNull(),
});
