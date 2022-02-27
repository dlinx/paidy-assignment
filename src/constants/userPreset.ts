import { CURRENCY } from "./currency";

export const PRESET_CURRENCY = CURRENCY.JPY;
export type ForexListItem = {
    from: CURRENCY,
    to: CURRENCY
}
export const PRESET_FOREX_LIST: CURRENCY[] = [
    CURRENCY.USD,
    CURRENCY.EUR,
    CURRENCY.GBP,
    CURRENCY.CNY,
    CURRENCY.INR,
]