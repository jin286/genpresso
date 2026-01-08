import React, { memo } from "react";
import { Slider } from "../../ui/slider";
import type { CompositionWeights } from "./types";

interface WeightSlidersProps {
  weights: CompositionWeights;
  onUpdateWeights: (weights: Partial<CompositionWeights>) => void;
}

const WeightSlidersComponent: React.FC<WeightSlidersProps> = ({ weights, onUpdateWeights }) => {
  return null;
};

WeightSlidersComponent.displayName = "WeightSliders";

export const WeightSliders = memo(WeightSlidersComponent);
