import { bundleHeading } from './bundleHeading.js';
import { DocHeading } from '../types/index.js';

export async function bundleHeadings(headings: DocHeading[]) {
  return Promise.all(headings.map(bundleHeading));
}
