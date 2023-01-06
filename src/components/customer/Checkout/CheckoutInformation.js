import { TextField, Stack, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setFullName,
  setPhoneNumber,
} from "../../../redux/cart.slice";

export const CheckoutInformation = () => {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.cart.information.fullName);
  const phoneNumber = useSelector(
    (state) => state.cart.information.phoneNumber
  );
  const address = useSelector((state) => state.cart.information.address);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "grid",
          rowGap: 3,
          columnGap: 2,
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
        }}
      >
        <TextField
          name="fullName"
          label="Full Name"
          value={fullName}
          onChange={(e) => dispatch(setFullName(e.target.value))}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
        />
      </Box>

      <TextField
        name="address"
        label="Address"
        value={address}
        onChange={(e) => dispatch(setAddress(e.target.value))}
      />
    </Stack>
  );
};
