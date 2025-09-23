import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";

export const getTypeIcon = (type: EcoCategoryEnum): string => {
    switch (type) {
        case EcoCategoryEnum.CARBON_FOOTPRINT:
            return '🌍';
        case EcoCategoryEnum.ENERGY_EFFICIENCY:
            return '💡';
        case EcoCategoryEnum.WASTE_MANAGEMENT:
            return '♻️';
        case EcoCategoryEnum.SUSTAINABLE_MOBILITY:
            return '🚲';
        case EcoCategoryEnum.RESPONSIBLE_CONSUMPTION:
            return '🛒';
        case EcoCategoryEnum.WATER_CONSERVATION:
            return '💧';
        default:
            return '🌱';
    }
}