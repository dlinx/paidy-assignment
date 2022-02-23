import { Card, styled, Typography } from "@material-ui/core";

export const CardWrapper = styled(Card)({
    margin: '5px 0',
    padding: '5px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
    '&:hover': {
        background: '#e2eefe'
    },
    '&.active': {
        backgroundColor: '#3b8cff',
        color: '#FFF'
    },
    '&.active::before': {
        display: 'block',
        content: "' '",
        position: 'absolute',
        backgroundColor: "#3b8cff",
        top: 0,
        left: '-5px',
        bottom: '-1px',
        width: '5px'
    }
});

export const Price = styled(Typography)({
    fontSize: '25px',
    textAlign: 'center'
});

export const TradeSectionWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    backgroundColor: 'lightGray',
    color: '#000',
    paddingTop: '10px',
    margin: '-5px',
    marginTop: '5px'
});

export const CardTitleWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

export const CountryFlag = styled('span')({
    marginRight: '10px'
});

export const PriceWrapper = styled('div')({
    width: '100%'
})
export const BuyPriceWrapper = styled(PriceWrapper)({
    borderRight: '1px solid gray'
});
