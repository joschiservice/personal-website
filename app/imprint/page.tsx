import { trimInside } from "@/helpers";
import { Container, Box, Typography, Link } from "@mui/material";

export default function Imprint() {
    return (
        <Container maxWidth="md" sx={{ paddingTop: 12 }}>
            <Typography variant="h4">Imprint/Legal Disclosure</Typography>
            <Typography>
                Information in accordance with Section 5 TMG.<br />
                Website Operator: Joschua Haß<br />
            </Typography>
            <Typography variant="h5" sx={{ marginTop: "16px" }}>Contact Information</Typography>
            <Typography>
                Phone: <Link href={"tel:" + trimInside(process.env.NEXT_PUBLIC_CONTACT_PHONE || '')}>{process.env.NEXT_PUBLIC_CONTACT_PHONE}</Link><br />
                E-Mail: <Link href={"mailto:" + process.env.NEXT_PUBLIC_CONTACT_EMAIL}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Link><br />
                <br />
                To Westen 5<br />
                25770 Hemmingstedt, Germany<br />
            </Typography>
            <Typography variant="h5" style={{ marginTop: "16px" }}>Copyright</Typography>
            <Typography>
                Our web pages and their contents are subject to German copyright law.
                Unless expressly permitted by law, every form of utilizing,
                reproducing or processing works subject to copyright protection on our web pages requires the
                prior consent of the respective owner of the rights. Individual reproductions of a work are only
                allowed for private use. The materials from these pages are copyrighted and any unauthorized use
                may violate copyright laws.
            </Typography>
        </Container>
    );
}