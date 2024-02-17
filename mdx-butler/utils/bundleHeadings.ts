import { bundleHeading } from './bundleHeading';
import { DocHeading } from '../types';

export async function bundleHeadings(headings: DocHeading[]) {
  return Promise.all(headings.map(bundleHeading));
}