const mainRoute = "/home"

export const routes = {
    home: {
        path: mainRoute,
        label: "Dashboard",
        link: mainRoute
    },
    auth: {
        path: "/",
        link: "/",
    },
    pets: {
        path: `/pets`,
        link: `${mainRoute}/pets`,
        label: "Mascotas"
    },
    createPet: {
        path: "/create-pet",
        link: `${mainRoute}/create-pet`,
        label: "Crear Mascota"
    },
    history: {
        path: "/history",
        link: `${mainRoute}/history`,
        label: "Historial de citas"
    },
    appointments: {
        path: "/appointments",
        link: `${mainRoute}/appointments`,
        label: "Próximas citas"
    },
    schedule: {
        path: "/schedule",
        link: `${mainRoute}/schedule`,
        label: "Programar cita"
    },
    documents: {
        path: "/documents",
        link: `${mainRoute}/documents`,
        label: "Documentos de las mascotas"
    },
    vaccinations: {
        path: "/vaccinations",
        link: `${mainRoute}/vaccinations`,
        label: "Vacunas"
    },
};