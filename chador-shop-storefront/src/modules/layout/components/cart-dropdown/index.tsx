"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
                        cart: cartState,
                      }: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <div className="chador-nav-link flex items-center gap-2 text-sm group">
            <div className="relative">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-chador-gold text-chador-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Winkelwagen ({totalItems})</span>
            <span className="sm:hidden">{totalItems}</span>
          </div>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 bg-chador-warm-white border border-chador-soft-beige rounded-lg w-[420px] text-chador-black shadow-chador-lg"
            data-testid="nav-cart-dropdown"
          >
            {/* Header */}
            <div className="p-4 border-b border-chador-soft-beige">
              <div className="flex items-center justify-between">
                <h3 className="chador-heading text-lg">Winkelwagen</h3>
                {totalItems > 0 && (
                  <span className="text-sm text-chador-brown">{totalItems} artikel{totalItems !== 1 ? 'en' : ''}</span>
                )}
              </div>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="overflow-y-scroll max-h-[400px] p-4 space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="flex gap-3 group"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-20 h-20 flex-shrink-0"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                            className="w-full h-full rounded-md overflow-hidden border border-chador-soft-beige"
                          />
                        </LocalizedClientLink>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              className="font-medium text-sm text-chador-black hover:text-chador-gold transition-colors line-clamp-2"
                              data-testid="product-link"
                            >
                              {item.title}
                            </LocalizedClientLink>
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </div>

                          <LineItemOptions
                            variant={item.variant}
                            data-testid="cart-item-variant"
                            className="text-xs text-chador-brown mb-2"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-chador-brown" data-testid="cart-item-quantity">
                              Aantal: {item.quantity}
                            </span>
                            <DeleteButton
                              id={item.id}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid="cart-item-remove-button"
                            >
                              <svg className="w-4 h-4 text-chador-brown hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-chador-soft-beige bg-chador-cream/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="chador-heading text-base">
                      Subtotaal
                    </span>
                    <span
                      className="chador-heading text-lg text-chador-gold"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-chador-brown mb-4">
                    Verzendkosten worden berekend bij het afrekenen
                  </p>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="chador-btn w-full"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Bekijk Winkelwagen
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-chador-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-chador-taupe" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                  </svg>
                </div>
                <h3 className="chador-heading text-lg mb-2">Je winkelwagen is leeg</h3>
                <p className="text-chador-brown text-sm mb-6">Voeg mooie items toe om te beginnen met winkelen</p>
                <LocalizedClientLink href="/store">
                  <Button className="chador-btn-secondary" onClick={close}>
                    Ontdek Producten
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown