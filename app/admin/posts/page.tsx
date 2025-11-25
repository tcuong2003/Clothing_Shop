import { Suspense } from "react";
import PostPageContent from "./PostPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <PostPageContent />
    </Suspense>
  );
}
