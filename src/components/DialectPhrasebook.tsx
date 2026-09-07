"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Languages,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Search,
  CheckCircle,
  HelpCircle,
  Compass,
} from "lucide-react";
import { useToast } from "@/components/Toast";

export interface RegionDialect {
  id: string;
  region: string;
  dialectName: string;
  states: string;
  destinations: string[];
  bannerGradient: string;
  intro: string;
  ecoTaboos: {
    rule: string;
    context: string;
  }[];
  phrases: {
    category: "Greetings" | "Homestay & Food" | "Directions & Water" | "Eco & Respect";
    native: string;
    script: string;
    english: string;
    phonetic: string;
  }[];
}

export const dialectData: RegionDialect[] = [
  {
    id: "pahadi",
    region: "Himachal Pradesh",
    dialectName: "Kullvi & Pahadi",
    states: "Himachal Pradesh",
    destinations: ["Kasol", "Tirthan Valley", "Manali", "Jibhi", "Spiti"],
    bannerGradient: "from-amber-700 via-orange-800 to-amber-950",
    intro: "Spoken across the Parvati, Tirthan, and Beas valleys. Locals deeply appreciate travelers greeting elders and village Devta councils in the native tongue.",
    ecoTaboos: [
      {
        rule: "Never touch or step on Devta stones/temple walls in Malana or Shangarh.",
        context: "Village deities enforce strict isolation taboos. Fines exceeding ₹2,500 can be levied.",
      },
      {
        rule: "Do not wash shoes or clothes in natural mountain 'chashmas' (freshwater springs).",
        context: "Springs are holy drinking water sources for the downstream village.",
      },
      {
        rule: "Ask before photographing local weaver looms or village council meetings.",
        context: "Respect domestic boundaries and elderly artisans.",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "राम राम जी / नमस्ते",
        script: "Ram Ram Ji / Namaste",
        english: "Respectful universal greeting to village elders",
        phonetic: "Raam-Raam Jee",
      },
      {
        category: "Greetings",
        native: "तुसां के हाल चा?",
        script: "Tusan ke haal cha?",
        english: "How are you doing?",
        phonetic: "Too-saan kay haal chaa?",
      },
      {
        category: "Homestay & Food",
        native: "सिड्डू और मीठी चाय मिल सकदी?",
        script: "Siddu aur meethi chai mil sakdi?",
        english: "Can I get traditional steamed Siddu and hot tea?",
        phonetic: "Sid-doo aur mee-thee chai mil sak-dee?",
      },
      {
        category: "Directions & Water",
        native: "पीने का साफ़ पानी कित्थे है?",
        script: "Peene ka saaf paani kitthe hai?",
        english: "Where can I refill safe natural spring drinking water?",
        phonetic: "Pee-nay kaa saaf paa-nee kit-thay hai?",
      },
      {
        category: "Eco & Respect",
        native: "असां कूड़ा सारा नाल लैई जाणा।",
        script: "Asaan kooda saara naal laiyi jaana.",
        english: "We will pack out all our waste back to the town.",
        phonetic: "Ah-saan koo-daa saa-raa naal layee jaa-naa.",
      },
      {
        category: "Eco & Respect",
        native: "तुहाडा धन्यवाद, बहुत बड़िया लग्या।",
        script: "Tuhada dhanyavaad, bahut badiya lagya.",
        english: "Heartfelt thanks, staying in your village was wonderful.",
        phonetic: "Too-haa-daa dhan-ya-vaad, ba-hoot ba-di-yaa lag-yaa.",
      },
    ],
  },
  {
    id: "bhoti",
    region: "Ladakh & Zanskar",
    dialectName: "Ladakhi (Bhoti)",
    states: "Ladakh UT",
    destinations: ["Leh", "Nubra Valley", "Pangong Tso", "Zanskar", "Hanle"],
    bannerGradient: "from-blue-900 via-indigo-950 to-slate-950",
    intro: "Bhoti is a classical Tibetic language. The spirit of Ladakh is embodied in the word 'Julley'—a sacred word encompassing hello, thank you, and goodbye.",
    ecoTaboos: [
      {
        rule: "Always circumambulate Mani stones and Chortens in a clockwise direction.",
        context: "Walking counter-clockwise is considered deeply disrespectful to Buddhist philosophy.",
      },
      {
        rule: "Never throw plastic or organic waste into dry compost toilets.",
        context: "Traditional Ladakhi toilets produce vital organic manure for arid high-altitude agriculture.",
      },
      {
        rule: "Refrain from taking single-use plastic bottles near high-altitude sacred lakes like Pangong or Tso Moriri.",
        context: "Lakes are sacred bird sanctuaries (Black-necked Crane nesting grounds).",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "ཇུ་ལེགས་ (Julley!)",
        script: "Julley / Jullay",
        english: "Universal greeting: Hello, Welcome, and Thank You",
        phonetic: "Joo-lay!",
      },
      {
        category: "Greetings",
        native: "SKu-khams bzang-po yin-na?",
        script: "Khamzang yin-na?",
        english: "How are you? (Formal & Respectful)",
        phonetic: "Kham-zang yin-naa?",
      },
      {
        category: "Homestay & Food",
        native: "Gur-gur chai / Thukpa zhimpo rag!",
        script: "Thukpa zhimpo rag!",
        english: "The butter tea and handmade noodle soup is delicious!",
        phonetic: "Took-pa zhim-po rag!",
      },
      {
        category: "Directions & Water",
        native: "Chhu tsang-ma gane yod?",
        script: "Chhu tsang-ma gane yod?",
        english: "Where can I find boiled/potable Himalayan spring water?",
        phonetic: "Choo tsaang-maa gaa-nay yod?",
      },
      {
        category: "Eco & Respect",
        native: "Nga-tsos kooda spang-gos med.",
        script: "Nga-tsos kooda spang-gos med.",
        english: "We do not leave any trash behind in the valley.",
        phonetic: "Ngaa-tsos koo-daa spang-gos med.",
      },
      {
        category: "Eco & Respect",
        native: "Thu-che-che! (ཐུགས་རྗེ་ཆེ།)",
        script: "Thuk-je-che!",
        english: "Deep gratitude and blessings for your hospitality.",
        phonetic: "Took-jay-chay!",
      },
    ],
  },
  {
    id: "konkani",
    region: "Goa & Coastal Karnataka",
    dialectName: "Konkani",
    states: "Goa & Coastal Karnataka",
    destinations: ["Goa", "Gokarna", "Karwar", "Malvan"],
    bannerGradient: "from-emerald-800 via-teal-900 to-slate-950",
    intro: "The language of the Konkan coastline. Speaking even 2 words of Konkani instantly transforms you from a commercial tourist into an honored guest ('Susegad' mindful guest).",
    ecoTaboos: [
      {
        rule: "Do not discard glass beer bottles on rocky shores or turtle-nesting beaches (Morjim/Galgibaga).",
        context: "Olive Ridley turtles cannot nest in sands littered with micro-plastics and sharp glass.",
      },
      {
        rule: "No loud commercial speaker music near heritage churches and coastal fishing hamlets after 9 PM.",
        context: "Traditional fishing villages wake at 4:30 AM for dawn netting.",
      },
      {
        rule: "Respect holy cashew groves and ancestral temple ponds ('Tollem').",
        context: "Footwear must be taken off near village freshwater springs.",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "देव बरें करूं! (Dev borem korum)",
        script: "Dev borem korum!",
        english: "May God bless you (Universal greeting & deepest thanks)",
        phonetic: "Dayv bo-rem ko-room!",
      },
      {
        category: "Greetings",
        native: "तुमकां कशें आसा?",
        script: "Tumkam kashem asa?",
        english: "How are you? (Polite and warm)",
        phonetic: "Toom-kaam ka-shay aa-saa?",
      },
      {
        category: "Homestay & Food",
        native: "गोंयचें जेवण भोव रूचीक आसा!",
        script: "Goenchem jevonn bhou ruchik asa!",
        english: "The Goan fish curry and local rice is extraordinary!",
        phonetic: "Goin-chem jay-vonn bhow roo-cheek aa-saa!",
      },
      {
        category: "Directions & Water",
        native: "हांगा नितळ उदक मेळटलें?",
        script: "Haanga nital udak melhtolem?",
        english: "Is clean drinking water available here?",
        phonetic: "Haa-ngaa ni-tal oo-dak may-le-to-lem?",
      },
      {
        category: "Eco & Respect",
        native: "आमी समुद्रदेग निवळ दवरतले.",
        script: "Ami samudradeg nival dovor-tole.",
        english: "We promise to keep the beach clean and plastic-free.",
        phonetic: "Aa-mee sa-moo-dra-dayg ni-val do-vor-to-lay.",
      },
    ],
  },
  {
    id: "garhwali",
    region: "Uttarakhand (Devbhoomi)",
    dialectName: "Garhwali & Kumaoni",
    states: "Uttarakhand",
    destinations: ["Chopta", "Rishikesh", "Valley of Flowers", "Kedarnath", "Auli"],
    bannerGradient: "from-stone-800 via-amber-950 to-emerald-950",
    intro: "The language of the sacred Himalayan rivers and oak bugyals (alpine meadows). In Garhwal, forests are considered living manifestations of nature deities.",
    ecoTaboos: [
      {
        rule: "Walking with leather items or shoes onto sacred Bugyals (alpine meadows like Dayara, Tungnath).",
        context: "Meadows are protected pastures; tramping alpine vegetation off-trail causes soil erosion.",
      },
      {
        rule: "Plucking Brahma Kamal or rhododendron flowers without ritual permission.",
        context: "Endangered high-altitude medicinal flora protected by Uttarakhand biodiversity laws.",
      },
      {
        rule: "Bathing with chemical soaps directly in Bhagirathi, Alaknanda, or Mandakini rivers.",
        context: "Rivers are sacred water lifelines for hundreds of millions downstream.",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "जय बद्री विशाल / प्रणाम जी",
        script: "Pranam Ji / Jai Badri Vishal",
        english: "Traditional respectful Garhwali greeting to all",
        phonetic: "Pra-naam Jee",
      },
      {
        category: "Greetings",
        native: "कुन हाल चाल चिन तुमार?",
        script: "Kun haal chaal chin tumaar?",
        english: "How are you doing, respected friend?",
        phonetic: "Koon haal chaal chin too-maar?",
      },
      {
        category: "Homestay & Food",
        native: "झंगोरे की खीर और मंडुवे की रोटी चखणी छ!",
        script: "Jhangore ki kheer aur Manduwe ki roti!",
        english: "I would love to taste native millet flatbread and barnyard kheer.",
        phonetic: "Jhan-go-ray kee kheer aur Man-doo-way kee ro-tee!",
      },
      {
        category: "Directions & Water",
        native: "बुग्याल जान्या बाटु कख च?",
        script: "Bugyal jaanya baatu kakh cha?",
        english: "Which trail leads respectfully to the alpine meadows?",
        phonetic: "Boog-yaal jaan-yaa baa-too kakh cha?",
      },
      {
        category: "Eco & Respect",
        native: "धन्यवाद भायला, जंगल साफ रखूला।",
        script: "Dhanyavaad bhaiyla, jungle saaf rakhula.",
        english: "Thank you brother, we will protect and keep the forest pristine.",
        phonetic: "Dhan-ya-vaad bhai-laa, jun-gal saaf rak-hoo-laa.",
      },
    ],
  },
  {
    id: "malayalam",
    region: "Kerala & Western Ghats",
    dialectName: "Malayalam",
    states: "Kerala",
    destinations: ["Wayanad", "Munnar", "Varkala", "Alleppey", "Kochi"],
    bannerGradient: "from-teal-800 via-emerald-900 to-green-950",
    intro: "Spoken throughout God's Own Country. Kerala's biodiversity hot-spots thrive on deep community respect and sacred groves ('Kaavu').",
    ecoTaboos: [
      {
        rule: "Entering sacred groves ('Sarpa Kaavu') without seeking permission from caretakers.",
        context: "Kaavu forests protect ancient virgin micro-ecosystems and subterranean aquifers.",
      },
      {
        rule: "Throwing plastic bottles or packets into backwater canals or paddy water channels.",
        context: "Paddy channels are interconnected with drinking water wells across Kuttanad.",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "നമസ്കാരം (Namaskaram)",
        script: "Namaskaram",
        english: "Formal and gracious Kerala greeting",
        phonetic: "Na-mas-kaa-ram",
      },
      {
        category: "Greetings",
        native: "സുഖമാണോ? (Sukhamano?)",
        script: "Sukhamano?",
        english: "Are you doing well?",
        phonetic: "Soo-kha-maa-no?",
      },
      {
        category: "Homestay & Food",
        native: "നല്ല സ്വാദുള്ള നാടൻ ഭക്ഷണം!",
        script: "Nalla swadhulla naadan bhakshanam!",
        english: "This traditional Kerala sadhya meal is exquisite!",
        phonetic: "Nal-la swaa-dool-la naa-dan bhak-sha-nam!",
      },
      {
        category: "Directions & Water",
        native: "കുടിക്കാൻ തിളപ്പിച്ച വെള്ളം ഉണ്ടോ?",
        script: "Kudikkan thilappicha vellam undo?",
        english: "Do you have warm Ayurvedic/boiled drinking water?",
        phonetic: "Koo-dik-kaan thi-lap-pi-cha vel-lam oon-do?",
      },
      {
        category: "Eco & Respect",
        native: "വളരെ നന്ദി (Valare Nandi!)",
        script: "Valare nandi!",
        english: "Thank you very much from our heart.",
        phonetic: "Va-la-ray Nan-dee!",
      },
    ],
  },
  {
    id: "marwari",
    region: "Rajasthan (Thar & Shekhawati)",
    dialectName: "Marwari & Rajasthani",
    states: "Rajasthan",
    destinations: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur", "Pushkar", "Orchha"],
    bannerGradient: "from-amber-800 via-orange-900 to-red-950",
    intro: "The language of royal forts, desert dunes, and Bishnoi conservation culture where nature protection has been sacred for centuries.",
    ecoTaboos: [
      {
        rule: "Never harm Blackbucks, Chinkaras, or cut green Khejri trees in Bishnoi villages.",
        context: "Bishnois are India's legendary original eco-martyrs who hold Khejri trees sacred.",
      },
      {
        rule: "Wasting water in desert villages or washing cars with well water.",
        context: "Every drop of desert groundwater is collected through ancient stepwells ('Baoris').",
      },
    ],
    phrases: [
      {
        category: "Greetings",
        native: "खम्मा घणी सा! (Khamma Ghani Sa)",
        script: "Khamma Ghani Sa!",
        english: "May you have endless blessings (Traditional Royal & Heartfelt Greeting)",
        phonetic: "Kham-maa Gha-nee Saa!",
      },
      {
        category: "Greetings",
        native: "काई हाल चाल है आपरो?",
        script: "Kaai haal chaal hai aapro?",
        english: "How are you doing, honored sir/madam?",
        phonetic: "Kaai haal chaal hai aap-ro?",
      },
      {
        category: "Homestay & Food",
        native: "दाल बाटी चूरमा घणो घणो स्वादिष्ठ है!",
        script: "Dal Baati Churma ghano ghano swadisht hai!",
        english: "The authentic Dal Baati Churma cooked on cow dung embers is delicious!",
        phonetic: "Daal Baa-tee Choor-maa gha-no swa-disht hai!",
      },
      {
        category: "Directions & Water",
        native: "पीवण रो मीठो पाणी कठै मिलैला?",
        script: "Peevan ro meetho paani kathe milela?",
        english: "Where can I find clean sweet drinking water?",
        phonetic: "Pee-van ro mee-tho paa-nee ka-thay mi-lay-la?",
      },
      {
        category: "Eco & Respect",
        native: "घणी मेहरबानी सा!",
        script: "Ghani Meherbani Sa!",
        english: "Immense gratitude for your hospitality.",
        phonetic: "Gha-nee May-har-baa-nee Saa!",
      },
    ],
  },
];

interface DialectPhrasebookProps {
  initialDestination?: string;
  compact?: boolean;
}

export default function DialectPhrasebook({
  initialDestination = "Goa",
  compact = false,
}: DialectPhrasebookProps) {
  const { toast } = useToast();
  const [selectedRegionId, setSelectedRegionId] = useState<string>(() => {
    const norm = initialDestination.toLowerCase();
    if (norm.includes("goa") || norm.includes("gokarna")) return "konkani";
    if (norm.includes("kasol") || norm.includes("manali") || norm.includes("tirthan") || norm.includes("jibhi")) return "pahadi";
    if (norm.includes("leh") || norm.includes("ladakh") || norm.includes("nubra")) return "bhoti";
    if (norm.includes("chopta") || norm.includes("rishikesh") || norm.includes("uttarakhand")) return "garhwali";
    if (norm.includes("kerala") || norm.includes("wayanad") || norm.includes("munnar")) return "malayalam";
    return "marwari";
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);

  const currentRegion = dialectData.find((d) => d.id === selectedRegionId) || dialectData[0];

  const handleSpeak = (text: string, phraseKey: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({
        title: "Voice Audio Not Supported",
        message: "Your browser does not support web speech synthesis.",
      });
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      // Try Hindi / Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) => v.lang.includes("hi") || v.lang.includes("en-IN") || v.lang.includes("mr")
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      setSpeakingPhrase(phraseKey);
      utterance.onend = () => setSpeakingPhrase(null);
      utterance.onerror = () => setSpeakingPhrase(null);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setSpeakingPhrase(null);
    }
  };

  const categories = ["All", "Greetings", "Homestay & Food", "Directions & Water", "Eco & Respect"];

  const filteredPhrases = currentRegion.phrases.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchFilter ||
      p.english.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.script.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.phonetic.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Region selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3">
        {dialectData.map((d) => {
          const isSelected = d.id === selectedRegionId;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedRegionId(d.id);
                setActiveCategory("All");
              }}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-ink-900 text-white shadow-md scale-[1.02]"
                  : "border border-earth-200 bg-white text-ink-600 hover:border-earth-300 hover:bg-earth-50"
              }`}
            >
              <span>{d.dialectName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected ? "bg-white/20 text-white" : "bg-earth-100 text-ink-500"
              }`}>
                {d.region.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Region Banner Card */}
      <motion.div
        key={currentRegion.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-sm"
      >
        <div className={`bg-gradient-to-r ${currentRegion.bannerGradient} p-6 text-white`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                  Dialect & Eco-Etiquette
                </span>
                <span className="text-xs text-white/80">• {currentRegion.region}</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight mt-1 text-white">
                {currentRegion.dialectName} Audio Phrasebook
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-200 bg-black/25 px-3 py-1.5 rounded-xl self-start sm:self-auto border border-white/10">
              <Compass className="h-4 w-4" />
              <span>For: {currentRegion.destinations.join(", ")}</span>
            </div>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed max-w-3xl">
            {currentRegion.intro}
          </p>
        </div>

        {/* Sacred Eco-Taboos Strip */}
        <div className="border-b border-earth-200 bg-amber-50/70 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">
            <ShieldCheck className="h-4 w-4 text-amber-700" />
            <span>Sacred Eco-Taboos & Mindful Etiquette in this Region</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {currentRegion.ecoTaboos.map((taboo, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-amber-200/80 bg-white p-3 shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs font-bold text-ink-900 leading-snug">
                  {taboo.rule}
                </p>
                <p className="text-[11px] text-ink-500 mt-2 border-t border-earth-100 pt-2 leading-relaxed">
                  {taboo.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phrases Filter & Search Bar */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-amber-100 text-amber-900 font-bold"
                      : "text-ink-600 hover:bg-earth-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search phrase in English..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-xl border border-earth-200 bg-earth-50/50 pl-9 pr-3 py-1.5 text-xs text-ink-800 placeholder-ink-400 focus:border-amber-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Phrase Cards Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredPhrases.map((p, idx) => {
              const phraseKey = `${currentRegion.id}-${idx}`;
              const isPlaying = speakingPhrase === phraseKey;

              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-earth-200 bg-white p-4 shadow-xs transition-all hover:border-amber-300 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-earth-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-600">
                        {p.category}
                      </span>
                      <button
                        onClick={() => handleSpeak(p.script || p.native, phraseKey)}
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                          isPlaying
                            ? "bg-amber-500 text-white animate-pulse"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                        }`}
                        title="Pronounce phrase aloud"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Native Script */}
                    <p className="mt-2 text-base font-bold text-ink-900 font-display">
                      {p.native}
                    </p>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">
                      {p.script}
                    </p>
                  </div>

                  <div className="mt-3 border-t border-earth-100 pt-2.5">
                    <p className="text-xs text-ink-600 leading-relaxed font-medium">
                      &ldquo;{p.english}&rdquo;
                    </p>
                    <p className="text-[10px] text-ink-400 mt-1 font-mono">
                      Say: <span className="font-semibold text-ink-700">{p.phonetic}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
