import React, { useState, useEffect } from "react";
import { Popup } from "@/common/presentation/components";
import { WorkflowStepIndicator, RegisterUserStep, RegisterPetStep, CreatedOwnerInfo } from "./components";

export interface RegisterPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPetCreated?: (newPet: any) => void;
}

export const RegisterPatientModal: React.FC<RegisterPatientModalProps> = ({
    isOpen,
    onClose,
    onPetCreated,
}) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [createdOwner, setCreatedOwner] = useState<CreatedOwnerInfo | null>(null);

    // Reset workflow when opening or closing
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setCreatedOwner(null);
        }
    }, [isOpen]);

    const handleUserCreated = (owner: CreatedOwnerInfo) => {
        setCreatedOwner(owner);
        setStep(2);
    };

    const handlePetCreated = (pet: any) => {
        onPetCreated?.(pet);
        onClose();
    };

    const handleBackToStep1 = () => {
        setStep(1);
    };

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            title={
                step === 1
                    ? "Registro de Paciente: 1. Tutor / Dueño"
                    : `Registro de Paciente: 2. Mascota (${createdOwner?.name || ""})`
            }
            className="max-w-2xl max-h-[92vh] flex flex-col"
        >
            <div className="space-y-5">
                {/* Visual Step Progress Indicator */}
                <WorkflowStepIndicator currentStep={step} />

                {/* Step 1: Owner Registration */}
                {step === 1 && (
                    <RegisterUserStep
                        onUserCreated={handleUserCreated}
                        onCancel={onClose}
                    />
                )}

                {/* Step 2: Pet Registration */}
                {step === 2 && createdOwner && (
                    <RegisterPetStep
                        owner={createdOwner}
                        onPetCreated={handlePetCreated}
                        onBack={handleBackToStep1}
                    />
                )}
            </div>
        </Popup>
    );
};
