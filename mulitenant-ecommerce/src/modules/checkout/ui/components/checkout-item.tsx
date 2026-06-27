import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
    name: string;
    isLast?: boolean;
    imageUrl?: string | null;
    tenantName: string;
    tenantUrl: string;
    productUrl: string;
    onRemove: () => void;
    price: number;
};

export const CheckoutItem = ({
    name,
    isLast,
    imageUrl,
    tenantUrl,
    tenantName,
    productUrl,
    onRemove,
    price
}: Props) => {
    return (
        <div className={cn("grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
            isLast && "border-b-0"
        )}>
            <div className="overflow-hidden border-r">
                <div className="relative aspect-square h-full">
                    <Image src={imageUrl || "/placeholder.png"} alt={name} fill className="object-cover" />
                </div>
            </div>
            <div className="py-4 flex flex-col justify-between">
                <div>
                    <Link href={productUrl}>
                        <h4 className="font-bold underline">
                            {name}
                        </h4>
                    </Link>
                    <Link href={tenantUrl}>
                        <p className="font-medium underline">{tenantName}</p>
                    </Link>
                </div>
            </div>

            <div className="py-4 flex flex-col justify-between">
                <p className="font-medium">
                    {formatCurrency(price)}
                </p>
                <button className="font-medium underline cursor-pointer" type="button" onClick={onRemove}>
                    Remove
                </button>
            </div>

        </div>
    )
}