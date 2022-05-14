import { NavLink } from "@remix-run/react"
import GithubIcon from "remixicon-react/GithubFillIcon"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"
import SearchIcon from "remixicon-react/Search2LineIcon"

import { socialLinks as aboutSocialLinks } from "f-about"
import {
  useSearchDispatch,
  openSearchBar,
  useSearchFeatureFlag,
} from "f-search"

const navLinks: Array<{
  to: string
  children: React.ReactNode
}> = [
  // { to: "/about", children: "About" },
  { to: "/projects", children: "Projects" },
  { to: "/blog", children: "Blog" },
]

const socialLinks: Array<{
  href: string
  children: JSX.Element
}> = [
  {
    href: aboutSocialLinks.github,
    children: <GithubIcon aria-label="GitHub" />,
  },
  {
    href: aboutSocialLinks.linkedin,
    children: <LinkedinIcon aria-label="LinkedIn" />,
  },
]

export default function Navigation(): JSX.Element {
  const dispatch = useSearchDispatch()
  const isSearchEnabled = useSearchFeatureFlag()

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center justify-end gap-6 text-lg text-gray-200">
        {navLinks.map(({ to, children }) => {
          return (
            <li key={to.toString()} className="select-none">
              <NavLink
                to={to}
                prefetch="intent"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-white" : "hover:text-white"
                }
              >
                {children}
              </NavLink>
            </li>
          )
        })}
        {socialLinks.map(({ href, children }) => (
          <li key={href}>
            <a href={href} className="hover:text-white">
              {children}
            </a>
          </li>
        ))}
        {isSearchEnabled ? (
          <li key="search" title="Search [Cmd+K]">
            <SearchIcon
              className="hover:text-white cursor-pointer"
              onClick={() => dispatch(openSearchBar())}
            />
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

// export default function Navigation(): JSX.Element {
//   const { isMobile } = useBreakpoints()

//   if (isMobile) {
//     return (
//       <Menu>
//         {({ isExpanded }) => (
//           <>
//             <MenuButton className="block sm:hidden">
//               {isExpanded ? (
//                 <CloseIcon aria-label="Close menu" />
//               ) : (
//                 <MenuIcon aria-label="Open menu" />
//               )}
//             </MenuButton>
//             <MenuList className="text-lg font-normal">
//               {navLinks.map(({ to, children }) => (
//                 <MenuLink key={to.toString()} href={to.toString()}>
//                   {children}
//                 </MenuLink>
//               ))}
//               {socialLinks.map(({ href, children }) => (
//                 <MenuLink key={href} href={href}>
//                   {children}
//                 </MenuLink>
//               ))}
//             </MenuList>
//           </>
//         )}
//       </Menu>
//     )
//   }

//   return (
//     <nav aria-label="Main navigation">
//       <ul className="hidden sm:flex text-lg font-normal gap-4 sm:gap-6 md:gap-8 items-center justify-end">
//         {navLinks.map(({ to, children }) => {
//           return (
//             <li key={to.toString()} className="select-none">
//               <NavLink
//                 to={to}
//                 prefetch="intent"
//                 data-custom-color
//                 className={({ isActive }) =>
//                   clsx(isActive ? "text-link-active font-bold" : "text-link")
//                 }
//               >
//                 {children}
//               </NavLink>
//             </li>
//           )
//         })}
//         {socialLinks.map(({ href, children }) => (
//           <li key={href}>
//             <ExternalLink href={href}>{children}</ExternalLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }
