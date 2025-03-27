import { MdFileDownload } from "react-icons/md"
import { GlassButton } from "./GlassButton"

export function DownloadCvButton() {
  return (
    <GlassButton
      href="/docs/Joschua_Hass_CV.pdf"
      target="_blank"
      ariaLabel="Download CV"
      icon={<MdFileDownload className="h-5 w-5" />}
      color="blue"
    >
      Download CV
    </GlassButton>
  )
}

