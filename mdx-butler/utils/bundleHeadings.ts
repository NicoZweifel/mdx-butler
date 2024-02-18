import { bundleHeading } from './bundleHeading.js';
import { DocHeading } from '../types/index.js';

export const bundleHeadings = (headings: DocHeading[]) =>
  Promise.all(headings.map(bundleHeading));
