import { MdMessage } from 'react-icons/md';

export function ContactButton() {
  return (
    <a
      href={"mailto:" + process.env.NEXT_PUBLIC_CONTACT_EMAIL}
      className="inline-flex items-center gap-2 px-2.5 py-2 bg-blue-700 text-white text-sm font-bold rounded-sm shadow-sm hover:bg-blue-800 transition-colors"
    >
      <MdMessage className="h-5 w-5" />
      <span>Get in touch</span>
    </a>
  )
}
