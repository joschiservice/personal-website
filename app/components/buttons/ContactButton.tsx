import { MdMessage } from "react-icons/md"
import { GlassButton } from "./GlassButton"

export function ContactButton() {
  return (
    <GlassButton
      href={"mailto:" + process.env.NEXT_PUBLIC_CONTACT_EMAIL}
      icon={<MdMessage className="h-5 w-5" />}
      color="white"
      ariaLabel="Contact via email"
    >
      Get in touch
    </GlassButton>
  )
}
