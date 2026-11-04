import { ActionLink } from "@/app/components/system/ActionLink";
import { Container } from "@/app/components/system/Container";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import en from "@/app/i18n/dictionaries/en";

// not-found files don't receive params, so this always uses the default locale.
const copy = en.notFound;

export default function NotFound() {
  return (
    <div className="legal-page">
      <SpaceBackdrop variant="legal" />
      <Container>
        <p className="system-label">{copy.label}</p>
        <h1>{copy.title}</h1>
        <ActionLink href="/">{copy.action}</ActionLink>
      </Container>
    </div>
  );
}
