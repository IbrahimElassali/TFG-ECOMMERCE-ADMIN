import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const IconBlocks = () => {
  const { pathname } = useRouter();
  const [activeText, setActiveText] = useState('');

  useEffect(() => {
    if (pathname.includes('/products')) {
      setActiveText('Productos');
    } else if (pathname.includes('/categories')) {
      setActiveText('Categorías');
    } else if (pathname.includes('/orders')) {
      setActiveText('Órdenes');
    }
  }, [pathname]);

  const activeIcon = 'text-blue-500';
  const inactiveIcon = 'text-gray-500';

  return (
    <div className="w-4/5 mx-auto flex justify-between items-center space-x-4 mt-8 p-4 border border-gray-300 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform">
      <Link href="/products" passHref>
        <div className="flex-1 flex flex-col items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/products') ? activeIcon : inactiveIcon} width="40" height="40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="mt-2">{pathname.includes('/products') && 'Productos'} PRODUCTOS</p>
        </div>
      </Link>
      <Link href="/categories" passHref>
        <div className="flex-1 flex flex-col items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/categories') ? activeIcon : inactiveIcon} width="40" height="40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="mt-2">{pathname.includes('/categories') && 'Categorías'}CATEGORIAS</p>
        </div>
      </Link>
      <Link href="/orders" passHref>
        <div className="flex-1 flex flex-col items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/orders') ? activeIcon : inactiveIcon} width="40" height="40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          <p className="mt-2">{pathname.includes('/orders') && 'Órdenes'}ORDENES</p>
        </div>
      </Link>
    </div>
  );
};

export default IconBlocks;
