import { useState } from 'react';

interface FormState {
	userName: string;
	email: string;
	comment: string;
}

interface UseFormReturn {
	form: FormState;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

export function useForm(apiUrl: string): UseFormReturn {
	const [form, setForm] = useState<FormState>({
		userName: '',
		email: '',
		comment: '',
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.userName || !form.email || !form.comment) {
			alert('All fields are required');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			const data = await response.json();

			if (response.ok) {
				alert(data.message || 'User created successfully');
				setForm({ userName: '', email: '', comment: '' }); // Reset form
			} else {
				setError(data.error || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error posting data', error);
			setError('Failed to submit data');
		} finally {
			setIsLoading(false);
		}
	};

	return { form, handleChange, handleSubmit, isLoading, error };
}
