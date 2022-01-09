import vision from '@google-cloud/vision';
import type { ImageAnnotatorClient } from '@google-cloud/vision';
import type { google } from '@google-cloud/vision/build/protos/protos';

import type { Request, Response } from '@sveltejs/kit';

type AnnotateImageRequest = google.cloud.vision.v1.IAnnotateImageRequest;

const visionClient: ImageAnnotatorClient = new vision.ImageAnnotatorClient();

export const visionRequest = async (request: Request): Promise<Response> => {
  const imageString = request.body;

  if (!imageString) {
    throw new Error('Request does not contain a body');
  }
  if (typeof imageString !== 'string') {
    throw new Error('Request body is not a string');
  }

  /*  Confidence scores for TEXT_DOCUMENTATION are not returned when configured as documented:
        https://cloud.google.com/vision/docs/reference/rest/v1/ImageContext#TextDetectionParams
        https://issuetracker.google.com/issues/200069044

      Replace `DOCUMENT_TEXT_DETECTION` and uncomment `imageContext` for more accurate results if behaviour is fixed
      Conflicts between type definitions and docs will also likely be resolved then, so `any` can be removed in `visionRes`
  */

  const annotateImageRequest: AnnotateImageRequest = {
    image: {
      content: imageString.split(',').pop(), // Strip leading 'data:xxx/xxx;base64,'
    },
    features: [
      { type: 'LABEL_DETECTION', maxResults: 10 },
      { type: 'OBJECT_LOCALIZATION', maxResults: 6 },
      { type: 'IMAGE_PROPERTIES', maxResults: 3 },
      { type: 'DOCUMENT_TEXT_DETECTION' },
    ],
    // imageContext: {
    //   textDetectionParams: {
    //     enableTextDetectionConfidenceScore: true,
    //   },
    // },
  };

  try {
    // `any`: Definition for annotateImage params does not match official docs and is typed above instead
    const visionRes = await visionClient.annotateImage(annotateImageRequest as any);

    if (!visionRes.length) {
      throw new Error('Vision API did not return a result');
    }

    return {
      status: 200,
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(visionRes),
    };
  } catch (error) {
    console.error(error);
  }
};
