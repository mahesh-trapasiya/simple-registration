import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Components/Button/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    onClick: { action: true },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: "lg",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
};
