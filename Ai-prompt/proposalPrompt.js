const aiPrompt = (rfp) => `
Write a clean professional RFP invitation email using the exact data below.
DO NOT use placeholders like [Vendor Company Name], [Your Name], or bracketed fields.
DO NOT use markdown formatting or asterisks (*).
Use only clean plain text and proper formatting.

RFP Details:
- Title: ${rfp.title}
- Description: ${rfp.description}
- Budget: ${rfp.budget}
- Warranty: ${rfp.warrantyMonths} months

Items:
${rfp.items
  .map(item => `- ${item.name} (Qty: ${item.qty}) - ${item.specs}`)
  .join("\n")}
`;

export default aiPrompt