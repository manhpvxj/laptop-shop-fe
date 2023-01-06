import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
import UploadFile from '../UploadFile';

export default function RHFUploadFile({ name, ...other }) {
    const { control } = useFormContext();
  
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const checkError = !!error && field.value === 0;
  
          return (
            <UploadFile
              file={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {error?.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
          );
        }}
      />
    );
  }