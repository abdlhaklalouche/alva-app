import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TextInputProps,
} from "react-native";
import { View } from "react-native";
import { Label } from "~/components/ui/label";
import { FormControl, FormField, FormMessage } from "./form";

type FormInputProps = {
  name: string;
  label?: string;
  description?: string;
} & TextInputProps;

const FormTextField: React.FC<FormInputProps> = ({
  name,
  label,
  description,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    field.onChange(e.nativeEvent.text);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={otherProps.defaultValue ?? ""}
      render={({ field }) => (
        <View className="space-y-0 w-full">
          {label && <Label className="text-xs text-gray-500">{label}</Label>}
          <FormControl>
            <Input
              {...otherProps}
              className={cn(
                "h-8 text-xs w-52 placeholder:text-sm",
                otherProps.className
              )}
              defaultValue={otherProps.defaultValue}
              {...field}
              onChange={(e) => handleChange(e, field)}
            />
          </FormControl>
          {description && <Text className="text-2xs">{description}</Text>}
          <FormMessage className="text-xs text-red-500" />
        </View>
      )}
    />
  );
};

export default FormTextField;
