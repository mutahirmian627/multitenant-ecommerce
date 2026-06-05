import { Category } from "@/payload-types";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface props {
    isOpen: boolean,
    category: CategoriesGetManyOutput[1],
    position: { top: number, left: number }
}

export const SubcategoryMenu = ({isOpen, category, position}: props) => {
    if(!isOpen || !category.subcategories || category.subcategories.length === 0){
        return null;
    };

    const backgroundColor = category.color || "#F5F5F5";
    return (
        <div className="fixed z-100"
        style={{ 
            top: position.top,
            left: position.left,
         }}
        >
            {/* Invisible bridge to maintain hover */}
            <div className="h-3 w-60"/>
            <div
            style={{ backgroundColor }}
            className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5">
                <div>
                    {category.subcategories.map((subcategory: Category) => (
                        <Link 
                        key={subcategory.slug} 
                        href={`/${category.slug}/${subcategory.slug}`}
                        className="underline font-medium items-center hover:text-white hover:bg-black justify-between p-4 text-left w-full flex"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}