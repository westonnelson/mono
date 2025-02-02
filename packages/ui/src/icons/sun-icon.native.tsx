import { Component, forwardRef } from 'react';

import SunSmall from '../assets/icons/sun-16-16.svg';
import Sun from '../assets/icons/sun-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const SunIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <SunSmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <Sun />
    </Icon>
  );
});
