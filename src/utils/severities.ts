import type { SeveritiesOptions } from "../types/severities";
import { severities } from "../types/severities";

function getColorBySeverity(severity: SeveritiesOptions): string {
  return severities[severity];
}

export default getColorBySeverity;
