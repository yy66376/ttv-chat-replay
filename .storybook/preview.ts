import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswLoader } from "msw-storybook-addon";

const MY_VIEWPORTS = {
  ...INITIAL_VIEWPORTS,
  FHD: {
    name: "FHD - 1080p",
    styles: {
      width: "1920px",
      height: "1080px",
    },
  },
  QHD: {
    name: "QHD - 1440p",
    styles: {
      width: "2560px",
      height: "1440px",
    },
  },
  UD: {
    name: "UHD - 4K",
    styles: {
      width: "3840px",
      height: "2160px",
    },
  },
};

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      theme: themes.dark,
      toc: { headingSelector: "h1, h2, h3" },
    },
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: MY_VIEWPORTS,
    },
  },
  loaders: [mswLoader],
};

export default preview;
