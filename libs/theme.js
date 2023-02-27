import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#f0e7db", "#f0e7db")(props),
    },
  }),
};

const components = {
  Heading: {
    variants: {
      "section-title": {
        color: "#202023",
        fontSize: 20,
        marginTop: 10,
        
      },
      "page-title": {
        color: "#202023",
        fontSize: 40,
      },
      "signature": {
        color: "#202023",
        fontSize: 23,
        marginBottom: 2
      },
    },
  },
};

const fonts = {
  heading: "'M PLUS Rounded 1c'",
};

const colors = {
  glassTeal: "#88ccca",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
});

export default theme;
