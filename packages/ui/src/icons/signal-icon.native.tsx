import { Component, forwardRef } from 'react';

import SignalSmall from '../assets/icons/signal-16-16.svg';
import Signal from '../assets/icons/signal-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const SignalIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <SignalSmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <Signal />
    </Icon>
  );
});
