import { Categories } from "./categories"
import { SearchInput } from "./search-input"

interface props {
    data: any
}

export const SearchFilters = ({data}: props) => {
    return (
        <div className="px-4 py-8 lg:px-12 flex flex-col border-b w-full gap-4">
            <SearchInput />
            <Categories data={data} />
        </div>
    )
}