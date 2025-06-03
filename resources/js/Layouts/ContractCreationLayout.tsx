import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { PropsWithChildren, useRef } from "react";
import { ThemeProvider } from "@/Components/ThemeToggle";
import React from "react";

export default function Create({
  children,
  stepIndex,
  stepCount,
  prevStep,
}: PropsWithChildren & {
  stepIndex: number;
  stepCount: number;
  prevStep?: string;
}) {
  const submitContext = React.createContext({});

  const user = usePage<PageProps>().props.auth.user;

  const step = useRef<any>(null);

  const submit = (): void => {
    if (step.current) {
      step.current.submit();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Head title="Créer un nouveau contrat" />

      <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
        <submitContext.Provider value={{ step }}>
          <h1 className="text-3xl leading-tight text-foreground">
            Créer un nouveau contrat{" "}
            <span className="text-lg">
              ({stepIndex}/{stepCount})
            </span>
          </h1>

          <div className="mt-6 w-full overflow-hidden bg-card text-card-foreground px-6 py-4 max-w-xl shadow-md sm:rounded-lg">
            {children}
          </div>

          <div className="w-full max-w-xl mx-auto mt-6 flex justify-between">
            <div>
              {prevStep && (
                <Button asChild>
                  <a href={route(prevStep)}>Precedent</a>
                </Button>
              )}
            </div>
            <div>
              <Button onClick={submit}>Suivant</Button>
            </div>
          </div>
        </submitContext.Provider>
      </div>
    </ThemeProvider>
  );
}
