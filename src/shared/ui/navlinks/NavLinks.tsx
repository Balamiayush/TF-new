import { DropdownArrow } from "@/shared/icons/DropdownArrow";

interface NavLinkProps {
  label: string;
  hasDropdown?: boolean;
}

export default function NavLink({ label, hasDropdown = false }: NavLinkProps) {
  return (
    <div className="flex items-center justify-center gap-1 px-3 py-2 text-gray-900 ">
      <p className="text-sm leading-[110%] font-medium h-4.5 ">{label}</p>

      {hasDropdown && 
      <div className=" w-4 h-4 flex items-center justify-center">
      <DropdownArrow />
      </div>
      }
    </div>
  );
}
