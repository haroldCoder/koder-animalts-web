import { DogIcon } from 'lucide-react'

export const SearchPetBlank = () => {
    return (
        <section className='my-4'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-3 md:w-3/4 lg:w-1/2'>
                    <DogIcon className='w-20 h-20 text-main' />
                    <p className='text-center text-gray-500'>Comienza escribiendo el nombre de la mascota o del dueño</p>
                </div>
            </div>
        </section>
    )
}