import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

export async function GET() {
	try {
		const users = await db.select().from(usersTable);
		return NextResponse.json(users);
	} catch (error) {
		console.error('error fetching users', error);
		return NextResponse.json({ error: 'unable to fetch users' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { userName, email, comment } = await request.json(); // Parse body as JSON

		// Validasi input
		if (!userName || !email || !comment) {
			return NextResponse.json({ error: 'Name, email, and comment are required' }, { status: 400 });
		}

		// Menyisipkan data pengguna ke database
		const [newUser] = await db.insert(usersTable).values({ userName, email, comment }).returning();

		return NextResponse.json(
			{
				message: 'User created successfully',
				newUser,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error posting data', error);
		return NextResponse.json({ error: 'Failed to post data' }, { status: 500 });
	}
}
