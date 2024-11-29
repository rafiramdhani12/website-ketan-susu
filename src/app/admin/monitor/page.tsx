/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';

interface Users {
	id: number;
	userName: string;
	email: string;
	comment: string;
}

const Monitor = () => {
	const [users, setUsers] = useState<Users[]>([]);

	const getUsers = async () => {
		try {
			const response = await fetch('/api/users');
			const data: Users[] = await response.json();
			setUsers(data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center p-6'>
			<h1 className='text-3xl font-bold mb-6 text-center'>User Comments</h1>
			<div className='space-y-4 w-full max-w-2xl'>
				{users.map((user) => (
					<div key={user.id} className='card bg-white shadow-md rounded-lg p-4 flex items-start space-x-4'>
						<div>
							<h2 className='text-lg font-semibold text-gray-800'>{user.userName}</h2>
							<p className='text-gray-600 text-sm mb-2'>{user.email}</p>
							<p className='text-gray-700'>{user.comment}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Monitor;
