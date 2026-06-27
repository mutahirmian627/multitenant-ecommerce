import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface Props {
    total: number;
    isPending: boolean;
    isCancelled: boolean;
    onCheckout: () => void;
};

export const CheckoutSidebar = ({
    total,
    isPending,
    isCancelled,
    onCheckout
}: Props) => {
    return(
        <div className="flex flex-col bg-white border rounded-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-medium text-lg">
                    Total
                </h4>
                <p className="font-medium text-lg">
                    {formatCurrency(total)}
                </p>
            </div>
            <div className="flex p-4 items-center justify-center">
                <Button variant="elevated"
                disabled={isPending}
                onClick={onCheckout}
                size="lg"
                className="text-base w-full bg-primary text-white hover:bg-pink-400 hover:text-primary"
                >
                    Checkout
                </Button>
            </div>
            {isCancelled && (
                <div className="p-4 flex justify-center items-center border-t">
                    <div className="flex w-full items-center border border-red-400 bg-red-100 px-4 py-3 rounded font-medium">
                        <div className="flex items-center">
                            <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100" />
                            <span>Checkout failed, Try again.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}