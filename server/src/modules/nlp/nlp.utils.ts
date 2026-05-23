export const classifyTopic = (text: string): string => {
    const categories: Record<string, string[]> = {
        Technology: [
            "ai",
            "openai",
            "google",
            "apple",
            "microsoft",
            "software",
            "technology",
            "coding",
            "startup",
            "developer"
        ],
        Health: [
            "health",
            "hospital",
            "doctor",
            "medicine",
            "medical",
            "cancer",
            "disease",
            "treatment"
        ],
        Politics: [
            "government",
            "minister",
            "president",
            "election",
            "policy",
            "parliament",
            "politics"
        ],
        Sports: [
            "cricket",
            "football",
            "soccer",
            "match",
            "olympics",
            "tournament",
            "sports"
        ],
        Crime: [
            "police",
            "attack",
            "knife",
            "murder",
            "arrest",
            "court",
            "investigation",
            "crime"
        ],
        Business: [
            "stock",
            "market",
            "company",
            "business",
            "finance",
            "startup",
            "economy"
        ]
    };
    const words = text.toLowerCase().split(/\s+/);
    let bestCategory = "General";
    let highestScore = 0;

    for (const [category, keywords] of Object.entries(categories)) {
        let score = 0;
        for (const word of words) {
            if (keywords.includes(word)) {
                score++;
            }
        }
        if (score > highestScore) {
            highestScore = score;
            bestCategory = category;
        }
    }
    return bestCategory;
};