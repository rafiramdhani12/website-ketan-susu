import { NextResponse } from 'next/server';

import { usersTable } from '@/db/schema';
import db from '@/db';

export async function GET() {
	try {
		const users = await db.select().from(usersTable);
		return NextResponse.json(users);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);

		console.error('Error fetching users', errorMessage);

		return NextResponse.json(
			{
				error: 'Unable to fetch users',
				details: errorMessage,
			},
			{ status: 500 }
		);
	}
}
export async function POST(request: Request) {
	try {
		const { userName, email, comment } = await request.json();

		// Validasi input yang lebih komprehensif
		if (!userName || !email || !comment) {
			return NextResponse.json({ error: 'Name, email, and comment are required' }, { status: 400 });
		}

		// Log input untuk debugging
		console.log('Received input:', { userName, email, comment });

		// Menyisipkan data pengguna ke database
		const [newUser] = await db
			.insert(usersTable)
			.values({
				userName,
				email,
				comment,
			})
			.returning();

		console.log('New user created:', newUser);

		return NextResponse.json(
			{
				message: 'User created successfully',
				newUser,
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		// Penanganan error yang lebih detail
		if (error instanceof Error) {
			console.error('Detailed error posting data:', {
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

			return NextResponse.json(
				{
					error: 'Failed to post data',
					details: error.message,
				},
				{ status: 500 }
			);
		} else {
			console.error('Unknown error:', error);

			return NextResponse.json(
				{
					error: 'Failed to post data',
					details: String(error),
				},
				{ status: 500 }
			);
		}
	}
}
