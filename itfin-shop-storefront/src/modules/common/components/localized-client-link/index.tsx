"use client"

import Link from "next/link"
import React from "react"

/**
 * Aangepaste LocalizedClientLink die geen landcode gebruikt
 * Alle links gaan direct naar de route zonder /nl prefix
 */
const LocalizedClientLink = ({
                               children,
                               href,
                               ...props
                             }: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  // Geen landcode toevoegen, direct naar de route
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink