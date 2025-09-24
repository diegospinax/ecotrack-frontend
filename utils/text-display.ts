import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";

export const capitalizeFirstLetter = (text: string): string => {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const removeUnderScores = (text: string): string => {
    return text.replace(/_/g, ' ');
}

export const beautifyText = (text?: string): string => {
    if (!text) return ''
    return capitalizeFirstLetter(removeUnderScores(text));
}

export const translateEcoCategory = (category: EcoCategoryEnum): string => {
    switch (category) {
        case EcoCategoryEnum.CARBON_FOOTPRINT:
            return 'Huella de Carbono';
        case EcoCategoryEnum.WASTE_MANAGEMENT:
            return 'Manejo de residuos';
        case EcoCategoryEnum.ENERGY_EFFICIENCY:
            return 'Eficiencia energética';
        case EcoCategoryEnum.RESPONSIBLE_CONSUMPTION:
            return 'Consumo responsable';
        case EcoCategoryEnum.SUSTAINABLE_MOBILITY:
            return 'Movilidad sustentable';
        case EcoCategoryEnum.WATER_CONSERVATION:
            return 'Conservación del agua'
    }
}