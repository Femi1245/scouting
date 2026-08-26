export type ReplyClass =
  | "Interested"
  | "Very Interested"
  | "Question"
  | "Request for pricing"
  | "Not now"
  | "Not interested"
  | "Unsubscribe"
  | "Out of office"
  | "Wrong person"
  | "Referral"
  | "Spam"
  | "Unknown"
  | "Needs Human Review";

export function classifyReply(body: string): {
  classification: ReplyClass;
  confidence: number;
} {
  const text = body.toLowerCase();
  if (/unsubscribe|stop emailing|remove me/.test(text)) {
    return { classification: "Unsubscribe", confidence: 0.95 };
  }
  if (/out of office|away until|on leave/.test(text)) {
    return { classification: "Out of office", confidence: 0.9 };
  }
  if (/not interested|no thanks|please don't/.test(text)) {
    return { classification: "Not interested", confidence: 0.88 };
  }
  if (/interested|happy to talk|let's chat|book a call/.test(text)) {
    return { classification: "Interested", confidence: 0.85 };
  }
  if (/\?|how much|pricing|cost/.test(text)) {
    return { classification: "Question", confidence: 0.75 };
  }
  return { classification: "Needs Human Review", confidence: 0.4 };
}
