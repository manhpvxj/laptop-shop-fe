// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
// type
import Image from "../../utils/Image";
// ----------------------------------------------------------------------
const DropZoneStyle = styled("div")(() => ({
  outline: "none",
  padding: "40px 8px",
  borderRadius: 4,
  backgroundColor: alpha("#919EAB", 0.16),
  border: `1px dashed ${alpha("#919EAB", 0.32)}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

export default function UploadFiles({ file, onDrop, sx }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ p: 3 }}>
          <Typography gutterBottom variant="h5">
            Select file
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Click&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      {file && (
        <>
          <Image
            alt="file preview"
            src={typeof file === "string" ? file : file.preview}
            ratio="1/1"
            sx={{
              p: 0,
              m: 0.5,
              width: 100,
              height: 100,
              borderRadius: 1.25,
              overflow: "hidden",
              position: "relative",
              display: "inline-flex",
              border: `solid 1px`,
            }}
          />
        </>
      )}
    </Box>
  );
}
