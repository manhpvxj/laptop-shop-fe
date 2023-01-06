// @mui
import {
    Box,
    Card,
    Stack,
    Divider,
    CardHeader,
    Typography,
    CardContent,
  } from '@mui/material';
  // utils
  import { fCurrency } from '../../../utils/formatCurrency';
  
  // ----------------------------------------------------------------------

  export default function CheckoutSummary({
    total,
  }) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Order Summary"
        />
  
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sub Total
              </Typography>
              <Typography variant="subtitle2">{fCurrency(total)}₫</Typography>
            </Stack>
  
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Discount
              </Typography>
              <Typography variant="subtitle2">-</Typography>
            </Stack>
  
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="subtitle2">
                -
              </Typography>
            </Stack>
  
            <Divider />
  
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">Total</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                  {fCurrency(total)}₫
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  (VAT included if applicable)
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  