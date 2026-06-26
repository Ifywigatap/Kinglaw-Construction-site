import { useCallback, useState } from "react";

export default function useToggle(initial = false) {
  const [on, setOn] = useState(Boolean(initial));
  const toggle = useCallback(() => setOn((s) => !s), []);
  const set = useCallback((v) => setOn(Boolean(v)), []);
  return [on, toggle, set];
}
