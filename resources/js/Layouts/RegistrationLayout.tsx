import { ThemeProvider } from "@/Components/ThemeToggle";
import { PropsWithChildren } from "react";

export default function Registration({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
        {children}
      </div>
    </ThemeProvider>
  );
}
