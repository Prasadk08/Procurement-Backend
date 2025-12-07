const comparePrompt = (vendors) => `
You are an AI that MUST return only valid JSON.
No explanation.
No text outside JSON.
No markdown.
Only a pure JSON object.

Compare all vendors and score them (1–10):
- priceScore (lower price = higher score)
- deliveryScore (faster delivery = higher score)
- warrantyScore (more warranty months = higher score)
- overallScore (weighted average of the three: price 40%, delivery 30%, warranty 30%)
- summary (1 short sentence per vendor)

Vendors:
${JSON.stringify(vendors, null, 2)}

Your final output MUST be a single JSON object in the format:

{
  "comparisons": [
    {
      "vendor": "",
      "priceScore": 0,
      "deliveryScore": 0,
      "warrantyScore": 0,
      "overallScore": 0,
      "summary": ""
    }
  ],
  "bestVendor": {
    "vendor": "",
    "reason": "3–4 lines clearly explaining why this vendor is the best choice. The reason must be specific, based on actual score differences, and mention price, delivery, and warranty. Avoid generic statements like 'AI evaluated multiple factors'."
  }
}

STRICT RULES:
- The 'bestVendor' must be the one with the highest overallScore.
- The ‘reason’ MUST be specific and detailed.
- DO NOT use generic phrases like:
  - "AI evaluated multiple factors"
  - "Based on the analysis"
  - "According to the data"
- The reason must highlight EXACT advantages (e.g., "lowest price", "fastest delivery", "longest warranty") with the vendor’s name.
- The entire response MUST be valid JSON only.
`;

export default comparePrompt;
