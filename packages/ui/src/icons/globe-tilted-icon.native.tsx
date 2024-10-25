import { Component, forwardRef } from 'react';

import GlobeTiltedSmall from '../assets/icons/globe-tilted-16-16.svg';
import GlobeTilted from '../assets/icons/globe-tilted-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const GlobeTiltedIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <GlobeTiltedSmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <GlobeTilted />
    </Icon>
  );
});
