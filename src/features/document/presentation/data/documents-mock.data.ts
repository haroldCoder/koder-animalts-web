import { DocumentEntity } from "../../domain/entities";

export const mockDocuments: DocumentEntity[] = [
    {
        id: '1',
        name: 'Radiografía de Tórax',
        veterinarian: 'Dr. Carlos Mendoza',
        date: new Date(2026, 5, 25), // 25 de Junio, 2026
        petName: 'Max',
        fileUrl: 'https://example.com/radiografia.jpg',
        type: 'Imagen',
        size: '2.4 MB'
    },
    {
        id: '2',
        name: 'Receta Médica - Amoxicilina',
        veterinarian: 'Dra. Ana Silva',
        date: new Date(2026, 5, 20), // 20 de Junio, 2026
        petName: 'Luna',
        fileUrl: 'https://example.com/receta.pdf',
        type: 'Receta',
        size: '450 KB'
    },
    {
        id: '3',
        name: 'Resultados de Sangre - Hemograma Completo',
        veterinarian: 'Dr. Carlos Mendoza',
        date: new Date(2026, 5, 15), // 15 de Junio, 2026
        petName: 'Max',
        fileUrl: 'https://example.com/resultado.pdf',
        type: 'Resultado',
        size: '1.2 MB'
    },
    {
        id: '4',
        name: 'Certificado de Vacunación Rabia',
        veterinarian: 'Dr. Luis Torres',
        date: new Date(2026, 4, 10), // 10 de Mayo, 2026
        petName: 'Rocky',
        fileUrl: 'https://example.com/certificado.pdf',
        type: 'PDF',
        size: '850 KB'
    },
    {
        id: '5',
        name: 'Ecografía Abdominal',
        veterinarian: 'Dra. Ana Silva',
        date: new Date(2026, 4, 5), // 5 de Mayo, 2026
        petName: 'Luna',
        fileUrl: 'https://example.com/ecografia.jpg',
        type: 'Imagen',
        size: '3.1 MB'
    }
]