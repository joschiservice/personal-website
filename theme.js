import {createTheme} from "@mui/material";
import {blue} from "@mui/material/colors";

let superTheme = createTheme();

export const theme = createTheme({
    palette: {
        mode: 'dark',
        highlightDark: superTheme.palette.augmentColor({
            color: {
                main: blue[800],
            },
            name: 'highlightDark',
        }),
    },
    typography: {
        hero: {
            fontSize: '4rem',
            fontWeight: 700,
            lineHeight: "5rem"
        },
        heroSubText: {
            fontSize: '1rem'
        }
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    hero: 'h1',
                    heroSubText: 'p'
                },
            },
        },
    },
});