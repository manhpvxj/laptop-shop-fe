// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// components
import { LoginForm } from '../../components/admin/index';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <>
        <Container>
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
    </>
  );
}
