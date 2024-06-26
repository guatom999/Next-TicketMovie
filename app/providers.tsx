'use client'
import { SessionProvider } from "next-auth/react" 

const CustomerProviders = ({children}:{children: React.ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default CustomerProviders