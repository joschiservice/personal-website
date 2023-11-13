import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

export function DownloadCvButton() {
  return (
    <Button component="label" variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>
      Download CV
    </Button>
  )
}