import { useEffect, useState } from 'react';
import { CurrencyCard } from './components/CurrencyCard';
import { usePriceTick } from './services/usePriceTick';
import { Container, Paper, styled } from '@material-ui/core';
import { ForexGraph } from './components';
import { PRESET_CURRENCY, PRESET_FOREX_LIST } from './constants/userPreset';
import { UserForexList } from './components/UserForexList';

const AppContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: '20px 0'
})
const PageContainer = styled(Container)({
  height: '100%',
  display: 'flex'
});

const App = () => {
  const { forexData, setCurrencyPairs } = usePriceTick();
  const [userCurrency, setUserCurrency] = useState(PRESET_CURRENCY)
  const [userForexList, setUserForexList] = useState(PRESET_FOREX_LIST)

  useEffect(() => {
    setCurrencyPairs(['USDJPY'])
  }, []);

  return (
    <AppContainer >
      <PageContainer maxWidth="md">
        <ForexGraph />
        <UserForexList
          userForexList={userForexList}
          forexData={forexData} />
      </PageContainer>
    </AppContainer>
  );
}

export default App;
