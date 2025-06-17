// components/ui/Calendar.tsx
import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3 bg-stone-900 rounded-lg text-white", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-stone-800 text-white rounded-md hover:bg-stone-700",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-stone-400 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell:
          "text-center text-sm p-1 rounded-md w-9 h-9 hover:bg-stone-700 focus:bg-stone-700 cursor-pointer",
        day: "w-9 h-9",
        day_selected:
          "bg-stone-700 text-white hover:bg-stone-600",
        day_today: "border border-white",
        ...classNames,
      }}
      {...props}
    />
  )
}
