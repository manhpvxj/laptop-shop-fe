// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Stack, Button, Typography } from "@mui/material";
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
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
}) {
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle>
        <input accept="image/*" type="file" />

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

      {files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}

      {helperText}
    </Box>
  );
}
