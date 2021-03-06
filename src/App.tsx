import { useEffect, useState } from 'react';
import { CurrencyCard } from './components/CurrencyCard';
import { usePriceTick } from './services/usePriceTick';
import { Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, styled, useMediaQuery, useTheme } from '@material-ui/core';
import { ForexGraph } from './components';
import { ForexListItem, PRESET_CURRENCY, PRESET_FOREX_LIST } from './constants/userPreset';
import { UserForexList } from './components/UserForexList';
import { CURRENCY } from './constants/currency';

const AppContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: '20px 0'
});
const LoadingContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const PageContainer = styled(Container)({
  height: '100%',
  display: 'flex'
});

const App = () => {
  const { hasError, forexData, setCurrencyPairs, isLoading } = usePriceTick();
  const [userCurrency, setUserCurrency] = useState(PRESET_CURRENCY)
  const [userForexList, setUserForexList] = useState<ForexListItem[]>([])
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState(`${PRESET_FOREX_LIST[0]}_${PRESET_CURRENCY}`)
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(() => {
    const currencyPairs: string[] = userForexList.map(({ to, from }) => `${from}${to}`)
    setCurrencyPairs(currencyPairs);
  }, [userForexList])

  useEffect(() => {
    const ufx: ForexListItem[] = [];
    PRESET_FOREX_LIST.forEach(currency => {
      ufx.push({
        from: userCurrency,
        to: currency
      });
    });
    setUserForexList(ufx)
    setSelectedCurrencyPair(`${ufx[0].to}_${ufx[0].from}`)
  }, [userCurrency]);

  const onCardClick = (currencyPair: string) => {
    setSelectedCurrencyPair(currencyPair)
  }
  const addToUserForexList = (currency: CURRENCY) => {
    setUserForexList(list => {
      return [...list, {
        to: currency,
        from: userCurrency
      }]
    })
  }
  return (
    <AppContainer >
      <PageContainer maxWidth="md">
        <Dialog
          open={hasError}
          onClose={() => { window.location.href = '/' }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Error
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              An Error occured
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => window.location.href = '/'}>Reload</Button>
          </DialogActions>
        </Dialog>
        {isLoading ?
          <LoadingContainer>
            <CircularProgress color="secondary" />
          </LoadingContainer>
          : <>
            {isNotMobile && <ForexGraph chartData={forexData[selectedCurrencyPair]} />}
            <UserForexList
              userForexList={userForexList}
              forexData={forexData}
              onCardClick={(currencyPair) => onCardClick(currencyPair)}
              onUserCurrencyChange={(currency) => setUserCurrency(currency)}
              onAddTargetCurrency={(currency) => {
                console.log(currency)
              }}
              addToUserForexList={(currency) => addToUserForexList(currency)}
              userCurrency={userCurrency}
            />
          </>}
      </PageContainer>
    </AppContainer>
  );
}

export default App;
