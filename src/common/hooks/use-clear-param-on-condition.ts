import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hook reutilizable para redirigir a una ruta base y limpiar un parámetro de la URL
 * (como `medicalRecordId` de `useParams`) cuando se cumpla una condición (por ejemplo, cuando se aplican filtros).
 *
 * @param paramValue El valor del parámetro obtenido de `useParams()` (ej. `medicalRecordId`)
 * @param condition Condición booleana que activa la limpieza (ej. `hasActiveFilters`)
 * @param targetRoute Ruta de destino sin el parámetro (ej. `routes.documents.link`)
 * @param onClear Callback opcional que se ejecuta al limpiar para restablecer estado local (ej. limpiar el objeto de filtros)
 */
export const useClearParamOnCondition = (
    paramValue: string | undefined,
    condition: boolean,
    targetRoute: string,
    onClear?: () => void
) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (paramValue && condition) {
            navigate(targetRoute, { replace: true });
            onClear?.();
        }
    }, [paramValue, condition, targetRoute, navigate, onClear]);
};
