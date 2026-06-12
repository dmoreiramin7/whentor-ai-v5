import {
  Flame, Rocket, Apple, Spade, Crown, Feather,
  HeartPulse, Users, TrendingUp, Sparkles, Zap, Wallet, Briefcase,
  Brain, MessageCircleHeart, BookOpenText, Cross, Shield, Scroll, Mountain, Lightbulb, Swords, Landmark, Megaphone,
  Dumbbell, ChefHat, Salad, Scale, Star, Plane, Handshake, Gem, Venus, Mars, Stethoscope, FlaskConical,
  type LucideIcon,
} from "lucide-react";

import tonyAvatar from "@/assets/mentors/tony.png";
import elonAvatar from "@/assets/mentors/elon.png";
import steveAvatar from "@/assets/mentors/steve.png";
import harveyAvatar from "@/assets/mentors/harvey.png";
import trumpAvatar from "@/assets/mentors/trump.png";
import dalaiAvatar from "@/assets/mentors/dalai.png";
import jungAvatar from "@/assets/mentors/jung.png";
import estherAvatar from "@/assets/mentors/esther.png";
import freudAvatar from "@/assets/mentors/freud.png";
import jesusAvatar from "@/assets/mentors/jesus.png";
import marcusAvatar from "@/assets/mentors/marcus.png";
import senecaAvatar from "@/assets/mentors/seneca.png";
import epictetusAvatar from "@/assets/mentors/epictetus.png";
import socratesAvatar from "@/assets/mentors/socrates.png";
import caesarAvatar from "@/assets/mentors/caesar.png";
import augustusAvatar from "@/assets/mentors/augustus.png";
import ciceroAvatar from "@/assets/mentors/cicero.png";
import hubermanAvatar from "@/assets/mentors/huberman.png";
import jockoAvatar from "@/assets/mentors/jocko.png";
import gogginsAvatar from "@/assets/mentors/goggins.png";
import petersonAvatar from "@/assets/mentors/peterson.png";
import navalAvatar from "@/assets/mentors/naval.png";
import clearAvatar from "@/assets/mentors/clear.png";
import ferrissAvatar from "@/assets/mentors/ferriss.png";
import breneAvatar from "@/assets/mentors/brene.png";
import dispenzaAvatar from "@/assets/mentors/dispenza.png";
import sinekAvatar from "@/assets/mentors/sinek.png";

export type Mentor = {
  id: string;
  name: string;
  role: string;
  inspiredBy: string;
  emoji: string;
  icon: LucideIcon;
  avatar?: string;
  description: string;
  accentTopic: string;
  category: MentorCategory;
};

export type MentorCategory =
  | "Spirituality"
  | "Mental Health"
  | "Relationships"
  | "Mindset & Wisdom"
  | "Leadership & Power"
  | "Business & Career"
  | "Fitness & Body"
  | "Nutrition"
  | "Cooking"
  | "Finance"
  | "Startup"
  | "Marketing"
  | "Sales"
  | "Legal"
  | "Attraction"
  | "Horoscope"
  | "Travel";

export const mentors: Mentor[] = [
  { id: "christ", name: "Faith & Compassion", role: "Love, Forgiveness & Grace", inspiredBy: "Jesus Christ", emoji: "✝️", icon: Cross, avatar: jesusAvatar, description: "Walk in love. Forgive deeply. Lead with grace.", accentTopic: "Spirituality", category: "Spirituality" },
  { id: "spiritual", name: "Spiritual Mentor", role: "Inner Peace & Purpose", inspiredBy: "Dalai Lama", emoji: "🕊️", icon: Feather, avatar: dalaiAvatar, description: "Quiet the noise. Reconnect to what truly matters.", accentTopic: "Spirituality", category: "Spirituality" },

  { id: "psychologist", name: "Psychologist", role: "Mind & Meaning", inspiredBy: "Carl Jung", emoji: "🧠", icon: Brain, avatar: jungAvatar, description: "Understand your patterns. Integrate the shadow.", accentTopic: "Mental Health", category: "Mental Health" },
  { id: "psychoanalyst", name: "Psychoanalyst", role: "Depth & The Unconscious", inspiredBy: "Sigmund Freud", emoji: "📖", icon: BookOpenText, avatar: freudAvatar, description: "Listen beneath the words. Make the unconscious visible.", accentTopic: "Mental Health", category: "Mental Health" },
  { id: "therapist", name: "Therapist", role: "Healing & Emotion", inspiredBy: "Modern Clinical Practice", emoji: "🩺", icon: Stethoscope, description: "A space to feel, name, and move what's stuck.", accentTopic: "Mental Health", category: "Mental Health" },

  { id: "relationship", name: "Relationship Mentor", role: "Love & Connection", inspiredBy: "Esther Perel", emoji: "💞", icon: MessageCircleHeart, avatar: estherAvatar, description: "Hold complexity with care. Communicate honestly.", accentTopic: "Relationships", category: "Relationships" },
  { id: "mens-mentor", name: "Men's Mentor", role: "Confidence & Presence", inspiredBy: "Modern Masculinity", emoji: "♂️", icon: Mars, description: "Stand grounded. Lead with calm, magnetic presence.", accentTopic: "Attraction", category: "Attraction" },
  { id: "womens-mentor", name: "Women's Mentor", role: "Radiance & Self-Worth", inspiredBy: "Feminine Wisdom", emoji: "♀️", icon: Venus, description: "Own your worth. Attract through alignment, not effort.", accentTopic: "Attraction", category: "Attraction" },

  { id: "stoic-emperor", name: "Stoic Emperor", role: "Discipline & Duty", inspiredBy: "Marcus Aurelius", emoji: "🏛️", icon: Shield, avatar: marcusAvatar, description: "Master yourself first. Then the day cannot shake you.", accentTopic: "Mindset", category: "Mindset & Wisdom" },
  { id: "stoic-statesman", name: "Stoic Statesman", role: "Time & Virtue", inspiredBy: "Seneca", emoji: "📜", icon: Scroll, avatar: senecaAvatar, description: "Life is long enough if you stop wasting it.", accentTopic: "Mindset", category: "Mindset & Wisdom" },
  { id: "stoic-sage", name: "Stoic Sage", role: "Freedom Through Control", inspiredBy: "Epictetus", emoji: "⛰️", icon: Mountain, avatar: epictetusAvatar, description: "Some things are up to you. Most are not. Live there.", accentTopic: "Mindset", category: "Mindset & Wisdom" },
  { id: "philosopher", name: "Philosopher", role: "Question & Clarity", inspiredBy: "Socrates", emoji: "💡", icon: Lightbulb, avatar: socratesAvatar, description: "The unexamined life is not worth living. Let's examine yours.", accentTopic: "Wisdom", category: "Mindset & Wisdom" },
  { id: "mindset", name: "Mindset Coach", role: "Peak Performance", inspiredBy: "Tony Robbins", emoji: "🔥", icon: Flame, avatar: tonyAvatar, description: "Unleash relentless drive. Break patterns that hold you back.", accentTopic: "Mindset", category: "Mindset & Wisdom" },

  { id: "roman-general", name: "Roman General", role: "Decisive Action", inspiredBy: "Julius Caesar", emoji: "⚔️", icon: Swords, avatar: caesarAvatar, description: "Cross your Rubicon. Hesitation costs more than risk.", accentTopic: "Leadership", category: "Leadership & Power" },
  { id: "first-emperor", name: "First Emperor", role: "Strategy & Patience", inspiredBy: "Augustus Caesar", emoji: "🏛️", icon: Landmark, avatar: augustusAvatar, description: "Make haste slowly. Build what outlasts you.", accentTopic: "Leadership", category: "Leadership & Power" },
  { id: "orator", name: "Orator & Statesman", role: "Words That Move", inspiredBy: "Cicero", emoji: "🎙️", icon: Megaphone, avatar: ciceroAvatar, description: "Speak with reason. Persuade without force.", accentTopic: "Communication", category: "Leadership & Power" },
  { id: "negotiator", name: "Power & Negotiation", role: "Leverage", inspiredBy: "Harvey Specter", emoji: "♠️", icon: Spade, avatar: harveyAvatar, description: "Win the room before it begins. Move with quiet authority.", accentTopic: "Career", category: "Leadership & Power" },
  { id: "leader", name: "Leadership & Influence", role: "Command", inspiredBy: "Donald Trump", emoji: "🦅", icon: Crown, avatar: trumpAvatar, description: "Speak with conviction. Lead loud rooms with clarity.", accentTopic: "Leadership", category: "Leadership & Power" },

  { id: "visionary", name: "Business Mentor", role: "First Principles", inspiredBy: "Elon Musk", emoji: "🚀", icon: Rocket, avatar: elonAvatar, description: "Think from physics. Build the impossible from scratch.", accentTopic: "Business", category: "Business & Career" },
  { id: "innovation", name: "Innovation Mentor", role: "Design & Taste", inspiredBy: "Steve Jobs", emoji: "🍎", icon: Apple, avatar: steveAvatar, description: "Obsess over craft. Simplicity is the ultimate sophistication.", accentTopic: "Career", category: "Business & Career" },
  { id: "startup", name: "Startup Mentor", role: "0 → 1", inspiredBy: "Founders' Playbook", emoji: "🧪", icon: FlaskConical, description: "Find what doesn't exist yet. Ship it before you're ready.", accentTopic: "Startup", category: "Startup" },

  { id: "fitwell", name: "FitWell Coach", role: "Strength & Energy", inspiredBy: "Modern Performance", emoji: "🏋️", icon: Dumbbell, description: "Train with intent. The body leads the mind home.", accentTopic: "Fitness", category: "Fitness & Body" },
  { id: "nutrition", name: "Nutrition Mentor", role: "Eat to Live Well", inspiredBy: "Functional Nutrition", emoji: "🥗", icon: Salad, description: "Food is information. Choose what tells your body to thrive.", accentTopic: "Nutrition", category: "Nutrition" },
  { id: "chef", name: "Chef Mentor", role: "Cook With Soul", inspiredBy: "Culinary Masters", emoji: "👨‍🍳", icon: ChefHat, description: "Heat, salt, fat, acid — and presence. That's a meal.", accentTopic: "Cooking", category: "Cooking" },

  { id: "finance", name: "Financial Mentor", role: "Wealth With Wisdom", inspiredBy: "Modern Money Masters", emoji: "💰", icon: Wallet, description: "Spend less than you earn. Invest in what compounds.", accentTopic: "Finance", category: "Finance" },
  { id: "marketing", name: "Marketing Mentor", role: "Attention & Story", inspiredBy: "Brand Builders", emoji: "📣", icon: Megaphone, description: "Don't shout louder. Speak truer.", accentTopic: "Marketing", category: "Marketing" },
  { id: "sales", name: "Sales Mentor", role: "Close With Care", inspiredBy: "Top Closers", emoji: "🤝", icon: Handshake, description: "People buy clarity and trust. Bring both.", accentTopic: "Sales", category: "Sales" },
  { id: "legal", name: "Legal Mentor", role: "Rights & Strategy", inspiredBy: "Trial Lawyers", emoji: "⚖️", icon: Scale, description: "Read the fine print. Then write your own.", accentTopic: "Legal", category: "Legal" },

  { id: "horoscope", name: "Horoscope Mentor", role: "Stars & Cycles", inspiredBy: "Astrological Tradition", emoji: "✨", icon: Star, description: "The sky is a mirror. Read your season.", accentTopic: "Horoscope", category: "Horoscope" },
  { id: "travel", name: "Travel Mentor", role: "Go See It Yourself", inspiredBy: "World Explorers", emoji: "🌍", icon: Plane, description: "The best teacher is the road. Pack light.", accentTopic: "Travel", category: "Travel" },

  // Modern voices — today's biggest mentors for personal growth
  { id: "huberman", name: "Neuroscience Coach", role: "Brain, Body & Protocols", inspiredBy: "Andrew Huberman", emoji: "🧬", icon: FlaskConical, avatar: hubermanAvatar, description: "Sunlight, sleep, focus. Small protocols, lifelong gains.", accentTopic: "Performance", category: "Fitness & Body" },
  { id: "jocko", name: "Discipline Commander", role: "Extreme Ownership", inspiredBy: "Jocko Willink", emoji: "🛡️", icon: Shield, avatar: jockoAvatar, description: "Discipline equals freedom. Own everything. Move now.", accentTopic: "Discipline", category: "Mindset & Wisdom" },
  { id: "goggins", name: "Mental Toughness", role: "Stay Hard", inspiredBy: "David Goggins", emoji: "🔥", icon: Flame, avatar: gogginsAvatar, description: "Callous the mind. The only way out is through.", accentTopic: "Grit", category: "Mindset & Wisdom" },
  { id: "peterson", name: "Meaning & Order", role: "Rules for Life", inspiredBy: "Jordan Peterson", emoji: "📚", icon: BookOpenText, avatar: petersonAvatar, description: "Stand up straight. Tell the truth. Carry your weight.", accentTopic: "Meaning", category: "Mental Health" },
  { id: "naval", name: "Wealth & Wisdom", role: "Leverage & Clarity", inspiredBy: "Naval Ravikant", emoji: "💎", icon: Gem, avatar: navalAvatar, description: "Seek wealth, not money. Play long-term games with long-term people.", accentTopic: "Wisdom", category: "Mindset & Wisdom" },
  { id: "clear", name: "Habits Architect", role: "1% Better Daily", inspiredBy: "James Clear", emoji: "⚡", icon: Zap, avatar: clearAvatar, description: "You don't rise to goals. You fall to systems. Build better ones.", accentTopic: "Habits", category: "Mindset & Wisdom" },
  { id: "ferriss", name: "Life Optimizer", role: "Test, Tune, Repeat", inspiredBy: "Tim Ferriss", emoji: "🧪", icon: FlaskConical, avatar: ferrissAvatar, description: "Deconstruct anything. The 80/20 of a better life.", accentTopic: "Performance", category: "Mindset & Wisdom" },
  { id: "dispenza", name: "Mind-Body Healer", role: "Become Supernatural", inspiredBy: "Joe Dispenza", emoji: "🌌", icon: Sparkles, avatar: dispenzaAvatar, description: "Rewire thought, feeling, and biology. Become your future self.", accentTopic: "Healing", category: "Mental Health" },
  { id: "brene", name: "Courage & Vulnerability", role: "Daring Greatly", inspiredBy: "Brené Brown", emoji: "💗", icon: HeartPulse, avatar: breneAvatar, description: "Vulnerability is not weakness. It's the birthplace of courage.", accentTopic: "Courage", category: "Mental Health" },
  { id: "sinek", name: "Purpose & Why", role: "Start With Why", inspiredBy: "Simon Sinek", emoji: "🎯", icon: Lightbulb, avatar: sinekAvatar, description: "People don't buy what you do. They buy why you do it.", accentTopic: "Purpose", category: "Leadership & Power" },
];

export const mentorCategories: { id: MentorCategory; title: string; subtitle: string; emoji: string; icon: LucideIcon }[] = [
  { id: "Spirituality", title: "Spirituality", subtitle: "Walk in grace", emoji: "✝️", icon: Cross },
  { id: "Mental Health", title: "Mental Health", subtitle: "Heal & integrate", emoji: "🧠", icon: Brain },
  { id: "Relationships", title: "Relationships", subtitle: "Love with depth", emoji: "💞", icon: MessageCircleHeart },
  { id: "Attraction", title: "Attraction", subtitle: "Magnetic alignment", emoji: "💫", icon: Gem },
  { id: "Mindset & Wisdom", title: "Mindset", subtitle: "Stoic clarity", emoji: "🏛️", icon: Shield },
  { id: "Leadership & Power", title: "Leadership", subtitle: "Move people", emoji: "👑", icon: Crown },
  { id: "Business & Career", title: "Business", subtitle: "Build what lasts", emoji: "🚀", icon: Rocket },
  { id: "Startup", title: "Startup", subtitle: "0 to 1", emoji: "🧪", icon: FlaskConical },
  { id: "Marketing", title: "Marketing", subtitle: "Attention & story", emoji: "📣", icon: Megaphone },
  { id: "Sales", title: "Sales", subtitle: "Close with care", emoji: "🤝", icon: Handshake },
  { id: "Finance", title: "Finance", subtitle: "Wealth & wisdom", emoji: "💰", icon: Wallet },
  { id: "Legal", title: "Legal", subtitle: "Know your ground", emoji: "⚖️", icon: Scale },
  { id: "Fitness & Body", title: "Fitness", subtitle: "Strong body", emoji: "🏋️", icon: Dumbbell },
  { id: "Nutrition", title: "Nutrition", subtitle: "Eat to thrive", emoji: "🥗", icon: Salad },
  { id: "Cooking", title: "Cooking", subtitle: "Cook with soul", emoji: "👨‍🍳", icon: ChefHat },
  { id: "Horoscope", title: "Horoscope", subtitle: "Stars & cycles", emoji: "✨", icon: Star },
  { id: "Travel", title: "Travel", subtitle: "See the world", emoji: "🌍", icon: Plane },
];

export type LifeArea = {
  id: string;
  emoji: string;
  icon: LucideIcon;
  title: string;
  experts: string[];
  suggested: string;
  gradient: string;
};

export const lifeAreas: LifeArea[] = [
  { id: "mental", emoji: "❤️", icon: HeartPulse, title: "Emotional & Mental Health", experts: ["Psychologists", "Therapists", "Emotional intelligence"], suggested: "Why am I feeling overwhelmed lately?", gradient: "from-rose-500/20 to-transparent" },
  { id: "family", emoji: "👨‍👩‍👧", icon: Users, title: "Family & Relationships", experts: ["Relationship specialists"], suggested: "How do I improve communication?", gradient: "from-amber-500/20 to-transparent" },
  { id: "career", emoji: "🚀", icon: TrendingUp, title: "Career & Growth", experts: ["Coaches", "Mentors"], suggested: "Should I change jobs?", gradient: "from-sky-500/20 to-transparent" },
  { id: "spirit", emoji: "🙏", icon: Sparkles, title: "Spirituality & Purpose", experts: ["Guides"], suggested: "How do I find more peace?", gradient: "from-violet-500/20 to-transparent" },
  { id: "health", emoji: "⚡", icon: Zap, title: "Health & Energy", experts: ["Doctors", "Nutrition", "Fitness"], suggested: "How can I improve my sleep?", gradient: "from-emerald-500/20 to-transparent" },
  { id: "wealth", emoji: "💰", icon: Wallet, title: "Wealth & Financial Intelligence", experts: ["Advisors"], suggested: "How should I organize my finances?", gradient: "from-yellow-500/20 to-transparent" },
  { id: "business", emoji: "💼", icon: Briefcase, title: "Business & Entrepreneurship", experts: ["Founders", "Operators"], suggested: "How do I validate my startup?", gradient: "from-cyan-500/20 to-transparent" },
];

export const growthMap = [
  { label: "Mindset", value: 72 },
  { label: "Emotional Balance", value: 48 },
  { label: "Relationships", value: 58 },
  { label: "Family", value: 61 },
  { label: "Career", value: 81 },
  { label: "Spirituality", value: 43 },
  { label: "Fitness", value: 66 },
  { label: "Money", value: 55 },
];

export const community = [
  { id: "1", tag: "Trending", title: "People are discussing anxiety", excerpt: "How do I stop overthinking at night?", count: "2.4k exploring" },
  { id: "2", tag: "Most Saved", title: "Most saved insight this week", excerpt: "You don't need your whole life solved today. You need your next clear decision.", count: "8.1k saves" },
  { id: "3", tag: "New", title: "New mentor discovered", excerpt: "Faith & Purpose Guide just joined the ecosystem.", count: "Just released" },
  { id: "4", tag: "Topic", title: "Trending growth topic", excerpt: "Rebuilding discipline after burnout.", count: "1.2k sessions" },
];

export type CommunityPost = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  time: string;
  category: string;
  question: string;
  insight: string;
  mentorId: string;
  mentorName: string;
  likes: number;
  saves: number;
  replies: number;
  following: boolean;
  trending?: boolean;
};

export const communityPosts: CommunityPost[] = [
  { id: "p1", author: "Maya R.", handle: "@mayar", initials: "MR", time: "2h", category: "Mental Health", question: "How do I quiet my mind at 3 AM?", insight: "Stop fighting the thoughts. Name three things you can hear, then breathe out longer than you breathe in.", mentorId: "psychologist", mentorName: "Carl Jung", likes: 482, saves: 218, replies: 31, following: true, trending: true },
  { id: "p2", author: "Anonymous", handle: "—", initials: "AN", time: "5h", category: "Spirituality", question: "I feel disconnected from my faith. Where do I start?", insight: "Begin with one honest sentence. Spoken or whispered. Faith is not a performance, it's a return.", mentorId: "christ", mentorName: "Jesus Christ", likes: 1240, saves: 612, replies: 84, following: false, trending: true },
  { id: "p3", author: "Diogo M.", handle: "@diogom", initials: "DM", time: "Yesterday", category: "Mindset", question: "How do I stop procrastinating the work that matters?", insight: "You are not lazy. You are afraid. Do five minutes. The fear shrinks when the body moves.", mentorId: "stoic-emperor", mentorName: "Marcus Aurelius", likes: 318, saves: 142, replies: 22, following: true },
  { id: "p4", author: "Sofia L.", handle: "@sofial", initials: "SL", time: "1d", category: "Career", question: "Should I quit a comfortable job for something uncertain?", insight: "Comfort is a slow goodbye. List what you'd regret at 70. The answer is already in that list.", mentorId: "innovation", mentorName: "Steve Jobs", likes: 904, saves: 488, replies: 56, trending: true, following: false },
  { id: "p5", author: "Anonymous", handle: "—", initials: "AN", time: "2d", category: "Relationships", question: "We keep having the same fight. How do we break it?", insight: "Stop solving the topic. Start naming the feeling underneath. The fight is rarely about the dishes.", mentorId: "relationship", mentorName: "Esther Perel", likes: 671, saves: 305, replies: 42, following: true },
  { id: "p6", author: "Rafael T.", handle: "@rafa", initials: "RT", time: "3d", category: "Leadership", question: "How do I command a room without being loud?", insight: "Silence first. Eye contact. Then a sentence with no filler. Authority is what you don't say.", mentorId: "negotiator", mentorName: "Harvey Specter", likes: 552, saves: 233, replies: 28, following: false },
];


export const onboardingAreas = [
  { emoji: "🧠", label: "Mindset" },
  { emoji: "❤️", label: "Relationships" },
  { emoji: "👨‍👩‍👧", label: "Family" },
  { emoji: "🙏", label: "Spirituality" },
  { emoji: "💰", label: "Money" },
  { emoji: "🚀", label: "Career" },
  { emoji: "⚡", label: "Fitness" },
  { emoji: "😊", label: "Mental Health" },
  { emoji: "📈", label: "Business" },
  { emoji: "🎯", label: "Discipline" },
];

export const moods = ["Stressed", "Motivated", "Confused", "Anxious", "Focused", "Lost", "Inspired"];

export const pricing = [
  { tier: "Free", price: "$0", features: ["Limited text guidance", "Basic dashboard", "Community access"], cta: "Start Free" },
  { tier: "Plus", price: "$19", features: ["Unlimited text", "Memory & context", "Personal recommendations"], cta: "Choose Plus" },
  { tier: "Voice Premium", price: "$49", features: ["Voice experiences", "Premium signature sessions", "Call mode"], cta: "Go Premium", highlight: true },
  { tier: "Pro", price: "$99", features: ["Weekly growth reports", "Advanced personalization", "Mentor stacks"], cta: "Become Pro" },
];
