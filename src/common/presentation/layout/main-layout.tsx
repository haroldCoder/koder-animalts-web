import { createContext, ReactNode } from 'react'
import { Header } from '../components'
import { useGetUser, UserEntity } from '@/features/user'
import { useAuth } from '@/common/hooks'
import { Spinner } from '@/components/ui/spinner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
    children: ReactNode
}

interface MainLayoutContextType {
    user: UserEntity
}

export const MainLayoutContext = createContext<MainLayoutContextType | null>(null)

export const MainLayout = ({ children }: Props) => {
    const { user } = useAuth();
    const { data: userData, isLoading } = useGetUser(user!);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <Spinner className='w-10 h-10' />
        </div>
    }

    return (
        <MainLayoutContext.Provider value={{ user: userData! }}>
            <div className="flex flex-col h-screen w-full overflow-hidden">
                <Header />
                <ScrollArea className="flex-1 min-h-0 w-full bg-bg-1">
                    <main className="p-4 md:p-6 pb-24">
                        {children}
                    </main>
                </ScrollArea>
            </div>
        </MainLayoutContext.Provider>
    )
}