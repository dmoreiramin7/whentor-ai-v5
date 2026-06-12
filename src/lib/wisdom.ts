/**
 * WHENTOR AI V5 — Wisdom Feed
 * Timeless guidance from humanity's greatest minds.
 */

export type WisdomPost = {
  id: string;
  advisorId: string;
  advisorName: string;
  category: string;
  text: string;
  context?: string;
  saves: number;
  discussions: number;
  trending?: boolean;
  timeless?: boolean;
};

export const wisdomPosts: WisdomPost[] = [
  {
    id: "w1", advisorId: "christ", advisorName: "Jesus Christ", category: "Spirituality & Purpose",
    text: "Do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    context: "On anxiety and presence", saves: 48200, discussions: 3100, trending: true, timeless: true,
  },
  {
    id: "w2", advisorId: "marcus", advisorName: "Marcus Aurelius", category: "Spirituality & Purpose",
    text: "Waste no more time arguing about what a good man should be. Be one.",
    context: "Meditations, Book X", saves: 39500, discussions: 2400, trending: true, timeless: true,
  },
  {
    id: "w3", advisorId: "naval", advisorName: "Naval Ravikant", category: "Entrepreneurship & Business",
    text: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.",
    context: "How to Get Rich (without getting lucky)", saves: 35800, discussions: 4200, trending: true,
  },
  {
    id: "w4", advisorId: "frankl", advisorName: "Viktor Frankl", category: "Mental Health & Emotional Support",
    text: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    context: "Man's Search for Meaning", saves: 31200, discussions: 1800, timeless: true,
  },
  {
    id: "w5", advisorId: "goggins", advisorName: "David Goggins", category: "Health, Longevity & Performance",
    text: "You are in danger of living a life so comfortable and soft that you will die without ever realizing your true potential.",
    context: "Can't Hurt Me", saves: 28900, discussions: 3600, trending: true,
  },
  {
    id: "w6", advisorId: "solomon", advisorName: "King Solomon", category: "Spirituality & Purpose",
    text: "As iron sharpens iron, so one person sharpens another.",
    context: "Proverbs 27:17", saves: 26700, discussions: 1200, timeless: true,
  },
  {
    id: "w7", advisorId: "jobs", advisorName: "Steve Jobs", category: "Entrepreneurship & Business",
    text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking.",
    context: "Stanford Commencement, 2005", saves: 44100, discussions: 2900, timeless: true,
  },
  {
    id: "w8", advisorId: "jung", advisorName: "Carl Jung", category: "Mental Health & Emotional Support",
    text: "Everything that irritates us about others can lead us to an understanding of ourselves.",
    context: "On projection and the shadow", saves: 22400, discussions: 2100, trending: true,
  },
  {
    id: "w9", advisorId: "huberman", advisorName: "Andrew Huberman", category: "Health, Longevity & Performance",
    text: "View sunlight within 30–60 minutes of waking. It's the most powerful stimulus for wakefulness during the day and sleep at night. This is not a hack — it's how your biology is designed.",
    context: "Huberman Lab — Light & Circadian Rhythm", saves: 19800, discussions: 1500,
  },
  {
    id: "w10", advisorId: "buffett", advisorName: "Warren Buffett", category: "Entrepreneurship & Business",
    text: "Someone's sitting in the shade today because someone planted a tree a long time ago.",
    context: "On long-term thinking", saves: 18600, discussions: 900, timeless: true,
  },
  {
    id: "w11", advisorId: "tolle", advisorName: "Eckhart Tolle", category: "Mental Health & Emotional Support",
    text: "Worry pretends to be necessary but serves no useful purpose. Realize deeply that the present moment is all you ever have.",
    context: "The Power of Now", saves: 17900, discussions: 1100, timeless: true,
  },
  {
    id: "w12", advisorId: "hormozi", advisorName: "Alex Hormozi", category: "Entrepreneurship & Business",
    text: "You don't become confident by shouting affirmations in the mirror, but by having a stack of undeniable proof that you are who you say you are. Outwork your self-doubt.",
    context: "On confidence", saves: 16300, discussions: 2700, trending: true,
  },
  {
    id: "w13", advisorId: "joseph", advisorName: "Joseph of Egypt", category: "Spirituality & Purpose",
    text: "The pit was not the end of the story. Neither was the prison. What was meant for evil, God meant for good — to bring about that many lives be saved.",
    context: "Genesis 50:20", saves: 15800, discussions: 800, timeless: true,
  },
  {
    id: "w14", advisorId: "attia", advisorName: "Peter Attia", category: "Health, Longevity & Performance",
    text: "Exercise is the most potent longevity drug we have. Nothing else comes close — not metformin, not rapamycin, nothing. And it's free.",
    context: "Outlive", saves: 14200, discussions: 1300,
  },
  {
    id: "w15", advisorId: "thiel", advisorName: "Peter Thiel", category: "Entrepreneurship & Business",
    text: "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
    context: "Zero to One", saves: 13700, discussions: 1900,
  },
  {
    id: "w16", advisorId: "seneca", advisorName: "Seneca", category: "Spirituality & Purpose",
    text: "We suffer more often in imagination than in reality.",
    context: "Letters from a Stoic", saves: 33100, discussions: 1600, timeless: true, trending: true,
  },
  {
    id: "w17", advisorId: "brene", advisorName: "Brené Brown", category: "Mental Health & Emotional Support",
    text: "Vulnerability is not winning or losing; it's having the courage to show up and be seen when we have no control over the outcome.",
    context: "Daring Greatly", saves: 12900, discussions: 1000,
  },
  {
    id: "w18", advisorId: "arnold", advisorName: "Arnold Schwarzenegger", category: "Health, Longevity & Performance",
    text: "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.",
    context: "Pumping Iron", saves: 11400, discussions: 700, timeless: true,
  },
  {
    id: "w19", advisorId: "altman", advisorName: "Sam Altman", category: "Entrepreneurship & Business",
    text: "The days are long but the decades are short. Don't spend your time on things you don't care about.",
    context: "Blog — The Days Are Long", saves: 10800, discussions: 1400, trending: true,
  },
  {
    id: "w20", advisorId: "epictetus", advisorName: "Epictetus", category: "Spirituality & Purpose",
    text: "It's not what happens to you, but how you react to it that matters.",
    context: "The Enchiridion", saves: 29800, discussions: 1700, timeless: true,
  },
];

export function getForYou(topAreas: string[]): WisdomPost[] {
  // Personalized: prioritize posts from user's growth areas, then by saves
  const areaMap: Record<string, string> = {
    spirituality: "Spirituality & Purpose",
    mental_health: "Mental Health & Emotional Support",
    fitness: "Health, Longevity & Performance",
    business: "Entrepreneurship & Business",
    leadership: "Entrepreneurship & Business",
    personal_growth: "Spirituality & Purpose",
    relationships: "Mental Health & Emotional Support",
    finance: "Entrepreneurship & Business",
  };
  const preferred = topAreas.map((a) => areaMap[a]).filter(Boolean);
  return [...wisdomPosts].sort((a, b) => {
    const aPref = preferred.includes(a.category) ? 1 : 0;
    const bPref = preferred.includes(b.category) ? 1 : 0;
    if (aPref !== bPref) return bPref - aPref;
    return b.saves - a.saves;
  });
}

export function getTrending(): WisdomPost[] {
  return wisdomPosts.filter((p) => p.trending).sort((a, b) => b.discussions - a.discussions);
}

export function getTimeless(): WisdomPost[] {
  return wisdomPosts.filter((p) => p.timeless).sort((a, b) => b.saves - a.saves);
}

export function getByAdvisors(advisorIds: string[]): WisdomPost[] {
  return wisdomPosts.filter((p) => advisorIds.includes(p.advisorId));
}
