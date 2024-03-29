import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(() => ({
  fontWeight: 600,
  lineHeight: 22 / 14,
  fontSize: "1rem",
  color: "#919EAB",
  marginBottom: 8,
}));

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "Images is required"),
    priceSell: Yup.number().moreThan(0, "Price should not be 0"),
    categoryId: Yup.number().required("Category is required"),
    quantity: Yup.number().required("Quantity is required"),
    });

  const defaultValues = useMemo(
    () => ({
      name: "",
      description: "",
      cover: "",
      images: [],
      quantity: 0,
      priceSell: 0,
      categoryId: 0,
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

  const getCategories = async () => {
    const { data } = await axiosClient.get('/customer/categories');
    setCategories(data);
}

useEffect(() => {
    getCategories();
}, [])

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

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
    setValue("images", []);
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
        id: 1,
        name: data.name,
        description: data.description,
        cover: urls[0],
        images: urls,
        quantity: data.quantity,
        priceSell: data.priceSell,
        categoryId: data.categoryId,
      };
      await axiosClient.post('/products/create', product);
      reset();
      enqueueSnackbar("Create product success!", {variant: 'success'});
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Product Name" />

          <RHFTextField name="description" label="Description" />
          <RHFSelect name="categoryId" label="Category" InputLabelProps={{shrink: true}}>
            {categories.map((category) => (
              <option key={category.id} label={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </RHFSelect>
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
            {!isEdit ? "Create Product" : "Save Changes"}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
