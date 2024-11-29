/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React from 'react';
import { useForm } from '../hooks/UseForm';

const suggest = () => {
	const { form, handleChange, handleSubmit } = useForm('/api/users');

	return (
		<>
			<section className='min-h-screen mt-[64px] '>
				<div className='mockup-browser bg-base-300 border md:h-screen'>
					<div className='mockup-browser-toolbar'>
						<div className='input'>kritik dan saran</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='bg-base-200 flex flex-col justify-center px-4 py-16 items-center flex-1 space-y-4'>
							<input
								type='text'
								value={form.userName}
								onChange={handleChange}
								name='userName'
								placeholder='masukan username'
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='text'
								value={form.email}
								onChange={handleChange}
								name='email'
								placeholder='masukkan email'
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='text'
								value={form.comment}
								name='comment'
								onChange={handleChange}
								placeholder='kritik dan saran disini'
								className='input input-bordered w-full max-w-xs'
							/>
							<button className='btn btn-primary' type='submit'>
								submit
							</button>
						</div>
					</form>
					<div className='flex justify-center text-xl font-bold p-4'>terimakasih atas kritik dan saran nya </div>
				</div>
				<div className='md:hidden mt-3 mb-3'>
					<h1 className='flex justify-center text-orange-500 font-bold text-2xl'>FAQ</h1>
					<div className='join join-vertical w-full p-4'>
						<div className='collapse collapse-arrow join-item border-base-300 border'>
							<input type='radio' name='my-accordion-4' defaultChecked />
							<div className='collapse-title text-xl font-medium'>
								apakah bahan yg dipakai segar layak dikonsumsi dan halal ?
							</div>
							<div className='collapse-content'>
								<p>
									ya! kami sangat memperhatikan kualitas produk kami dan kami pastikan tidak ada yg terlewat dari
									quality control kami
								</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item border-base-300 border'>
							<input type='radio' name='my-accordion-4' />
							<div className='collapse-title text-xl font-medium'>
								apakah ada rasa yg sangat popular dan direkomendasikan disini?
							</div>
							<div className='collapse-content'>
								<p>
									ya ada ! meski kami banyak sekali menu dan semuanya enak enak tapi kami punya menu andalan yaitu choco
									chrunchy dan matcha
								</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item border-base-300 border'>
							<input type='radio' name='my-accordion-4' />
							<div className='collapse-title text-xl font-medium'>berapa lama makanan ini bisa bertahan ?</div>
							<div className='collapse-content'>
								<p>
									jika kita tidak memasukkan kondimen nya akan bertahan lama tapi jika sudah dikemas dan dimasukkan
									semuanya maka kami rasa hanya bertahan dalam hitungan jam karena produk kami memakai dairy produk
									saran kami sedikit konyol kami akan memisahkan semua kondimen nya jika anda memesan untuk dimakan
									nanti malam / waktu yg tidak ditentukan
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default suggest;
