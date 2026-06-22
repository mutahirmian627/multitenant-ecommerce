"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import Image from "next/image"
import Link from "next/link";
import { LinkIcon, StarIcon } from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client"

import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
//import { CartButton } from "../components/cart-button";

const CartButton = dynamic(()=> import("../components/cart-button").then(
    (mod) => mod.CartButton,
),{
    ssr: false,
    loading: ()=> <Button disabled className="bg-pink-400 h-12 flex-1">Add to cart</Button>
});

interface Props {
    productId: string,
    tenantSlug: string
}

export const ProductView = ({ productId, tenantSlug }: Props) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }))

    return (
        <div className="px-4 lg:px-12 py-10">
            <div className="border rounded-sm bg-white overflow-hidden">
                <div className="relative border-b aspect-[3.9]">
                    <Image
                        src={data.image?.url || "/placeholder.png"}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4">
                        <div className="p-6">
                            <h1 className="text-4xl font-medium">
                                {data.name}
                            </h1>
                        </div>
                        <div className="border-y flex">
                            <div className="px-4 py-6 flex items-center justify-center border-r">
                                <div className="px-2 py-1 border bg-pink-400 w-fit">
                                    <p className="text-base font-medium">
                                        {formatCurrency(data.price)}
                                    </p>
                                </div>
                            </div>

                            <div className="px-6 py-4 items-center justify-center lg:border-r flex">
                                <Link href={generateTenantURL(tenantSlug)} className="flex items-center gap-2">
                                    {data.tenant.image?.url && (
                                        <Image src={data.tenant.image.url}
                                            alt={data.tenant.name}
                                            className="rounded-full border shrink-0 size-5"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    <p className="text-base underline font-medium">
                                        {data.tenant.name}
                                    </p>
                                </Link>
                            </div>

                            <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                                <div className="flex items-center gap-1">
                                    <StarRating iconClassName="size-4" rating={3} />
                                </div>
                            </div>

                        </div>
                        {/*Mobile Only*/}
                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
                            <div className="flex items-center gap-1">
                                <StarRating iconClassName="size-4" rating={3} />
                                <p className="text-base font-medium">{5} Ratings</p>
                            </div>
                        </div>
                        <div className="p-6">
                            {data.description ? (
                                <p>{data.description}</p>
                            ) : <p className="font-medium text-muted-foreground italic">
                                No description provided.
                            </p>
                            }
                        </div>
                    </div>

                    {/*Right side of product view, next to ratings, name, description*/}
                    <div className="col-span-2">
                        <div className="border-t lg:border-t-0 lg:border-l h-full">
                            <div className="flex flex-col p-6 border-b gap-4">
                                <div className="flex flex-row items-center gap-2">
                                    <CartButton tenantSlug={tenantSlug} productId={productId} />
                                    <Button
                                        className="size-12"
                                        variant="elevated"
                                        disabled={false}
                                        onClick={() => { }}>
                                        <LinkIcon />
                                    </Button>
                                </div>

                                <p className="text-center font-medium">
                                    {data.refundPolicy === "No Refunds" ? "No Refunds" : `${data.refundPolicy} Money Back Gurantee`}
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-medium">Ratings</h3>
                                    <div className="flex items-center gap-x-1 font-medium">
                                        <StarIcon className="fill-black size-4"/>
                                        <p>({5})</p>
                                        <p className="text-base">{5} Ratings</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <Fragment key={stars}>
                                            <div className="font-medium">{stars} {stars ? "star" : "stars"}</div>
                                            <Progress 
                                            value={25}
                                            className="h-1lh"
                                            />
                                            <div className="font-medium">
                                                {25}%
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}