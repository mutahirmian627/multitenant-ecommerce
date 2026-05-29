import { CustomCategory } from "../types"
import { Categories } from "./categories"
import { SearchInput } from "./search-input"

interface props {
    data: CustomCategory[];
}

export const SearchFilters = ({data}: props) => {
    return (
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4">
            <SearchInput data={data} />
            <div className="hidden lg:block">
            <Categories data={data} />
            </div>
        </div>
    )
}