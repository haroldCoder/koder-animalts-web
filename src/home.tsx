import { Route, Routes } from "react-router-dom"
import { Home as HomeFeature } from "./features/home/presentation/pages/home"
import { MainLayout } from "./common/presentation/layout"
import { OwnerPetsView } from "./features/pet/presentation/pages/owner-pets-view"
import { routes } from "./common/presentation/constants"
import { CreatePet } from "./features/pet/presentation/pages/create-pet"
import { AppointmentHistory } from "./features/appointment/presentation/appointment-history"

function HomeLayout() {
    return (
        <div className="home-layout">
            <MainLayout>
                <Routes>
                    {/* El path "/" aquí corresponde a "/home" porque el padre en App.tsx ya define ese prefijo */}
                    <Route path="/" element={<HomeFeature />} />
                    <Route path={routes.pets.path} element={<OwnerPetsView />} />
                    <Route path={routes.createPet.path} element={<CreatePet />} />
                    <Route path={routes.history.path} element={<AppointmentHistory />} />
                    {/* Ejemplo para otra ruta:
                        <Route path="/dashboard" element={<Dashboard />} /> 
                        Esto respondería a "/home/dashboard"
                    */}
                </Routes>
            </MainLayout>
        </div>
    )
}

export default HomeLayout