// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
// type
import MultiFilePreview from "./PreviewFiles";

// ----------------------------------------------------------------------
const DropZoneStyle = styled("div")(() => ({
  outline: "none",
  padding: "40px 8px",
  borderRadius: 4,
  backgroundColor: alpha("#919EAB", 0.16),
  border: `1px dashed ${alpha("#919EAB", 0.32)}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

export default function UploadFiles({
  files,
  onDrop,
  onRemove,
  helperText,
  sx,
}) {
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

      <MultiFilePreview files={files} onRemove={onRemove} />
      {helperText}
    </Box>
  );
}
