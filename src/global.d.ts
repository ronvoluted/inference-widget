/// <reference types="@sveltejs/kit" />

type Coordinates = {
  x: number;
  y: number;
};

type Localisation = {
  description: string;
  centre: Coordinates;
  width: number;
  height: number;
};

type ImageDimensions = { width: number; height: number };
