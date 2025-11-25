import { Suspense } from "react";
import UsersContent from "./UsersContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersContent />
    </Suspense>
  );
}
