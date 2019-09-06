import React from 'react';
import { composeClassName } from 'utils/html';
import { Icon, Tooltip } from '../index';
import './ControlIcon.css';

const ControlIcon = ({ icon, size, containerClassName, className, onClick, tooltip, tooltipPosition, delay = 300, kind, disabled }) => {
  const finalContainerClassName = composeClassName([
    'control__icon__container',
    !disabled && onClick && 'control__icon__container--button',
    disabled && 'control__icon__container--disabled',
    containerClassName,
  ]);

  let iconComponent = (
    <div className={finalContainerClassName} role="presentation" onClick={disabled ? undefined : onClick}>
      <Icon size={size} name={icon} />
    </div>
  );

  if (tooltip) {
    iconComponent = (
      <Tooltip label={tooltip} kind={kind} position={tooltipPosition} delay={delay}>
        {iconComponent}
      </Tooltip>
    );
  }

  return <div className={composeClassName(['control__icon', className])}>{iconComponent}</div>;
};

export default ControlIcon;
