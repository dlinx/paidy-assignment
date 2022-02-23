import { useEffect, useState } from 'react';
import { CurrencyCard } from './components/CurrencyCard';
import { usePriceTick } from './services/usePriceTick';
import { Container, Paper, styled } from '@material-ui/core';
import { ForexGraph } from './components';

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
const CurrenciesContainer = styled('div')({
  maxWidth: '300px'
});

const App = () => {
  const { forexTick, setCurrencyPairs } = usePriceTick();
  useEffect(() => {
    setCurrencyPairs(['USDJPY'])
  }, [])
  return (
    <AppContainer >
      <PageContainer maxWidth="md">
        <CurrenciesContainer>
        </CurrenciesContainer>
        <ForexGraph />
      </PageContainer>
    </AppContainer>
  );
}

export default App;
