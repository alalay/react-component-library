import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { defaultTheme } from "./themes";

export const GlobalStyle = createGlobalStyle`
    ${normalize()}
    
    html {
        font-size: 10px;
    }
    input::placeholder {
        font-family: ${defaultTheme.primaryFont}
    }
`;
