"use client";
import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories"
import { SearchInput } from "./search-input"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "../constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

    const params = useParams()
    const categoryParam = params.category as string | undefined
    const activeCategory = categoryParam || "all";

    const activeCategoryData = data.find((category) => category.slug === activeCategory)

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = activeCategoryData?.subcategories?.find(
        (subcategory: { slug: string | undefined; }) => subcategory.slug === activeSubcategory)?.name || null;

    return (
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4" style={{
            backgroundColor: activeCategoryColor
        }}>
            <SearchInput />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
            <BreadcrumbNavigation
                activeCategory={activeCategory}
                activeCategoryName={activeCategoryName}
                activeSubcategoryName={activeSubcategoryName} />
        </div>
    )
};

export const SearchFiltersLoading = () => {
    return (
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4" style={{
            backgroundColor: "#F5F5F5"
        }}>
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-11" />
            </div>
        </div>
    )
}