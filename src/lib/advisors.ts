/**
 * WHENTOR AI V5 — Advisor Roster
 * "Intelligent Guidance Infrastructure"
 *
 * Four pillars of guidance. Every advisor is a distinct person
 * with a voice, a worldview, and a way of seeing you.
 */

import {
  Cross, Feather, Crown, Shield, Scroll, Mountain, Brain, BookOpenText,
  Heart, Sun, FlaskConical, Stethoscope, Dumbbell, Flame, Activity,
  Rocket, Apple, Landmark, Gem, Cpu, Sparkles, Network, Lightbulb,
  TrendingUp, Megaphone, Zap, Briefcase, HeartPulse,
  type LucideIcon,
} from "lucide-react";

// V4 avatars we keep
import jesusAvatar from "@/assets/mentors/jesus.png";
import marcusAvatar from "@/assets/mentors/marcus.png";
import epictetusAvatar from "@/assets/mentors/epictetus.png";
import senecaAvatar from "@/assets/mentors/seneca.png";
import dalaiAvatar from "@/assets/mentors/dalai.png";
import jungAvatar from "@/assets/mentors/jung.png";
import breneAvatar from "@/assets/mentors/brene.png";
import hubermanAvatar from "@/assets/mentors/huberman.png";
import gogginsAvatar from "@/assets/mentors/goggins.png";
import tonyAvatar from "@/assets/mentors/tony.png";
import elonAvatar from "@/assets/mentors/elon.png";
import steveAvatar from "@/assets/mentors/steve.png";
import navalAvatar from "@/assets/mentors/naval.png";

// V5 generated flat-illustration avatars
import josephAvatar from "@/assets/advisors/joseph.svg";
import solomonAvatar from "@/assets/advisors/solomon.svg";
import franklAvatar from "@/assets/advisors/frankl.svg";
import tolleAvatar from "@/assets/advisors/tolle.svg";
import bryanAvatar from "@/assets/advisors/bryan-johnson.svg";
import arnoldAvatar from "@/assets/advisors/arnold.svg";
import attiaAvatar from "@/assets/advisors/attia.svg";
import buffettAvatar from "@/assets/advisors/buffett.svg";
import altmanAvatar from "@/assets/advisors/altman.svg";
import jensenAvatar from "@/assets/advisors/jensen.svg";
import zuckAvatar from "@/assets/advisors/zuck.svg";
import pgAvatar from "@/assets/advisors/pg.svg";
import andreessenAvatar from "@/assets/advisors/andreessen.svg";
import thielAvatar from "@/assets/advisors/thiel.svg";
import hoffmanAvatar from "@/assets/advisors/hoffman.svg";
import hormoziAvatar from "@/assets/advisors/hormozi.svg";
import garyvAvatar from "@/assets/advisors/garyv.svg";

export type AdvisorCategory =
  | "Spirituality & Purpose"
  | "Mental Health & Emotional Support"
  | "Health, Longevity & Performance"
  | "Entrepreneurship & Business";

export type Advisor = {
  id: string;
  name: string;            // real person or persona name
  title: string;           // their guidance role
  category: AdvisorCategory;
  icon: LucideIcon;
  avatar?: string;
  bio: string;
  topics: string[];
  books: string[];
  essence: string;         // one-line wisdom
  followers: string;       // social proof
};

export const CATEGORY_META: Record<AdvisorCategory, { emoji: string; icon: LucideIcon; tagline: string; slug: string }> = {
  "Spirituality & Purpose":             { emoji: "✨", icon: Sparkles,   tagline: "Find meaning. Walk with wisdom.",      slug: "spirituality" },
  "Mental Health & Emotional Support":  { emoji: "🧠", icon: Brain,      tagline: "Understand yourself. Heal deeply.",    slug: "mental-health" },
  "Health, Longevity & Performance":    { emoji: "⚡", icon: HeartPulse, tagline: "Build the body. Master the mind.",     slug: "health" },
  "Entrepreneurship & Business":        { emoji: "🚀", icon: Rocket,     tagline: "Create value. Build the future.",      slug: "business" },
};

export const advisors: Advisor[] = [
  // ── SPIRITUALITY & PURPOSE ──────────────────────────────────────────────────
  {
    id: "christ", name: "Jesus Christ", title: "Faith, Love & Forgiveness",
    category: "Spirituality & Purpose", icon: Cross, avatar: jesusAvatar,
    bio: "The greatest teacher of love, forgiveness, and grace humanity has known. Walks beside you in every season — joy, doubt, and darkness alike.",
    topics: ["Faith", "Forgiveness", "Purpose", "Love", "Inner Peace"],
    books: ["The Gospels", "The Sermon on the Mount"],
    essence: "Come to me, all who are weary, and I will give you rest.",
    followers: "2.4B",
  },
  {
    id: "joseph", name: "Joseph of Egypt", title: "Vision Through Adversity",
    category: "Spirituality & Purpose", icon: Sun, avatar: josephAvatar,
    bio: "From the pit to the palace. Betrayed, enslaved, imprisoned — and rose to save nations. The mentor for anyone whose dream is being tested.",
    topics: ["Resilience", "Dreams & Vision", "Integrity", "Patience", "Leadership"],
    books: ["Genesis 37–50"],
    essence: "What was meant for evil, God meant for good.",
    followers: "890M",
  },
  {
    id: "solomon", name: "King Solomon", title: "Wisdom & Discernment",
    category: "Spirituality & Purpose", icon: Crown, avatar: solomonAvatar,
    bio: "The wisest king who ever lived. Asked not for riches or power — but for an understanding heart. Master of decisions, relationships, and wealth.",
    topics: ["Wisdom", "Decision-Making", "Wealth", "Relationships", "Legacy"],
    books: ["Proverbs", "Ecclesiastes", "Song of Songs"],
    essence: "Wisdom is the principal thing; therefore get wisdom.",
    followers: "1.1B",
  },
  {
    id: "marcus", name: "Marcus Aurelius", title: "Stoic Emperor",
    category: "Spirituality & Purpose", icon: Shield, avatar: marcusAvatar,
    bio: "Emperor of Rome and servant of philosophy. Wrote private notes on how to be good under pressure — they became the greatest manual on self-mastery.",
    topics: ["Stoicism", "Discipline", "Duty", "Mortality", "Self-Mastery"],
    books: ["Meditations"],
    essence: "You have power over your mind — not outside events.",
    followers: "340M",
  },
  {
    id: "epictetus", name: "Epictetus", title: "Freedom Through Control",
    category: "Spirituality & Purpose", icon: Mountain, avatar: epictetusAvatar,
    bio: "Born a slave, became the freest man in Rome. Taught that freedom begins the moment you stop demanding the world obey you.",
    topics: ["Control", "Freedom", "Acceptance", "Resilience"],
    books: ["The Enchiridion", "Discourses"],
    essence: "Some things are up to us. Most are not. Live there.",
    followers: "120M",
  },
  {
    id: "seneca", name: "Seneca", title: "Time & Virtue",
    category: "Spirituality & Purpose", icon: Scroll, avatar: senecaAvatar,
    bio: "Statesman, playwright, and the most practical of the Stoics. On time, anger, grief, and wealth — his letters read like they were written this morning.",
    topics: ["Time", "Anger", "Grief", "Wealth", "Friendship"],
    books: ["Letters from a Stoic", "On the Shortness of Life"],
    essence: "Life is long enough, if you know how to use it.",
    followers: "180M",
  },
  {
    id: "spiritual-mentor", name: "Spiritual Mentor", title: "Inner Peace & Presence",
    category: "Spirituality & Purpose", icon: Feather, avatar: dalaiAvatar,
    bio: "A gentle guide for the soul. Meditation, surrender, gratitude, and the quiet art of being present in a loud world.",
    topics: ["Meditation", "Presence", "Gratitude", "Surrender"],
    books: ["The Art of Happiness", "The Power of Now"],
    essence: "Quiet the noise. What remains is you.",
    followers: "95M",
  },

  // ── MENTAL HEALTH & EMOTIONAL SUPPORT ───────────────────────────────────────
  {
    id: "jung", name: "Carl Jung", title: "Depth Psychology",
    category: "Mental Health & Emotional Support", icon: Brain, avatar: jungAvatar,
    bio: "Founder of analytical psychology. Mapped the shadow, the archetypes, and the path of individuation — becoming who you truly are.",
    topics: ["The Shadow", "Dreams", "Archetypes", "Individuation", "The Unconscious"],
    books: ["Man and His Symbols", "Memories, Dreams, Reflections", "The Red Book"],
    essence: "Until you make the unconscious conscious, it will direct your life.",
    followers: "210M",
  },
  {
    id: "frankl", name: "Viktor Frankl", title: "Meaning in Suffering",
    category: "Mental Health & Emotional Support", icon: Lightbulb, avatar: franklAvatar,
    bio: "Survived Auschwitz and emerged with the deepest insight in psychology: those who have a 'why' can bear almost any 'how'. Founder of logotherapy.",
    topics: ["Meaning", "Suffering", "Hope", "Purpose", "Resilience"],
    books: ["Man's Search for Meaning", "The Will to Meaning"],
    essence: "Between stimulus and response there is a space. In that space is our freedom.",
    followers: "160M",
  },
  {
    id: "brene", name: "Brené Brown", title: "Vulnerability & Courage",
    category: "Mental Health & Emotional Support", icon: Heart, avatar: breneAvatar,
    bio: "Research professor who spent two decades studying courage, vulnerability, shame, and empathy. Made being human feel brave again.",
    topics: ["Vulnerability", "Shame", "Courage", "Belonging", "Empathy"],
    books: ["Daring Greatly", "Atlas of the Heart", "The Gifts of Imperfection"],
    essence: "Vulnerability is not weakness. It's our greatest measure of courage.",
    followers: "85M",
  },
  {
    id: "tolle", name: "Eckhart Tolle", title: "Presence & the Now",
    category: "Mental Health & Emotional Support", icon: Sun, avatar: tolleAvatar,
    bio: "Spiritual teacher whose awakening at 29 became a map for millions. The mind is a tool — you are the awareness behind it.",
    topics: ["Presence", "Ego", "Anxiety", "Awareness", "Stillness"],
    books: ["The Power of Now", "A New Earth"],
    essence: "Realize deeply that the present moment is all you ever have.",
    followers: "70M",
  },
  {
    id: "huberman-mind", name: "Andrew Huberman", title: "Neuroscience of Mind",
    category: "Mental Health & Emotional Support", icon: FlaskConical, avatar: hubermanAvatar,
    bio: "Stanford neuroscientist translating brain science into protocols. Anxiety, focus, dopamine, sleep — mechanisms first, then tools.",
    topics: ["Dopamine", "Stress", "Focus", "Sleep", "Neuroplasticity"],
    books: ["Huberman Lab Podcast", "Protocols (2025)"],
    essence: "Behavior first. Then chemistry. Your biology can be directed.",
    followers: "45M",
  },
  {
    id: "emotional-mentor", name: "Emotional Support Mentor", title: "A Safe Space, Always",
    category: "Mental Health & Emotional Support", icon: Stethoscope,
    bio: "Evidence-based, judgment-free support. When you need to be heard before you need to be helped — this is where you start.",
    topics: ["Anxiety", "Depression", "Healing", "Boundaries", "Self-Worth"],
    books: ["Modern Clinical Practice"],
    essence: "What you're feeling is valid. Let's hold it together.",
    followers: "30M",
  },

  // ── HEALTH, LONGEVITY & PERFORMANCE ─────────────────────────────────────────
  {
    id: "bryan-johnson", name: "Bryan Johnson", title: "Longevity Protocol",
    category: "Health, Longevity & Performance", icon: Activity, avatar: bryanAvatar,
    bio: "The man spending millions to reverse his biological age — and open-sourcing everything. Sleep, nutrition, and measurement as religion.",
    topics: ["Longevity", "Biomarkers", "Sleep", "Anti-Aging", "Protocols"],
    books: ["Blueprint Protocol", "Don't Die"],
    essence: "Don't die. Everything else is commentary.",
    followers: "12M",
  },
  {
    id: "goggins", name: "David Goggins", title: "Mental Toughness",
    category: "Health, Longevity & Performance", icon: Flame, avatar: gogginsAvatar,
    bio: "Navy SEAL, ultramarathoner, the hardest man alive. Turned a broken childhood into relentless discipline. You're at 40% when you think you're done.",
    topics: ["Discipline", "Suffering", "Accountability", "Running", "Callusing the Mind"],
    books: ["Can't Hurt Me", "Never Finished"],
    essence: "Stay hard. The mind quits long before the body.",
    followers: "25M",
  },
  {
    id: "huberman", name: "Andrew Huberman", title: "Performance Science",
    category: "Health, Longevity & Performance", icon: FlaskConical, avatar: hubermanAvatar,
    bio: "Stanford neuroscientist. Light, cold, heat, training, and breath as tools for physical excellence — every claim backed by mechanism.",
    topics: ["Training", "Recovery", "Cold Exposure", "Testosterone", "Endurance"],
    books: ["Huberman Lab Podcast"],
    essence: "The science is clear. Here's the protocol.",
    followers: "45M",
  },
  {
    id: "arnold", name: "Arnold Schwarzenegger", title: "Strength & Reinvention",
    category: "Health, Longevity & Performance", icon: Dumbbell, avatar: arnoldAvatar,
    bio: "7x Mr. Olympia, movie legend, governor. The blueprint for reinventing yourself decade after decade — built on iron and vision.",
    topics: ["Bodybuilding", "Vision", "Reinvention", "Work Ethic", "Fitness After 50"],
    books: ["Arnold's Encyclopedia of Bodybuilding", "Be Useful"],
    essence: "Strength does not come from winning. It comes from struggle.",
    followers: "60M",
  },
  {
    id: "tony", name: "Tony Robbins", title: "Peak Performance",
    category: "Health, Longevity & Performance", icon: Zap, avatar: tonyAvatar,
    bio: "The world's #1 performance coach for 40 years. State, story, strategy — change your physiology and you change your life.",
    topics: ["Energy", "State Control", "Breakthrough", "Habits", "Motivation"],
    books: ["Awaken the Giant Within", "Unlimited Power"],
    essence: "Where focus goes, energy flows.",
    followers: "50M",
  },
  {
    id: "attia", name: "Peter Attia", title: "Medicine 3.0",
    category: "Health, Longevity & Performance", icon: Stethoscope, avatar: attiaAvatar,
    bio: "Physician focused on the science of longevity. Outlive isn't about adding years to life — it's adding life to years. The centenarian decathlon.",
    topics: ["Longevity", "Zone 2", "Metabolic Health", "Strength", "Healthspan"],
    books: ["Outlive"],
    essence: "Train today for the last decade of your life.",
    followers: "8M",
  },
  {
    id: "health-mentor", name: "Health & Performance Mentor", title: "Your Daily Coach",
    category: "Health, Longevity & Performance", icon: HeartPulse,
    bio: "Personalized training, nutrition, and recovery guidance. Built on your goals, your schedule, your body.",
    topics: ["Training Plans", "Nutrition", "Recovery", "Habit Building"],
    books: ["Modern Performance Science"],
    essence: "Train with intent. The body leads the mind home.",
    followers: "15M",
  },

  // ── ENTREPRENEURSHIP & BUSINESS ─────────────────────────────────────────────
  {
    id: "elon", name: "Elon Musk", title: "First Principles",
    category: "Entrepreneurship & Business", icon: Rocket, avatar: elonAvatar,
    bio: "Tesla, SpaceX, Neuralink, xAI. Thinks from physics, not analogy. The most ambitious builder of our era.",
    topics: ["First Principles", "Engineering", "Scale", "Risk", "Mars"],
    books: ["Elon Musk (Isaacson)"],
    essence: "When something is important enough, you do it even if the odds are against you.",
    followers: "220M",
  },
  {
    id: "jobs", name: "Steve Jobs", title: "Design & Taste",
    category: "Entrepreneurship & Business", icon: Apple, avatar: steveAvatar,
    bio: "Apple's founder and the greatest product mind in history. Taste, focus, and the courage to say no to 1,000 things.",
    topics: ["Product", "Design", "Focus", "Storytelling", "Simplicity"],
    books: ["Steve Jobs (Isaacson)", "Make Something Wonderful"],
    essence: "Simplicity is the ultimate sophistication.",
    followers: "180M",
  },
  {
    id: "buffett", name: "Warren Buffett", title: "Value & Patience",
    category: "Entrepreneurship & Business", icon: Landmark, avatar: buffettAvatar,
    bio: "The Oracle of Omaha. 70 years of compounding — capital, knowledge, and reputation. The greatest investor who ever lived.",
    topics: ["Investing", "Compounding", "Patience", "Moats", "Integrity"],
    books: ["Berkshire Letters", "The Intelligent Investor (foreword)"],
    essence: "Be fearful when others are greedy, and greedy when others are fearful.",
    followers: "90M",
  },
  {
    id: "naval", name: "Naval Ravikant", title: "Wealth & Wisdom",
    category: "Entrepreneurship & Business", icon: Gem, avatar: navalAvatar,
    bio: "AngelList founder and Silicon Valley's philosopher. Specific knowledge, leverage, and the art of getting rich without getting lucky.",
    topics: ["Leverage", "Equity", "Judgment", "Happiness", "Reading"],
    books: ["The Almanack of Naval Ravikant"],
    essence: "Seek wealth, not money. Wealth is assets that earn while you sleep.",
    followers: "35M",
  },
  {
    id: "altman", name: "Sam Altman", title: "AI & Ambition",
    category: "Entrepreneurship & Business", icon: Cpu, avatar: altmanAvatar,
    bio: "OpenAI CEO, former YC president. Betting humanity's biggest chips on AGI. The playbook for ambition at civilizational scale.",
    topics: ["AI", "Startups", "Scaling", "Ambition", "The Future"],
    books: ["YC Essays", "The Intelligence Age"],
    essence: "The best way to predict the future is to build it.",
    followers: "28M",
  },
  {
    id: "jensen", name: "Jensen Huang", title: "Compute & Conviction",
    category: "Entrepreneurship & Business", icon: Cpu, avatar: jensenAvatar,
    bio: "NVIDIA founder. 30 years of conviction in accelerated computing before the world caught up. Pain and suffering as a feature, not a bug.",
    topics: ["Deep Tech", "Conviction", "Strategy", "AI Infrastructure"],
    books: ["NVIDIA Keynotes"],
    essence: "I hope suffering happens to you. Greatness comes from it.",
    followers: "15M",
  },
  {
    id: "zuck", name: "Mark Zuckerberg", title: "Scale & Speed",
    category: "Entrepreneurship & Business", icon: Network, avatar: zuckAvatar,
    bio: "Built the largest social network in history at 19. Move fast, think in decades, bet the company when it matters.",
    topics: ["Product Velocity", "Social", "Long-term Bets", "Talent"],
    books: ["Founder Letters"],
    essence: "The biggest risk is not taking any risk.",
    followers: "120M",
  },
  {
    id: "pg", name: "Paul Graham", title: "Startup Essays",
    category: "Entrepreneurship & Business", icon: BookOpenText, avatar: pgAvatar,
    bio: "YC co-founder whose essays are the startup canon. Make something people want — everything else is noise.",
    topics: ["Startups", "Writing", "Ideas", "Determination"],
    books: ["Hackers & Painters", "PaulGraham.com Essays"],
    essence: "Make something people want.",
    followers: "10M",
  },
  {
    id: "andreessen", name: "Marc Andreessen", title: "Software Eats the World",
    category: "Entrepreneurship & Business", icon: TrendingUp, avatar: andreessenAvatar,
    bio: "Netscape founder, a16z co-founder. The techno-optimist case for building — software, AI, and American dynamism.",
    topics: ["Venture Capital", "Tech Trends", "Optimism", "Building"],
    books: ["The Techno-Optimist Manifesto"],
    essence: "Software is eating the world. Build accordingly.",
    followers: "12M",
  },
  {
    id: "thiel", name: "Peter Thiel", title: "Zero to One",
    category: "Entrepreneurship & Business", icon: Lightbulb, avatar: thielAvatar,
    bio: "PayPal co-founder, first Facebook investor. Competition is for losers — build a monopoly on something the world doesn't yet understand.",
    topics: ["Monopoly", "Secrets", "Contrarian Thinking", "Definite Optimism"],
    books: ["Zero to One"],
    essence: "What important truth do very few people agree with you on?",
    followers: "8M",
  },
  {
    id: "hoffman", name: "Reid Hoffman", title: "Blitzscaling & Networks",
    category: "Entrepreneurship & Business", icon: Network, avatar: hoffmanAvatar,
    bio: "LinkedIn founder, master of network effects and intelligent risk. Your network is your net worth — scale fast when it counts.",
    topics: ["Networks", "Blitzscaling", "Career Strategy", "AI"],
    books: ["Blitzscaling", "The Startup of You"],
    essence: "An entrepreneur jumps off a cliff and assembles the plane on the way down.",
    followers: "9M",
  },
  {
    id: "hormozi", name: "Alex Hormozi", title: "Offers & Acquisition",
    category: "Entrepreneurship & Business", icon: Megaphone, avatar: hormoziAvatar,
    bio: "From sleeping on a gym floor to $100M+ portfolio. Makes business brutally simple: make an offer so good people feel stupid saying no.",
    topics: ["Offers", "Sales", "Customer Acquisition", "Scaling"],
    books: ["$100M Offers", "$100M Leads"],
    essence: "You don't have a business problem. You have an offer problem.",
    followers: "18M",
  },
  {
    id: "garyv", name: "Gary Vaynerchuk", title: "Attention & Hustle",
    category: "Entrepreneurship & Business", icon: Megaphone, avatar: garyvAvatar,
    bio: "Built two $100M+ businesses on attention arbitrage. Day trading attention since before it was a thing. Kindness + candor.",
    topics: ["Social Media", "Branding", "Patience", "Self-Awareness"],
    books: ["Crush It!", "Day Trading Attention"],
    essence: "Macro patience, micro speed.",
    followers: "44M",
  },
  {
    id: "business-mentor", name: "Business Mentor", title: "Your Strategic Partner",
    category: "Entrepreneurship & Business", icon: Briefcase,
    bio: "Practical, personalized business guidance. Strategy, pricing, hiring, fundraising — whatever today's decision is, think it through together.",
    topics: ["Strategy", "Pricing", "Hiring", "Fundraising"],
    books: ["The Whentor Playbook"],
    essence: "Every business problem is a decision waiting to be made well.",
    followers: "20M",
  },
];

export function getAdvisor(id: string): Advisor | undefined {
  return advisors.find((a) => a.id === id);
}

export function getAdvisorsByCategory(cat: AdvisorCategory): Advisor[] {
  return advisors.filter((a) => a.category === cat);
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_META) as AdvisorCategory[];
