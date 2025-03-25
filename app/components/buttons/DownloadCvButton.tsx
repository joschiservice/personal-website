import { MdFileDownload } from 'react-icons/md';

export function DownloadCvButton() {
  return (
    <a
      href="/docs/Joschua_Hass_CV.pdf"
      target="_blank"
      className="inline-flex items-center gap-2 px-2.5 py-2 border border-[#90caf9] text-[#90caf9] text-sm font-medium rounded hover:bg-blue-50 transition-colors"
    >
      <MdFileDownload className="h-5 w-5" />
      <span>Download CV</span>
    </a>
  )
}