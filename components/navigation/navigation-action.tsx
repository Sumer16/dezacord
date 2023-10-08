"use client"

// React packages
import { Plus } from "lucide-react"

// Custom hooks
import { useModal } from "@/hooks/use-model-store"

// Components
import { ActionTooltip } from "@/components/action-tooltip"

// Action button in navbar
export const NavigationAction = () => {
  const { onOpen } = useModal()

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button 
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[18px] 
            transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 
          group-hover:bg-emerald-500"
          >
            <Plus 
              className="group-hover:text-white transition text-emerald-500" 
              size={25} 
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
