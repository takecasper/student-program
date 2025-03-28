import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Link from "next/link";

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
  if (href) {
    return (
      <Link href={href} className="block">
        <Button
          variant="ghost"
          className={`w-full justify-start py-6 gap-3 cursor-pointer hover:bg-gray-200 ${
            active
              ? "bg-[#D9D9D94D] text-[#364699] font-medium"
              : isFooterItem
              ? "py-3 px-4 text-[#333333]"
              : "text-[#333333]"
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
        active
          ? "bg-[#f5f5f5] text-[#364699] font-medium"
          : isFooterItem
          ? "py-3 px-4 text-[#333333]"
          : "text-[#333333]"
      }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </Button>
  );
}
