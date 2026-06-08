"use client";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface props {
    isActive?: boolean,
    category: CategoriesGetManyOutput[1],
    isNavigationHovered?: boolean
}

export const CategoryDropdown = ({ isActive, category, isNavigationHovered }: props) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownref = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPosition(dropdownref)

    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true)
        };
    };

    const onMouseLeave = () => setIsOpen(false);
    const dropdownPosition = getDropdownPosition();

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={dropdownref}
            className="relative">
            <div className="relative">
                <Button variant="elevated"
                    className={cn("h-11 border-transparent hover:border-primary bg-transparent hover:bg-white px-4 rounded-full text-black",
                        isActive && !isNavigationHovered && "bg-white border-primary",
                        isOpen && "bg-white border-primary"
                    )}>
                    <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
                        {category.name}
                    </Link>
                </Button>
                {category.subcategories && category.subcategories.length > 0 && (
                    <div className={cn("-bottom-3 opacity-0 absolute w-0 h-0 border-l-transparent border-r-transparent border-b-black border-r-10 border-b-10 border-l-10 left-1/2 -translate-x-1/2",
                        isOpen && "opacity-100")} />
                )}
            </div>
            <SubcategoryMenu
                isOpen={isOpen}
                category={category}
                position={dropdownPosition}
            />
        </div>
    )
}