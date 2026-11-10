"use client";

import { createContext, useContext, useState } from "react";
import { MotionConfig } from "motion/react";

export type Audience = "company" | "consultant";

const AudienceContext = createContext<{
  audience: Audience;
  setAudience: (a: Audience) => void;
}>({ audience: "company", setAudience: () => {} });

export const useAudience = () => useContext(AudienceContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<Audience>("company");
  return (
    <MotionConfig reducedMotion="user">
      <AudienceContext.Provider value={{ audience, setAudience }}>
        {children}
      </AudienceContext.Provider>
    </MotionConfig>
  );
}
