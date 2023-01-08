import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Card, InputAdornment, Stack, Typography, Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadFile,
} from "../../common/react-hook-form";
import axiosClient from '../../../api/axiosClient';
import axios from 'axios';
import { useSelector } from "react-redux";
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(() => ({
  fontWeight: 600,
  lineHeight: 22 / 14,
  fontSize: "1rem",
  color: "#919EAB",
  marginBottom: 8,
}));

// ----------------------------------------------------------------------

export default function ProductEditForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const currentProduct = useSelector((state) => state.product.product.product);
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "Images is required"),
    priceSell: Yup.number().moreThan(0, "Price should not be 0"),
    categoryId: Yup.number().required("Category is required"),
    quantity: Yup.number().required("Quantity is required"),
    });
  
    console.log(currentProduct);
  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name,
      description: currentProduct?.description,
      cover: currentProduct?.cover,
      images: currentProduct?.images,
      quantity: currentProduct?.quantity,
      priceSell: currentProduct?.priceSell,
      categoryId: currentProduct?.category?.id,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();


  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];
      setValue("images", [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );
  const handleDropCover = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      if(file) {
        setValue("cover", 
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      }
    },
    [setValue, values.cover]
  );
  const handleRemoveAll = () => {
    setValue("image", []);
    setValue("cover", undefined);
  };

  const handleRemove = (file) => {
    const filteredItems =
      values.images && values.images?.filter((_file) => _file !== file);
    setValue("images", filteredItems);
  };

  const handleUploadImages = async (cover,images) => {
    const urls = [];
    images.unshift(cover);
    for( const element of images) {
      const formData = new FormData();
      formData.append('file', element);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      const { data } = await axios.create().post(process.env.REACT_APP_API_CLOUDINARY_URL, formData);
      urls.push(data?.url);
    }
    return urls;
  }

  
  const onSubmit = async (data) => {
    try {
      const urls = await handleUploadImages(data.cover, data.images);
      const product = {
        id,
        name: data.name,
        description: data.description,
        cover: urls[0],
        images: urls,
        quantity: data.quantity,
        priceSell: data.priceSell,
        categoryId: data.categoryId,
      };
      await axiosClient.post(`/products/${id}/edit`, product);
      reset();
      enqueueSnackbar("Success!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Product Name" disabled/>

          <RHFTextField name="description" label="Description" />
          <RHFTextField name="categoryId" label="Category" value={values.categoryId.name} disabled/>

          <RHFTextField
            name="priceSell"
            label="Sale Price"
            placeholder="0.00"
            value={getValues("priceSell") === 0 ? "" : getValues("priceSell")}
            onChange={(event) => setValue("priceSell", Number(event.target.value))}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              ),
              type: "number",
            }}
          />
          <RHFTextField name="quantity" label="Quantity" />
          <div>
            <LabelStyle>Cover</LabelStyle>
            <RHFUploadFile
              name="cover"
              maxSize={3145728}
              onDrop={handleDropCover}
              onUpload={() => console.log("ON UPLOAD")}
            />
          </div>
          <div>
            <LabelStyle>Images</LabelStyle>
            <RHFUploadMultiFile
              name="images"
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onUpload={() => console.log("ON UPLOAD")}
            />
          </div>
        </Stack>
        <Stack alignItems={"flex-end"} spacing={2}>
        <Button color="inherit" size="small" onClick={handleRemoveAll}>
              Remove all images
            </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{mt: 5}}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
