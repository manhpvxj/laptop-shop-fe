import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
import UploadFiles from '../UploadFiles';

export default function RHFUploadMultiFile({ name, ...other }) {
    const { control } = useFormContext();
  
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const checkError = !!error && field.value?.length === 0;
  
          return (
            <UploadFiles
              accept={{ 'image/*': [] }}
              files={field.value}
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