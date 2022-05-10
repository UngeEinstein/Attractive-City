import { useEffect, useState } from "react";

export function useIntro(pageName: string) {
  const [seen, setSeen] = useState<boolean>(false);
  useEffect(() => {
    let seenItems = JSON.parse(localStorage.getItem("introduction")!) || [];
    if (seenItems === true) {
      localStorage.removeItem("introduction");
    } else if (seenItems.indexOf(pageName) !== -1) {
      setSeen(true);
    } else {
      seenItems.push(pageName);
      localStorage.setItem("introduction", JSON.stringify(seenItems));
    }
  }, [pageName]);

  return seen;
}
