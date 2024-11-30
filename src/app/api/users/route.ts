import { NextResponse } from 'next/server';

import { usersTable } from '@/db/schema';
import db from '@/db';

export async function GET() {
	try {
		// Tambahkan logging yang komprehensif
		console.log('Attempting to fetch users from database');

		// Periksa koneksi database
		if (!db) {
			console.error('Database connection is not established');
			return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
		}

		// Tambahkan timeout atau error handling tambahan
		const users = await Promise.race([
			db.select().from(usersTable),
			new Promise((_, reject) => setTimeout(() => reject(new Error('Database query timeout')), 5000)),
		]);

		// Log detail hasil query
		console.log('Query result:', {
			type: typeof users,
			isArray: Array.isArray(users),
			length: users.length,
			firstItem: users[0],
		});

		// Pastikan mengembalikan array
		return NextResponse.json(Array.isArray(users) ? users : [users], { status: 200 });
	} catch (error: unknown) {
		// Logging error yang sangat detail
		console.error('FULL ERROR DETAILS:', {
			errorType: typeof error,
			errorName: error instanceof Error ? error.name : 'Unknown Error',
			errorMessage: error instanceof Error ? error.message : String(error),
			errorStack: error instanceof Error ? error.stack : 'No stack trace',
		});

		// Kirim respons error yang informatif
		return NextResponse.json(
			{
				error: 'Unable to fetch users',
				details: error instanceof Error ? error.message : String(error),
				type: typeof error,
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
