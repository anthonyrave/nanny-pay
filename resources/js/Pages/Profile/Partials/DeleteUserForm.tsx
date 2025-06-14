import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    clearErrors();
    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-foreground">
          Supprimer mon compte
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          En supprimant votre compte, toutes les données rattachées seront
          effacées.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>
        Supprimer mon compte
      </DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Êtes-vous sur de vouloir supprimer votre compte ?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            En supprimant votre compte, toutes les données rattachées seront
            effacées. Veuillez entrer votre mot de passe pour confirmer que vous
            souhaitez supprimer votre compte.
          </p>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Mot de passe"
              className="sr-only"
            />

            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="mt-1 block w-3/4"
              isFocused
              placeholder="Mot de passe"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>
              Supprimer mon compte
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
