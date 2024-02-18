import { bundleHeading } from './bundleHeading.js';
import { DocHeading } from '../types/index.js';

export const bundleHeadings = async (headings: DocHeading[]) =>
  Promise.all(headings.map(bundleHeading));
