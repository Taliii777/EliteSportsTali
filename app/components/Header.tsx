import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='flex justify-between items-center py-5 px-10 absolute top-0 left-0 right-0 z-10'>
      <Image src='/eliteLogo.svg' alt='logo' width={238} height={100} />
      <nav>
        <ul className='flex gap-4 text-lg font-roboto text-light'>
          <li>
            <Link href='/'>About</Link>
          </li>
          <li>
            <Link href='/'>Athletes</Link>
          </li>
          <li>
            <Link href='/'>Contact</Link>
          </li>
          <li>
            <Link href='/'>Clubs | Organizations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
