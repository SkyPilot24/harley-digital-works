import React from "react";
import { BeforeAfterComparison } from "./BeforeAfterComparison";

export { BeforeAfterComparison };

export function BeforeAfterSlider(props: React.ComponentProps<typeof BeforeAfterComparison>) {
  return <BeforeAfterComparison {...props} />;
}
