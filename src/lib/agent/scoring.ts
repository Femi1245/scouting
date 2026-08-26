export type ScoreBreakdown = {
  serviceMatch: number;
  problemSeverity: number;
  businessFit: number;
  evidenceConfidence: number;
  contactability: number;
  potentialValue: number;
};

export function computeOpportunityScore(parts: ScoreBreakdown): {
  score: number;
  breakdown: ScoreBreakdown;
  explanation: string;
} {
  const weights = {
    serviceMatch: 0.25,
    problemSeverity: 0.2,
    businessFit: 0.2,
    evidenceConfidence: 0.15,
    contactability: 0.1,
    potentialValue: 0.1,
  };

  const score = Math.round(
    parts.serviceMatch * weights.serviceMatch +
      parts.problemSeverity * weights.problemSeverity +
      parts.businessFit * weights.businessFit +
      parts.evidenceConfidence * weights.evidenceConfidence +
      parts.contactability * weights.contactability +
      parts.potentialValue * weights.potentialValue,
  );

  const explanation = `${score} because service match is strong (${parts.serviceMatch}), detected problems look relevant (${parts.problemSeverity}), and evidence confidence is ${parts.evidenceConfidence}. This is an AI Opportunity Score — directional, not exact.`;

  return { score, breakdown: parts, explanation };
}
