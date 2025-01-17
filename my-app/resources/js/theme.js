import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `"M PLUS 1", sans-serif`, // Heading用のフォント
        body: `"M PLUS 1", sans-serif`, // Body用のフォント
    },
});

export default theme;
