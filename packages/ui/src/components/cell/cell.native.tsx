import { ReactElement, ReactNode } from 'react';

import {
  Avatar,
  ChevronRightIcon,
  Flag,
  IconProps,
  ItemLayout,
  RadioButton,
  Switch as UISwitch,
} from '../../../native';
import { Pressable, PressableProps } from '../pressable/pressable.native';
import { RadioButtonProps } from '../radio-button/radio-button.native';
import { SwitchProps } from '../switch/switch.native';

interface CellProps extends PressableProps {
  caption?: string;
  icon?: ReactElement<IconProps>;
  title: string;
  children?: ReactNode;
}
export function Root({ caption, icon, title, children, ...props }: CellProps) {
  const itemLayout = <ItemLayout actionIcon={children} captionLeft={caption} titleLeft={title} />;

  const content = icon ? <Flag img={<Avatar>{icon}</Avatar>}>{itemLayout}</Flag> : itemLayout;

  return (
    <Pressable flexDirection="row" py="3" {...props}>
      {content}
    </Pressable>
  );
}

function Chevron() {
  return <ChevronRightIcon variant="small" />;
}

function Switch(props: SwitchProps) {
  return <UISwitch {...props} />;
}

function Radio(props: RadioButtonProps) {
  return <RadioButton disabled {...props} />;
}

export const Cell = {
  Root,
  Chevron,
  Switch,
  Radio,
};
