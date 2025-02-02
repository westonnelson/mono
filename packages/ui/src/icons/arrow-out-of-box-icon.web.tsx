import { forwardRef } from 'react';

import ArrowOutOfBoxSmall from '../assets/icons/arrow-out-of-box-16-16.svg';
import ArrowOutOfBox from '../assets/icons/arrow-out-of-box-24-24.svg';
import { Icon, IconProps } from './icon/icon.web';

export const ArrowOutOfBoxIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ variant, ...props }, ref) => {
    if (variant === 'small')
      return (
        <Icon ref={ref} {...props}>
          <ArrowOutOfBoxSmall />
        </Icon>
      );
    return (
      <Icon ref={ref} {...props}>
        <ArrowOutOfBox />
      </Icon>
    );
  }
);
