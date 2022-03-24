import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import "bootstrap/dist/css/bootstrap.min.css";
import SelectBox from "../Components/SelectBox/SelectBox";

export default {
  title: "Example/SelectBox",
  component: SelectBox,
  argTypes: {},
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
);

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  options: [],
};

export const medium = Template.bind({});
medium.args = {
  size: "md",
  options: [],
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  options: [],
};
