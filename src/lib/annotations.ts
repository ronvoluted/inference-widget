import type { DominantColour, Label, LocalisedObject, TextBlock, Word } from 'src/global';
import type { google } from '@google-cloud/vision/build/protos/protos';

type ImagePropertiesAnnotation = google.cloud.vision.v1.AnnotateImageResponse['imagePropertiesAnnotation'];
type LocalizedObjectAnnotation = google.cloud.vision.v1.AnnotateImageResponse['localizedObjectAnnotations'];
type FullTextAnnotation = google.cloud.vision.v1.AnnotateImageResponse['fullTextAnnotation'];
type LabelAnnotations = google.cloud.vision.v1.AnnotateImageResponse['labelAnnotations'];
type RGB = { red: number; green: number; blue: number; alpha?: number };

/**
 * Parse object localisation response into array with centre-origin-based bounding boxes
 */
export const parseObjectAnnotations = (annotations: LocalizedObjectAnnotation, threshold = 0.7): LocalisedObject[] => {
  const parsedAnnotations = annotations.reduce((objects: LocalisedObject[], object) => {
    if (!object || !object.score || object.score < threshold) {
      return objects;
    }

    if (!object.boundingPoly) return objects;

    const vertices = object.boundingPoly.normalizedVertices;

    if (
      !object.name ||
      !vertices?.length ||
      !vertices[0].x ||
      !vertices[0].y ||
      !vertices[1].x ||
      !vertices[1].y ||
      !vertices[2].y
    ) {
      return objects;
    }

    objects.push({
      name: object.name,
      confidence: object.score,
      left: vertices[0].x,
      top: vertices[0].y,
      width: vertices[1].x - vertices[0].x,
      height: vertices[2].y - vertices[0].y,
      centre: {
        x: (vertices[1].x + vertices[0].x) / 2,
        y: (vertices[2].y + vertices[1].y) / 2,
      },
    });

    return objects;
  }, []);

  return parsedAnnotations.sort((curr, next) => (curr.confidence > next.confidence ? -1 : 1));
};

/**
 * Parse label annotations, allowing filtering by confidence threshold
 */
export const parseLabelAnnotations = (annotations: LabelAnnotations | undefined, threshold = 0.5): Label[] => {
  if (!annotations?.length) {
    return [];
  }

  return annotations.reduce((labels: Label[], label) => {
    if (!label.score || label.score < threshold) {
      return labels;
    }

    labels.push({
      description: label.description as string,
      confidence: label.score as number,
    });

    return labels;
  }, []);
};

/**
 * Map heavily-nested text annotation tree to array of only text block strings and confidence scores
 */
const mapBlocks = (annotation: FullTextAnnotation): TextBlock[] => {
  if (!annotation?.pages?.length || !annotation.pages[0].blocks?.length) {
    return [];
  }

  const annotationBlocks = annotation?.pages[0]?.blocks;

  const blocks = annotationBlocks.map((block) => {
    if (!block.paragraphs?.length) return [];

    const paragraph = block.paragraphs[0];

    if (!paragraph.words?.length) return [];

    const words = paragraph.words.map((word) => {
      if (!word.symbols?.length) return [];

      const joinedSymbols = word.symbols
        .map((symbol) => {
          return symbol.text;
        })
        .join('');

      return {
        word: joinedSymbols,
        confidence: word.confidence,
      };
    });

    return {
      words,
      confidence: block.confidence,
    };
  });

  return blocks as TextBlock[];
};

/**
 * Filter text blocks by confidence threshold at both block-level and word-level
 */
const filterBlocks = (blocks: TextBlock[], threshold: number): TextBlock[] => {
  return blocks.reduce((filteredBlocks: TextBlock[], block) => {
    if (block.confidence < threshold) {
      return filteredBlocks;
    }

    filteredBlocks.push({
      words: block.words.filter((word: Word) => word.confidence >= threshold),
      confidence: block.confidence,
    });

    return filteredBlocks;
  }, []);
};

/**
 * Parse large text annotation response into array of strings, filtered by confidence threshold
 */
export const parseTextAnnotations = (annotations: FullTextAnnotation, threshold = 0.5): string[] => {
  if (!annotations?.pages?.length) {
    return [];
  }

  const mappedBlocks = mapBlocks(annotations);
  const filteredBlocks = filterBlocks(mappedBlocks, threshold);
  const wordJoinedBlocks = filteredBlocks.map((block) => block.words.map((word) => word.word).join(' '));

  return wordJoinedBlocks;
};

const rgbToCSS = ({ red, green, blue }: { red: number; green: number; blue: number }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

/**
 * Parse image properties response into array of most dominant colours, sorted by confidence
 */
export const parsePropertyAnnotations = (annotations: ImagePropertiesAnnotation): DominantColour[] => {
  if (!annotations?.dominantColors) return [];

  const colours = annotations.dominantColors.colors;

  if (!colours) return [];

  const mappedColours = colours.map((colour): DominantColour => {
    if (typeof colour.score !== 'number') {
      colour.score = 0;
    }

    return {
      colour: rgbToCSS(colour.color as RGB),
      confidence: colour.score,
    };
  });

  const sortedColours = mappedColours.sort((current, next) => {
    return (current.confidence as number) > (next.confidence as number) ? -1 : 1;
  });

  return sortedColours ? sortedColours : [];
};
