import { Component, forwardRef } from 'react';

import InfoCircleSmall from '../assets/icons/info-circle-16-16.svg';
import InfoCircle from '../assets/icons/info-circle-24-24.svg';
import { Icon, IconProps } from './icon/icon.native';

export const InfoCircleIcon = forwardRef<Component, IconProps>(({ variant, ...props }, ref) => {
  if (variant === 'small')
    return (
      <Icon ref={ref} {...props}>
        <InfoCircleSmall />
      </Icon>
    );
  return (
    <Icon ref={ref} {...props}>
      <InfoCircle />
    </Icon>
  );
});
