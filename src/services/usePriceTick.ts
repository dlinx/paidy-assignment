import { useEffect, useState } from "react";
import { CURRENCY } from "../constants/currency";

export interface ForexTick {
  from: CURRENCY,
  to: CURRENCY,
  bid: number,
  ask: number,
  price: number,
  time_stamp: string
}
export const usePriceTick = () => {
  const [forexTick, setForexTick] = useState<ForexTick[]>();
  const [currencyPairs, setCurrencyPairs] = useState<string[]>([]);
  const [forexData, setForexData] = useState<{ [key: string]: ForexTick[] }>({});

  const addToForexData = (forexTick: ForexTick[]) => {
    setForexData(fData => {
      const _fData = { ...fData }
      forexTick.forEach(ft => {
        const ticks = _fData[`${ft.to}_${ft.from}`] ?? [];
        ticks.push(ft);
        _fData[`${ft.to}_${ft.from}`] = ticks;
      });
      return _fData;
    });
  }

  useEffect(() => {
    if (currencyPairs.length === 0) return;
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://localhost:8080/streaming/rates?pair=JPYUSD&pair=JPYINR', {
      headers: {
        token: '10dc303535874aeccc86a8251e6992f5'
      },
      signal
    }).then(res => {
      return res.body?.getReader()
    })
      .then(reader => {
        return new ReadableStream({
          start: (controller) => {
            return readStream()
            function readStream(): any {
              return reader?.read()
                .then(({ done, value }) => {
                  if (value) {
                    const jsonStr = new TextDecoder().decode(value);
                    const jsonData = JSON.parse(jsonStr);
                    addToForexData(jsonData);
                  }
                  if (done) {
                    controller.close();
                    return null;
                  }
                  return readStream();
                });
            }
          }
        });
      });
    return () => {
      console.log('aborted')
      controller.abort();
    }
  }, [currencyPairs]);

  return {
    forexData,
    setCurrencyPairs
  }
}