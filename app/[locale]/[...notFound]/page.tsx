import { notFound } from "next/navigation";

// Unmatched URLs land here so they render inside the root layout, which lives in [locale].
export default function CatchAll() {
  notFound();
}
