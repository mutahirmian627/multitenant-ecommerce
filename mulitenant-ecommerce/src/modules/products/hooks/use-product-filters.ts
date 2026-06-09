import { parseAsInteger, useQueryStates } from "nuqs";

export const UseProductFilters = () => {
    return useQueryStates({
        minPrice: parseAsInteger
        .withOptions({
            clearOnDefault: true
        }),
        maxPrice: parseAsInteger
        .withOptions({
            clearOnDefault: true
        })
    })
}