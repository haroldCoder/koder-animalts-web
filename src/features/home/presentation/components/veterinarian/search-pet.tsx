import { useState, useMemo } from "react"
import { SearchPetBlank } from "./serach-pet-blank"
import { SearchPetNotFound } from "./search-pet-not-found"

export const SearchPet = () => {
    const [search, setSearch] = useState('')
    const petsData = useMemo(() => {
        return []
    }, [])


    return (
        <section className='my-4'>
            <div className='w-full flex justify-center'>
                <form onSubmit={(e) => e.preventDefault()} className='flex gap-3 md:w-3/4 lg:w-1/2'>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Nombre de la mascota o dueño' className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main text-black' />
                    <button type='submit' className='bg-main px-16 text-white py-2 rounded-lg cursor-pointer hover:bg-main/80 transition'>Buscar</button>
                </form>
            </div>
            <div className="mt-6">
                {
                    search ?
                        petsData.length == 0 ?
                            <SearchPetNotFound />
                            : null
                        : <SearchPetBlank />
                }
            </div>
        </section>
    )
}
