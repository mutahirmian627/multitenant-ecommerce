"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
    tenantSlug: string; 
}

export const CheckoutView = ({ tenantSlug }: Props) => {

    const { productIds, clearAllCarts } = useCart(tenantSlug);

    const trpc = useTRPC();
    const { data, error } = useQuery(trpc.checkout.getMany.queryOptions({ids: productIds}))

    useEffect(()=>{
        if (error?.data?.code === "NOT_FOUND"){
            clearAllCarts();
            toast.warning("Invalid products found, cart cleared.")
        }
    }, [error, clearAllCarts])

    return (
        <div className="lg:pt-16 pt-4 px-4 lg:px-12">
            {JSON.stringify(data,null,2)}
        </div>
    )
}