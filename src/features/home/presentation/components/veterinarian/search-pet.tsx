import { useState, useMemo, useRef, useEffect } from "react"
import { SearchPetBlank } from "./serach-pet-blank"
import { SearchPetNotFound } from "./search-pet-not-found"
import { useSearchPetByVeterinarianUserId } from "@/features/pet/application/queries"
import { useAuth } from "@/common/hooks"
import { Loading } from "@/common/presentation/components"
import { PetEntity } from "@/features/pet/domain/entities"
import { PetCard } from "../pet-card"
import { petsMockData } from "@/features/pet/presentation/data"
import { ChevronRight } from "lucide-react"

export const SearchPet = () => {
    const [search, setSearch] = useState('')
    const { user } = useAuth();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const shouldFetch = useMemo(() => {
        return search.length > 3
    }, [search])

    const { data, isLoading } = useSearchPetByVeterinarianUserId(user!, {
        petName: shouldFetch ? search : undefined,
        ownerName: shouldFetch ? search : undefined
    });

    const petsData = useMemo(() => {
        if (!data) return []
        return data
    }, [data])

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px tolerance
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [petsData]);

    return (
        <section className='my-4'>
            <div className='w-full flex justify-center'>
                <form onSubmit={(e) => e.preventDefault()} className='flex gap-3 md:w-3/4 lg:w-1/2'>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Nombre de la mascota o dueño' className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main text-black' />
                    <button type='submit' className='bg-main px-16 text-white py-2 rounded-lg cursor-pointer hover:bg-main-hover transition'>Buscar</button>
                </form>
            </div>
            <div className="mt-6 mx-14">
                {
                    search && shouldFetch ?
                        (petsData.length == 0) ?
                            <SearchPetNotFound />
                            : isLoading ? <Loading /> :
                                <div className="relative group">
                                    <div
                                        ref={scrollContainerRef}
                                        onScroll={checkScroll}
                                        className={`flex ${petsData.length > 3 ? 'justify-start' : 'justify-center'} gap-4 mt-10 overflow-x-auto pb-4 snap-x scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-1 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400`}
                                    >
                                        {petsData.map((pet: PetEntity) => (
                                            <div key={pet.id} className="min-w-[300px] snap-start">
                                                <PetCard pet={pet} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Indicador de más mascotas a la derecha */}
                                    {canScrollRight && (
                                        <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-bg-main to-transparent pointer-events-none flex items-center justify-end pr-1 transition-opacity duration-300">
                                            <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center p-1 shadow-sm backdrop-blur-md border border-border-1 animate-pulse">
                                                <ChevronRight className="w-5 h-5 font-bold text-lg text-main" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                        : <SearchPetBlank />
                }
            </div>
        </section>
    )
}
