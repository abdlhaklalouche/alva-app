import React from 'react';
import { Circle, icons } from 'lucide-react-native';

const DynamicIcon = ({ name, className, ...props }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return <Circle className={className} {...props} />;
  }

  return <IconComponent className={className}  {...props} />;
};

export default DynamicIcon;
