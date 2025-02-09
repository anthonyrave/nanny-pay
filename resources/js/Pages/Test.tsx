import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Test() {
  return (
    <AuthenticatedLayout>
      <Head title="test" />
      <p>test</p>
    </AuthenticatedLayout>
  );
}
