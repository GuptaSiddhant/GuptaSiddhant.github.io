import clsx from "clsx"
import { NavLink } from "remix"
import GithubIcon from "remixicon-react/GithubFillIcon"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import { socialLinks as aboutSocialLinks } from "~/features/about"

const navLinks: Array<{
  to: string
  children: React.ReactNode
}> = [
  // { to: "/about", children: "About" },
  { to: "/projects", children: "Projects" },
  // { to: "/blog", children: "Blog" },
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
                  clsx(
                    isActive
                      ? "font-semibold text-white underline underline-offset-4"
                      : "hover:text-white",
                  )
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
