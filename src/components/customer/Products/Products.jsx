import {Box, Grid} from '@mui/material';

const Products = () =>  {

  return (
    <Box sx={{ flexGrow: 1 }} className="mt-5 ml-10">
    <Grid container columns={{ xs: 4, sm: 12, md: 16 }}>
      {Array.from(Array(16)).map((_, index) => (
        <Grid xs={2} sm={3} md={4} key={index} className="mt-5">
          <div className="h-32 w-32 rounded-md bg-zinc-300">
            <p className="text-center m-auto">Product</p>
          </div>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}
export default Products;
