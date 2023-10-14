"use client";

import { useEffect, useState } from "react";
import { validateSession } from "./actions";

export default function Chat() {
  const [validationResult, setValidationResult] = useState("");

  useEffect(() => {
    (async () => {
      const validationResult = await validateSession();
      setValidationResult(validationResult);
    })();
  }, []);

  return (
    <main>
      <h2>Chat page</h2>
      <div>Session validation result: {validationResult}</div>
    </main>
  );
}
