export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (!text || text.trim() === "") return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation request failed");
    
    const data = await res.json();
    if (data && data[0]) {
      // Join multiple segments if the text is long
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data[0].map((segment: any) => segment[0]).join("").trim();
    }
    return text;
  } catch (error) {
    console.error(`Error translating to ${targetLanguage}:`, error);
    return text; // Fallback to original text
  }
}
