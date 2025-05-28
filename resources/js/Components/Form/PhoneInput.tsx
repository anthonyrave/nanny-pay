import { Input } from "@/components/ui/input";
import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function PhoneInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    onChange = () => {},
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    onChange?: CallableFunction;
  },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, "");
    let formattedValue = "";

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }

    if (localRef.current) {
      localRef.current.value = formattedValue;
    }

    e.target.value = formattedValue;

    onChange(e);
  };

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <Input
      {...props}
      type="tel"
      className={className}
      ref={localRef}
      onChange={handleNumberInputChange}
    />
  );
});
