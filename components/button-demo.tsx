import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="hover-shimmer" size="lg">
          Hover Me
        </Button>
        <Button variant="hover-shimmer" size="default">
          Interactive Button
        </Button>
      </div>
    </div>
  )
}

