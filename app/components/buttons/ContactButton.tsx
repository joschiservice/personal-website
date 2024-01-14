import {Button} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

export function ContactButton() {
  return (
    <Button variant="contained" startIcon={<MessageIcon />} color="highlightDark" sx={{ textTransform: 'none' }} href={"mailto:" + process.env.NEXT_PUBLIC_CONTACT_EMAIL}>
      Get in touch
    </Button>
  )
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlightDark: true;
  }
}