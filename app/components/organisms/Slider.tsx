import clsx from "clsx"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import PreviousIcon from "remixicon-react/ArrowLeftCircleFillIcon"
import NextIcon from "remixicon-react/ArrowRightCircleFillIcon"

import Button from "~/components/atoms/Button"
import Text from "~/components/atoms/Text"
import Tooltip from "../atoms/Tooltip"

interface SliderContextType {
  containerRef: React.RefObject<HTMLDivElement>
  currentIndex: number
  count: number
  handleIndexChange: (index: number | ((prev: number) => number)) => void
}

const SliderContext = createContext<SliderContextType | undefined>(undefined)

export type SliderRenderComponentProps<T> = T & {
  className?: string
  index: number
}

export default function Slider<T extends { id: string }>({
  items,
  RenderComponent,
}: {
  items: T[]
  RenderComponent: (props: SliderRenderComponentProps<T>) => JSX.Element | null
}): JSX.Element {
  const { containerRef, currentIndex, handleIndexChange } = useSlider(
    items.length,
  )

  return (
    <SliderContext.Provider
      value={{
        currentIndex,
        count: items.length,
        containerRef,
        handleIndexChange,
      }}
    >
      <div className="relative">
        <div
          ref={containerRef}
          className={clsx(
            "flex w-auto items-center",
            "snap-mandatory snap-x",
            "relative pt-2 pb-8 px-4 gap-x-12",
            items.length > 1 && "overflow-x-scroll",
          )}
        >
          {items.map((item, index) => (
            <RenderComponent
              key={item.id}
              className="snap-center h-full min-w-fit"
              index={index}
              {...item}
            />
          ))}
        </div>
        <SliderNextButton />
        <SliderPreviousButton />
        <SliderStepper />
      </div>
    </SliderContext.Provider>
  )
}

function useSlider(count: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container
      const index = Math.floor(scrollLeft / clientWidth)
      setCurrentIndex(index)
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [containerRef])

  const handleIndexChange: SliderContextType["handleIndexChange"] = useCallback(
    (index) => {
      const newIndex = typeof index === "function" ? index(currentIndex) : index
      const validIndex = newIndex < 0 ? count - newIndex : newIndex % count
      const container = containerRef.current
      container?.scrollTo({
        left: container.clientWidth * validIndex,
        behavior: "smooth",
      })
      setCurrentIndex(validIndex)
    },
    [containerRef, currentIndex, count],
  )

  return { currentIndex, handleIndexChange, containerRef }
}

function useSliderContext(): SliderContextType {
  const context = useContext(SliderContext)
  if (!context)
    throw new Error(
      "useSliderContext must be used within a child of Slider component.",
    )

  return context
}

function SliderStepper(): JSX.Element | null {
  const { currentIndex, count, handleIndexChange } = useSliderContext()
  if (count < 2) return null

  return (
    <fieldset className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="radio"
            name="slider-stepper"
            checked={currentIndex === index}
            value={index}
            className={clsx("w-8 h-2 rounded bg-inverse opacity-90")}
            onChange={() => handleIndexChange(index)}
            aria-label={`Slide to ${index + 1}`}
          />
        ))}
    </fieldset>
  )
}

function SliderNextButton(): JSX.Element | null {
  const { count, handleIndexChange } = useSliderContext()

  if (count < 2) return null
  return (
    <Tooltip label="Next slide">
      <Button
        className={clsx("absolute -right-4 top-1/2 z-10 h-12 -translate-y-1/2")}
        onClick={() => handleIndexChange((prev) => prev + 1)}
      >
        <NextIcon size="48px" />
        <Text className="sr-only">Next slide</Text>
      </Button>
    </Tooltip>
  )
}

function SliderPreviousButton(): JSX.Element | null {
  const { count, handleIndexChange } = useSliderContext()

  if (count < 2) return null
  return (
    <Tooltip label="Previous slide">
      <Button
        className={clsx("absolute -left-4 top-1/2 z-10 h-12 -translate-y-1/2")}
        onClick={() => handleIndexChange((prev) => prev - 1)}
      >
        <PreviousIcon size="48px" />
        <Text className="sr-only">Previous slide</Text>
      </Button>
    </Tooltip>
  )
}
