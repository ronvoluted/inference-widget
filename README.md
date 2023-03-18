# Inference Widget

Multi-task image inference widget using the Google Vision API. The stack is Svelte(Kit), TypeScript, Tailwind and Node.

Four image tasks are performed on the same input:

- Object detection
- Label classification
- Optical character recognition
- Dominant colour detection

Inference annotations are then presented/interacted with in multiple ways:

- Object bounding boxes on original image
- Isolated object images
- Dominant colours displayed
- Labels with highest confidence represented by size
- Text blocks with copy to clipboard function
- Threshold slider to filter inferences by confidence

## Google Application Credentials

A `GOOGLE_APPLICATION_CREDENTIALS.json` file containing a service account key needs to be provided at the root to authenticate Vision API requests.

## Installing and running

```bash
npm i
npm run build && npm run preview
```

## Deployment

The widget is currently deployed at [https://inference-widget.onrender.com/](https://inference-widget.onrender.com)

## Notes

### Mobile view

On small screens, viewing up to six detected object localisations could get cluttered. Instead of showing the bounding boxes up-front, objects are indicated by tappable nodes that will toggle them individually.

![Object localisation mobile view](https://github.com/ronvoluted/inference-widget/raw/main/docs/mobile-view.gif)

### Dominant colours

The colours surrounding object images in the "Inference output" pane represent the 3 most dominant colours in the image. This one sounded better in my head than it looked in practice 😅

### SvelteKit

This is a full-stack project instead of just front-end/a static Svelte site, because a separate cloud function would have been required to make authenticated API requests anyway. Managing these requests in SvelteKit endpoints made sense.
