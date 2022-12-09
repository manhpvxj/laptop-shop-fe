import { styled } from '@mui/material/styles';
import { Category } from '../../components/customer';
import Header from '../../components/customer/Header/Header';
import Footer from '../../components/customer/Footer/Footer';
const CustomerLayout = ({children}) => {

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(() => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  padding: '120px 16px 16px 16px',
}));
    return (
        <StyledRoot>
            <Header/>

            <Category/>

            <Main>
                {children}
                <Footer/>
            </Main>   
        </StyledRoot>
    )
}

export default CustomerLayout