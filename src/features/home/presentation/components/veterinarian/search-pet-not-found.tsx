import { PawPrintIcon } from "lucide-react"


export const SearchPetNotFound = () => {
    return (
        <section className='my-4'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-3 md:w-3/4 lg:w-1/2'>
                    <PawPrintIcon className='w-20 h-20 text-text-2' />
                    <p className='text-center text-gray-500'>No se encontraron mascotas</p>
                </div>
            </div>
        </section>
    )
}