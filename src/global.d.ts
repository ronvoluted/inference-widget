/// <reference types="@sveltejs/kit" />

import type { FeaturesMethod } from '@google-cloud/vision/build/src/helpers';

type LocalisedObject = {
  name: string;
  confidence: number;
  left: number;
  top: number;
  width: number;
  height: number;
  centre: {
    x: number;
    y: number;
  };
};

type Label = {
  description: string;
  confidence: number;
};

type Word = {
  word: string;
  confidence: number;
};

type TextBlock = {
  words: Word[];
  confidence: number;
};

type DominantColour = {
  colour: string;
  confidence: number;
};

type VisionResponse = Awaited<ReturnType<FeaturesMethod['annotateImage']>>;
