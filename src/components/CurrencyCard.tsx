import { ForexTick } from "../services/usePriceTick"

type Props = {
  forexData?: ForexTick
}
export const CurrencyCard: React.FC<Props> = ({ forexData }) => {
  return <div>
    <div>Ask: {forexData?.ask}</div>
    <div>Bid: {forexData?.bid}</div>
    <div>From: {forexData?.from}</div>
    <div>Price: {forexData?.price}</div>
    <div>Timestamp: {forexData?.time_stamp}</div>
    <div>To: {forexData?.to}</div>
  </div>
}