import type { LoaderFunction } from "remix"
import { Response } from "@remix-run/node"
import postcss from "postcss"
import tailwindcss from "tailwindcss"

const defaultInputCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Theme */
@layer utilities {
  .text-primary {
    @apply text-gray-100;
  }
  .text-secondary {
    @apply text-gray-200;
  }
  .text-tertiary {
    @apply text-gray-300;
  }
  .text-disabled {
    @apply text-gray-500;
  }
  .text-link {
    @apply text-blue-300;
    @apply hover:text-blue-200;
    @apply active:text-blue-50;
  }
  .text-link-active {
    @apply text-blue-50;
  }
  .bg-base {
    @apply bg-gray-900;
  }
  .bg-hover {
    @apply bg-gray-800 !important;
  }
  .bg-depth {
    @apply bg-black;
  }
  .bg-inverse {
    @apply bg-white;
  }

  .border-base {
    @apply border-gray-500;
  }
  .border-depth {
    @apply border-black;
  }
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
}

/* Typography */
@layer base {
  a:not([data-custom-color]) {
    @apply text-link;
  }
  a:not([data-custom-border]) {
    @apply border-b-2 border-transparent;
    @apply hover:border-current;
  }

  pre code {
    @apply !p-0;
    @apply !bg-transparent;
    @apply !text-gray-100;
  }
}

/* Layout */
@layer utilities {
  .container-mx {
    @apply px-8 md:px-12 lg:px-16 xl:px-20;
  }
}

@layer components {
  [data-reach-dialog-overlay] {
    @apply flex items-center justify-center z-40 overflow-hidden;
  }
  [data-reach-dialog-content] {
    @apply w-full;
    height: 90vh;
  }
  [data-reach-dialog-content] img {
    @apply h-full w-full object-contain;
  }
  [data-reach-menu-popover] {
    @apply z-40;
  }
  [data-reach-menu-list] {
    @apply rounded-lg bg-hover shadow-xl text-link;
  }
  [data-reach-menu-item][data-selected] {
    @apply bg-black;
  }
}

`

const cache = new Map<string | symbol, string>()
const defaultCacheKey = Symbol("remix-tailwind-default")

// https://github.com/itsMapleLeaf/remix-tailwind/blob/main/src/main.ts
async function serveTailwindCss(inputCss: string = defaultInputCss) {
  const cacheKey = defaultCacheKey
  const cachedResponse = cache.get(cacheKey)
  if (process.env.NODE_ENV === "production" && cachedResponse) {
    return cssResponse(cachedResponse)
  }

  const { css } = await postcss(tailwindcss).process(inputCss, {
    from: undefined,
  })

  if (process.env.NODE_ENV === "production") {
    cache.set(cacheKey, css)
  }

  return cssResponse(css)
}

function cssResponse(css: string): Response {
  return new Response(css, {
    headers: { "content-type": "text/css" },
  })
}

export const loader: LoaderFunction = () => serveTailwindCss()

export function CatchBoundary() {}
