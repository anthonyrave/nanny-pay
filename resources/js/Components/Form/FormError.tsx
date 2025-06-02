import { PropsWithChildren } from "react";

export const FormError = ({
  children,
  value,
}: PropsWithChildren & { value?: string }) => {
  return <div className="text-sm text-destructive">{value ?? children}</div>;
};
