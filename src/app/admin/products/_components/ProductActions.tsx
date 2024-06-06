import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { DeleteProduct, ToogleProductAvailability } from "../../_actions/product";
import { useRouter } from "next/navigation";

export function ActiveToggleDropDownItem( { 
        id , isAvailableForPurchase } : { 
        id : string , 
        isAvailableForPurchase : boolean }) {
        const [isPending , startTransition] = useTransition()
        const router = useRouter()
        return ( <DropdownMenuItem
            disabled={ isPending } 
            onClick={() => {
                startTransition(async () => {
                    await ToogleProductAvailability(id , !isAvailableForPurchase)
                    router.refresh()
                })
            }}
            > { isAvailableForPurchase ? "Deactivated" : "Activate" }
        </DropdownMenuItem>
    )
}

export function DeleteDropDownItem( { 
        id , disabled } : { 
            id : string ,
            disabled : boolean }) {
        const [isPending , startTransition] = useTransition()
        const router = useRouter()
        return ( <DropdownMenuItem
                variant="destructive" 
                disabled={ disabled || isPending } 
                onClick={async () => {
                    startTransition(async () => {
                        await DeleteProduct(id)
                        router.refresh()
                    })
                }}
            > Delete
        </DropdownMenuItem>
    )
}
