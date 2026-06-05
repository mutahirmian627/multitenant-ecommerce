import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

interface NavbarItem {
    href: string,
    children: React.ReactNode
};

interface Props {
    items: NavbarItem[],
    open:boolean,
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({items, open, onOpenChange}:Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
            side="left"
            className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="items-center flex">
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto pb-2 h-full">
                    {items.map((item)=>(
                        <Link 
                        className="w-full hover:text-white hover:bg-black flex text-left text-base font-medium p-4 items-center "
                        key={item.href} 
                        href={item.href}
                        onClick={()=> onOpenChange(false)}>
                        {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        <Link 
                        onClick={()=>onOpenChange(false)}
                        href="/sign-in" className="w-full hover:text-white hover:bg-black flex text-left text-base font-medium p-4 items-center">
                            Log in 
                        </Link>
                        <Link 
                        onClick={()=>onOpenChange(false)}
                        href="/sign-up" className="w-full hover:text-white hover:bg-black flex text-left text-base font-medium p-4 items-center ">
                            Start Selling 
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
