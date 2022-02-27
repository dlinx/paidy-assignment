import { useEffect, useState } from "react";
import { API_SERVER, API_URL, AUTH_TOKEN } from "../constants/api";
import { CURRENCY } from "../constants/currency";

export interface ForexTick {
  from: CURRENCY,
  to: CURRENCY,
  bid: number,
  ask: number,
  price: number,
  time_stamp: Date
}
export const usePriceTick = () => {
  const [currencyPairs, setCurrencyPairs] = useState<string[]>([]);
  const [forexData, setForexData] = useState<{ [key: string]: ForexTick[] }>({});
  const [isLoading, setIsLoading] = useState(false)

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
    setForexData({})
    if (currencyPairs.length === 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    const params = currencyPairs.join('&pair=')
    setIsLoading(true);
    fetch(`${API_SERVER}${API_URL}?pair=${params}`, {
      headers: {
        token: AUTH_TOKEN
      },
      signal
    }).then(res => {
      setIsLoading(false);
      return res.body?.getReader();
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
                    const jsonData = JSON.parse(jsonStr) as ForexTick[]
                    const parsedData = jsonData
                      .map(j => ({ ...j, time_stamp: new Date(j.time_stamp) }));
                    addToForexData(parsedData);
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
    setCurrencyPairs,
    isLoading
  }
}