import { Component, forwardRef } from 'react';

import BarsThreeSmall from '../assets/icons/bars-three-16-16.svg';
import BarsThree from '../assets/icons/bars-three-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const BarsThreeIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <BarsThreeSmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <BarsThree />
    </Icon>
  );
});
