import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextBox from "../Components/TextBox/TextBox";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Example/TextBox",
  component: TextBox,
  argTypes: {},
} as ComponentMeta<typeof TextBox>;

const Template: ComponentStory<typeof TextBox> = (args) => (
  <TextBox {...args} />
);

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  type: "text",
  placeholder: "Enter Placeholder",
};

export const medium = Template.bind({});
medium.args = {
  size: "md",
  type: "text",
  placeholder: "Enter Placeholder",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  type: "text",
  placeholder: "Enter Placeholder",
};
