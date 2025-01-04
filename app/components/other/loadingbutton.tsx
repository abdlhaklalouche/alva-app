import { Button, ButtonProps } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { Text } from "~/components/ui/text";

type LoadingButtonProps = {
  loading?: boolean;
  text?: string;
  children?: ReactNode;
} & ButtonProps;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  text = "Processing..",
  ...props
}) => {
  return loading == true ? (
    <Button {...props} disabled={loading}>
      <Text>{text}</Text>
    </Button>
  ) : (
    <Button {...props}>{children}</Button>
  );
};

export default LoadingButton;
