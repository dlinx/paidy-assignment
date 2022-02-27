import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { CURRENCY } from "../constants/currency"
import { PRESET_CURRENCY } from "../constants/userPreset"

type Props = {
    onUserCurrencyChange: (currency: CURRENCY) => void
    options: string[]
    width: string
    defaultValue?: CURRENCY
    label: string,
    clearOnBlur?: boolean,
    value?: string | null
}
export const CurrencyAutoComplete: React.FC<Props> = ({
    onUserCurrencyChange, options, width, defaultValue, label, clearOnBlur, value }) => {
    return <Autocomplete
        options={options}
        getOptionLabel={(option) => option}
        style={{ width }}
        renderInput={(params) =>
            <TextField {...params} label={label} />}
        defaultValue={defaultValue}
        onChange={(event, newInputValue) => {
            onUserCurrencyChange(newInputValue as CURRENCY)
        }}
        clearOnBlur={clearOnBlur}
        value={value}
    />
}