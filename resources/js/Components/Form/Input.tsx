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

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return <Input {...props} type={type} className={className} ref={localRef} />;
});
