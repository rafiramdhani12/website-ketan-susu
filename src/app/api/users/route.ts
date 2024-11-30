import { NextResponse } from 'next/server';

import { usersTable } from '@/db/schema';
import db from '@/db';
import { InferSelectModel } from 'drizzle-orm';

type User = InferSelectModel<typeof usersTable>;

// Headers CORS
const corsHeaders = {
	'Access-Control-Allow-Origin': '*', // Sesuaikan dengan domain Anda
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
	try {
		// Tambahkan headers CORS ke respons
		const users: User[] = await db.select().from(usersTable);

		return NextResponse.json(users, {
			status: 200,
			headers: corsHeaders,
		});
	} catch (error: unknown) {
		return NextResponse.json(
			{
				error: 'Unable to fetch users',
				details: error instanceof Error ? error.message : String(error),
				type: typeof error,
			},
			{
				status: 500,
				headers: corsHeaders,
			}
		);
	}
}

// Tambahkan handler OPTIONS untuk preflight request
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: corsHeaders,
	});
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
