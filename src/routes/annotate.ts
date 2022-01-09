import { visionRequest } from '$lib/visionAPI';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = (request) => {
  return visionRequest(request);
};
