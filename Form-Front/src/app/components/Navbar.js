// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const tabs = [
//   { label: 'Form Builder', href: '/formbuilder' },
//   { label: 'Preview', href: '/preview' },
//   { label: 'Export', href: '/export' },
//   { label: 'Forms', href: '/formlist' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();

//   return (
//     <nav className="flex justify-center gap-4 bg-gray-100 rounded-md p-1 max-w-2xl mx-auto mb-10">
//       {tabs.map((tab) => (
//         <Link
//           key={tab.href}
//           href={tab.href}
//           className={`px-6 py-2 rounded-md transition-all duration-200 ${
//             pathname === tab.href
//               ? 'bg-white shadow text-black font-medium'
//               : 'text-gray-600'
//           }`}
//         >
//           {tab.label}
//         </Link>
//       ))}
//     </nav>
//   );
// }
