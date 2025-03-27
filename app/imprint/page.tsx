import { trimInside } from "@/helpers";
import Link from "next/link";

export default function Imprint() {
    return (
        <div className="container mx-auto max-w-3xl pt-24 px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-bold">Imprint/Legal Disclosure</h1>
            <p className="mt-2">
                Information in accordance with Section 5 TMG.<br />
                Website Operator: Joschua Haß<br />
            </p>
            <h2 className="text-xl font-bold mt-4">Contact Information</h2>
            <p className="mt-2">
                Phone: <Link href={`tel:${trimInside(process.env.NEXT_PUBLIC_CONTACT_PHONE || '')}`} className="text-white hover:text-[#29b5f6] transition-colors duration-300">{process.env.NEXT_PUBLIC_CONTACT_PHONE}</Link><br />
                E-Mail: <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-white hover:text-[#29b5f6] transition-colors duration-300">{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Link><br />
                <br />
                To Westen 5<br />
                25770 Hemmingstedt, Germany<br />
            </p>
            <h2 className="text-xl font-bold mt-4">Copyright</h2>
            <p className="mt-2">
                Our web pages and their contents are subject to German copyright law.
                Unless expressly permitted by law, every form of utilizing,
                reproducing or processing works subject to copyright protection on our web pages requires the
                prior consent of the respective owner of the rights. Individual reproductions of a work are only
                allowed for private use. The materials from these pages are copyrighted and any unauthorized use
                may violate copyright laws.
            </p>
        </div>
    );
}