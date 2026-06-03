"use client";
import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories"
import { SearchInput } from "./search-input"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())
    return (
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4" style={{
            backgroundColor: "#F5F5F5"
        }}>
            <SearchInput />
            <div className="hidden lg:block">
            <Categories data={data} />
            </div>
        </div>
    )
};

export const SearchFiltersLoading = () => {
    return(
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4" style={{
            backgroundColor: "#F5F5F5"
        }}>
            <SearchInput disabled/>
            <div className="hidden lg:block">
            <div className="h-11" />
            </div>
        </div>
    )
}