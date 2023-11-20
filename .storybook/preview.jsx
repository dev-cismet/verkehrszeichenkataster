/** @type { import('@storybook/react').Preview } */
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import "tailwindcss/tailwind.css";
import "../src/index.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={locale}>
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default preview;
