import { CURRENCY } from "./currency";

export const PRESET_CURRENCY = 'JPY';
export type ForexListItem = {
    from: CURRENCY,
    to: CURRENCY
}
export const PRESET_FOREX_LIST: ForexListItem[] = [
    { from: CURRENCY.JPY, to: CURRENCY.USD },
    { from: CURRENCY.JPY, to: CURRENCY.EUR },
    { from: CURRENCY.JPY, to: CURRENCY.GBP },
    { from: CURRENCY.JPY, to: CURRENCY.CNY },
    { from: CURRENCY.JPY, to: CURRENCY.INR },
]