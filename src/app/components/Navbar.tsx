'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const pathname = usePathname();

	const isTransparent = pathname === '/';

	return (
		<>
			<div
				className={`navbar ${
					isTransparent ? 'opacity-90 text-amber-400 font-bold' : 'bg-base-100 text-black shadow-md'
				} fixed top-0 w-full z-50 transition-all duration-300 `}>
				<div className='flex-1'>
					<Link href='/' className='btn btn-ghost text-xl'>
						Keendtu
					</Link>
				</div>
				<div className='flex-none'>
					<ul className='menu menu-horizontal px-1'>
						<li>
							<Link href='/menu'>menu</Link>
						</li>
						<li>
							<Link href='/suggest'>kritik dan saran</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navbar;
