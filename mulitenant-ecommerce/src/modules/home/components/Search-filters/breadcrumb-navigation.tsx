import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
    activeCategory?: string | null;
    activeCategoryName?: string | null;
    activeSubcategoryName?: string | null;
}

export const BreadcrumbNavigation = ({ activeCategory, activeCategoryName, activeSubcategoryName }: Props) => {
    if (!activeCategoryName || activeCategory === "all") return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeSubcategoryName ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary text-lg font-medium">
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className=" text-xl font-medium">
                                <BreadcrumbPage className="text-xl font-medium">{activeSubcategoryName}</BreadcrumbPage>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )
                    :
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                            <BreadcrumbPage className="text-xl font-medium">{activeCategoryName}</BreadcrumbPage>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                }
            </BreadcrumbList>
        </Breadcrumb>
    )


}