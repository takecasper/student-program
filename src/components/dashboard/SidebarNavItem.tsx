import { Button } from '@/components/ui/button';
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarNavItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  isFooterItem?: boolean;
  onClick?: () => void;
  href?: string;
};

export function SidebarNavItem({
  icon,
  label,
  active = false,
  isFooterItem = false,
  onClick = () => alert(`Clicked on ${label}`),
  href,
}: SidebarNavItemProps) {
  const pathname = usePathname();

  // More precise path matching logic
  const isActive = href
    ? pathname === href ||
      (pathname.startsWith(href) && href !== '/dashboard') ||
      (href === '/dashboard' && pathname === '/dashboard')
    : active;

  // For debugging - you can remove this after fixing
  useEffect(() => {
    console.log(`NavItem: ${label}, href: ${href}, pathname: ${pathname}, isActive: ${isActive}`);
  }, [label, href, pathname, isActive]);

  if (href) {
    return (
      <Link href={href} className="block">
        <Button
          variant="ghost"
          className={`w-full justify-start py-0 h-[45px] gap-3 pl-[1rem] cursor-pointer hover:bg-gray-200 ${
            isActive
              ? 'bg-[#D9D9D94D] !text-[#364699] font-medium'
              : isFooterItem
                ? 'py-3 px-4 text-[#333333]'
                : 'text-[#333333]'
          }`}
          type="button"
        >
          {icon}
          {label}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 cursor-pointer hover:bg-gray-200 ${
        isActive
          ? 'bg-[#f5f5f5] text-[#364699] font-medium'
          : isFooterItem
            ? 'py-3 px-4 text-[#333333]'
            : 'text-[#333333]'
      }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </Button>
  );
}
