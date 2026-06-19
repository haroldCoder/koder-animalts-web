import { Route, Routes } from "react-router-dom"
import { Home as HomeFeature } from "./features/home/presentation/pages/home"
import { MainLayout } from "./common/presentation/layout"

function HomeLayout() {
    return (
        <div className="home-layout">
            <MainLayout>
                <Routes>
                    {/* El path "/" aquí corresponde a "/home" porque el padre en App.tsx ya define ese prefijo */}
                    <Route path="/" element={<HomeFeature />} />
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