import React, { ReactNode, useMemo, createContext, useContext, useState } from 'react'

type sale =  number

type SalesCtx = {
    sales: sale, 
    SalesValue: () => void
}

const SalesContext = createContext<SalesCtx | null>(null)

interface SalesProviderProps {
  children: ReactNode
}

const SalesProvider = ({ children }: SalesProviderProps) => {
  const [sales, setSales] = useState<sale>(0)

  const value  = useMemo<SalesCtx>(
    () => ({ 
        sales, 
        SalesValue: () => setSales((prev: sale) => prev + 1)
     }),
    [sales]
  )

//   const toggle = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  )
}

export default SalesProvider


export function useSales() {
  const salesContext = useContext(SalesContext)
  if (!salesContext) {
    throw new Error("useSales must be used within <SalesProvider></SalesProvider>")
  }
  return salesContext
}