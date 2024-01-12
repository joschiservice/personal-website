import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

export function DownloadCvButton() {
  return (
    <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }} href="/docs/Joschua_Hass_CV.pdf" target="_blank">
      Download CV
    </Button>
  )
}