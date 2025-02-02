import { Component, forwardRef } from 'react';

import KeySmall from '../assets/icons/key-16-16.svg';
import Key from '../assets/icons/key-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const KeyIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <KeySmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <Key />
    </Icon>
  );
});
