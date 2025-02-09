import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import SidebarLayout from "@/Layouts/SidebarLayout";
import UpdateAddressForm from "./Partials/UpdateAddressForm";

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <SidebarLayout>
      <Head title="Mon compte" />

      <div className="max-w-xl mx-auto">
        <UpdateProfileInformationForm
          mustVerifyEmail={mustVerifyEmail}
          status={status}
          className="mb-12"
        />

        <UpdateAddressForm className="mb-12" />

        <UpdatePasswordForm className="mb-12" />

        <DeleteUserForm className="mb-12" />
      </div>
    </SidebarLayout>
  );
}
