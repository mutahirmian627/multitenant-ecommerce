import { Category } from "@/payload-types";
import { CategoryDropdown } from "./Category-dropdown";

interface Props {
    data: any;
};

export const Categories = ({ data }: Props) => {
    return (
        <div className="relative w-full">

            <div className="flex flex-nowrap items-center">
                {data.map((category: Category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                            isActive={false}
                            isNavigationHovered={false}
                            category={category}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}