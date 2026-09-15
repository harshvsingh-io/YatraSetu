"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityAutocomplete from "@/components/CityAutocomplete";
import CrowdBadge from "@/components/CrowdBadge";
import { useLiveWeather } from "@/lib/useLiveWeather";
import {
  DESTINATION_BENCHMARKS,
  DestinationBenchmark,
  getBenchmarkForCity,
} from "@/lib/budget-benchmarks";
import {
  Calculator,
  Users,
  Wallet,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Calendar,
  Share2,
  Plus,
  Trash2,
  Receipt,
  QrCode,
  Copy,
  Info,
  ShieldCheck,
  Building,
  Utensils,
  Car,
  Compass,
  AlertCircle,
  HelpCircle,
  PiggyBank,
  Train,
  Bus,
  Plane,
  Star,
  ExternalLink,
  Mountain,
  Layers,
  Clock,
  MapPin,
  Leaf,
  Navigation,
} from "lucide-react";

type TravelStyle = "backpacker" | "budget" | "comfortable" | "luxury";
type TransitMode = "train" | "bus" | "flight" | "self";

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  category: "stay" | "food" | "transport" | "activity" | "other";
  date: string;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

const popularDestinations = [
  "Manali",
  "Goa",
  "Kasol",
  "Chopta",
  "Udaipur",
  "Varanasi",
  "Jaipur",
  "Shimla",
  "Munnar",
  "Pune",
  "Ayodhya",
  "Leh",
  "Shillong",
  "Rishikesh",
];

function getRestorationEvent(dest: string) {
  const d = (dest || "").toLowerCase();
  if (d.includes("kasol")) {
    return {
      title: "Parvati River Trail Clean & Plastic Sweep",
      location: "Chalal River Bank, Kasol",
      time: "This Saturday · 7:30 AM",
      volunteers: 84,
    };
  }
  if (d.includes("chopta")) {
    return {
      title: "Tungnath Sacred Bugyal & Alpine Care",
      location: "Chopta Meadow Base, Tungnath Trail",
      time: "This Sunday · 7:00 AM",
      volunteers: 62,
    };
  }
  if (d.includes("hampi")) {
    return {
      title: "UNESCO Tungabhadra Heritage & River Clean",
      location: "Vitthala Temple Complex & Ghats",
      time: "Saturday · 6:30 AM",
      volunteers: 118,
    };
  }
  if (d.includes("orchha")) {
    return {
      title: "Betwa River Cenotaphs Heritage Care Drive",
      location: "Royal Chhatris & Betwa River Bank",
      time: "Sunday · 7:00 AM",
      volunteers: 56,
    };
  }
  if (d.includes("manali")) {
    return {
      title: "Beas River & Old Manali Pine Trail Cleanup",
      location: "Hadimba Forest Trail, Manali",
      time: "Saturday · 8:00 AM",
      volunteers: 126,
    };
  }
  if (d.includes("jaipur")) {
    return {
      title: "Amer Stepwell & Nahargarh Ridge Revival",
      location: "Panna Meena Ka Kund, Amer",
      time: "Sunday · 6:30 AM",
      volunteers: 94,
    };
  }
  if (d.includes("varanasi")) {
    return {
      title: "Ganga Ghats Silt Removal & Deep Seva",
      location: "Assi to Dashashwamedh Ghats",
      time: "Sunday · 6:00 AM",
      volunteers: 210,
    };
  }
  if (d.includes("gokarna")) {
    return {
      title: "Olive Ridley Coastal Dune Restoration",
      location: "Kudle Beach & Cliff Trail",
      time: "Sunday · 6:30 AM",
      volunteers: 78,
    };
  }
  if (d.includes("munnar")) {
    return {
      title: "Western Ghats Watershed Protection Walk",
      location: "Pothamedu Tea Trails, Munnar",
      time: "Saturday · 8:00 AM",
      volunteers: 64,
    };
  }
  return {
    title: `${dest} Ecological & Heritage Revival Drive`,
    location: `Eco Heritage Corridor, ${dest}`,
    time: "This Weekend · 7:00 AM",
    volunteers: 65,
  };
}

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<
    "estimator" | "itinerary" | "stays" | "transport" | "splitter" | "all"
  >("estimator");

  // ─────────────────────────────────────────────────────────────
  // TAB 1: ESTIMATOR & DESTINATION STATE
  // ─────────────────────────────────────────────────────────────
  const [selectedDest, setSelectedDest] = useState<string>("Manali");
  const [searchCityInput, setSearchCityInput] = useState<string>("");
  const [durationDays, setDurationDays] = useState<number>(4);
  const [travelersCount, setTravelersCount] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("budget");
  const [transitMode, setTransitMode] = useState<TransitMode>("bus");
  const [includeBuffer, setIncludeBuffer] = useState<boolean>(true);

  // Dynamic live data for destination
  const [crowdData, setCrowdData] = useState<{
    destination: any;
    alternatives: any[];
  } | null>(null);
  const [hotelPlaces, setHotelPlaces] = useState<any[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [itineraryCopied, setItineraryCopied] = useState(false);
  const { weather: liveWeather } = useLiveWeather(selectedDest);

  // Sync with URL query parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || params.get("dest");
      if (q && q.trim()) {
        setSelectedDest(q.trim());
        setSearchCityInput(q.trim());
      }
    }
  }, []);

  // Fetch live crowd & places whenever destination changes
  useEffect(() => {
    fetch(`/api/decongestion?q=${encodeURIComponent(selectedDest)}`)
      .then((r) => r.json())
      .then((d) => setCrowdData(d))
      .catch(() => {});

    setLoadingPlaces(true);
    fetch(`/api/places?q=${encodeURIComponent(selectedDest)}&type=all`)
      .then((r) => r.json())
      .then((d) => {
        if (d.places && d.places.length > 0) {
          setHotelPlaces(d.places);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingPlaces(false));
  }, [selectedDest]);

  // ─────────────────────────────────────────────────────────────
  // TAB 2: EXPENSE SPLITTER STATE
  // ─────────────────────────────────────────────────────────────
  const [members, setMembers] = useState<string[]>(["Arjun", "Rohan", "Priya"]);
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: "exp-1",
      title: "Volvo Bus Tickets (Delhi -> Manali)",
      amount: 3300,
      paidBy: "Arjun",
      splitAmong: ["Arjun", "Rohan", "Priya"],
      category: "transport",
      date: "Day 1",
    },
    {
      id: "exp-2",
      title: "Riverside Homestay (2 Nights)",
      amount: 4800,
      paidBy: "Rohan",
      splitAmong: ["Arjun", "Rohan", "Priya"],
      category: "stay",
      date: "Day 2",
    },
    {
      id: "exp-3",
      title: "Solang Cafe & Trout Dinner",
      amount: 2150,
      paidBy: "Priya",
      splitAmong: ["Arjun", "Rohan", "Priya"],
      category: "food",
      date: "Day 2",
    },
  ]);

  // Form for adding new expense
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expensePaidBy, setExpensePaidBy] = useState<string>("Arjun");
  const [expenseSplitAmong, setExpenseSplitAmong] = useState<string[]>([
    "Arjun",
    "Rohan",
    "Priya",
  ]);
  const [expenseCategory, setExpenseCategory] = useState<ExpenseItem["category"]>("food");
  const [copiedStatus, setCopiedStatus] = useState<string>("");
  const [userUpiId, setUserUpiId] = useState<string>("yatrasetu@upi");

  // Load splitter from local storage on client mount
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem("ys_splitter_members");
      const savedExpenses = localStorage.getItem("ys_splitter_expenses");
      const savedUpi = localStorage.getItem("ys_splitter_upi");
      if (savedMembers) setMembers(JSON.parse(savedMembers));
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedUpi) setUserUpiId(savedUpi);
    } catch {
      // fallback to defaults
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem("ys_splitter_members", JSON.stringify(members));
      localStorage.setItem("ys_splitter_expenses", JSON.stringify(expenses));
      localStorage.setItem("ys_splitter_upi", userUpiId);
    } catch {
      // storage unavailable
    }
  }, [members, expenses, userUpiId]);

  // Ensure paidBy & splitAmong stay valid when members change
  useEffect(() => {
    if (members.length > 0 && !members.includes(expensePaidBy)) {
      setExpensePaidBy(members[0]);
    }
    setExpenseSplitAmong((prev) => prev.filter((m) => members.includes(m)));
  }, [members, expensePaidBy]);

  // ─────────────────────────────────────────────────────────────
  // BUDGET ESTIMATOR CALCULATIONS
  // ─────────────────────────────────────────────────────────────
  const currentBenchmark: DestinationBenchmark =
    getBenchmarkForCity(selectedDest);
  const currentTier = currentBenchmark.tiers[travelStyle];

  // Dynamic Day-by-Day Itinerary Planner for any Indian destination
  const generatedItinerary = useMemo(() => {
    const daysCount = Math.min(10, Math.max(1, durationDays));
    const destName = selectedDest || "Destination";
    const plans = [];

    const activitiesCatalog = [
      {
        morning: {
          act: `Arrival, Check-in & Sunrise Heritage Walk`,
          note: `Check into verified partner eco-homestay in ${destName} & receive welcome herbal drink.`,
        },
        afternoon: {
          act: `Community Clean Trail & Local Waste Audit`,
          seva: `${destName} Forest & River Corridor Cleanup`,
          bonus: 150,
        },
        evening: {
          act: `Heritage Baori Walk & Traditional Regional Thali`,
          tip: `Savor millets and organic local dishes at community-run kitchen in ${destName}.`,
        },
      },
      {
        morning: {
          act: `Ancient Temple & Monument AR Immersion`,
          note: `Listen to AI audio tour of sacred architecture & centuries-old lore in ${destName}.`,
        },
        afternoon: {
          act: `Native Tree Planting & Soil Restoration`,
          seva: `${destName} Green Belt Reforestation Drive`,
          bonus: 200,
        },
        evening: {
          act: `Sunset Point View & Acoustic Folk Gathering`,
          tip: `Support local indigenous musicians and cooperative handicraft stalls.`,
        },
      },
      {
        morning: {
          act: `Secret Waterfalls & Birding Forest Hike`,
          note: `Early morning silent trek guided by certified local community elder.`,
        },
        afternoon: {
          act: `Village Plastic-Free Awareness Workshop`,
          seva: `School Zero-Waste Education Circle in ${destName}`,
          bonus: 180,
        },
        evening: {
          act: `Stargazing & Wood-Fired Local Cuisine`,
          tip: `Enjoy mountain herbal tea under clear starry skies away from city glow.`,
        },
      },
      {
        morning: {
          act: `Scenic Meadow & River Rafting Exploration`,
          note: `Low-impact non-motorized river drift with local boatmen.`,
        },
        afternoon: {
          act: `Monastery / Shrine Restoration Seva`,
          seva: `Sacred Heritage Pathway Stone Alignment`,
          bonus: 160,
        },
        evening: {
          act: `Local Farmers' Organic Spice Market`,
          tip: `Buy directly from local farm cooperatives at 40% discount vs tourist shops.`,
        },
      },
      {
        morning: {
          act: `High Ridge Panorama & Photography Trail`,
          note: `Golden hour photo walk respecting local eco-etiquette guidelines.`,
        },
        afternoon: {
          act: `Biodiversity Mapping & Geo-tagging`,
          seva: `Flora & Fauna Survey on YatraSetu App`,
          bonus: 220,
        },
        evening: {
          act: `Farewell Campfire & Seva Passport Reflection`,
          tip: `Collect your verifiable NSS / Ministry Green Karma Certificate.`,
        },
      },
    ];

    for (let d = 1; d <= daysCount; d++) {
      const template = activitiesCatalog[(d - 1) % activitiesCatalog.length];
      plans.push({
        day: d,
        title: `Day ${d}: ${
          d === 1
            ? "Arrival & Eco Settling"
            : d === daysCount
            ? "Grand Panorama & Farewell"
            : "Heritage & Community Seva"
        }`,
        morning: template.morning,
        afternoon: template.afternoon,
        evening: template.evening,
      });
    }

    return plans;
  }, [durationDays, selectedDest]);

  const handleCopyItinerary = () => {
    const lines = [
      `🌟 YatraSetu AI Trip Plan: ${selectedDest} (${durationDays} Days / ${nights} Nights)`,
      `👥 Travelers: ${travelersCount} · Style: ${travelStyle.toUpperCase()}`,
      "",
      ...generatedItinerary.flatMap((plan) => [
        `📍 ${plan.title}`,
        `  • Morning: ${plan.morning.act} (${plan.morning.note})`,
        `  • Afternoon Seva: ${plan.afternoon.act} [${plan.afternoon.seva}] (+${plan.afternoon.bonus} Green Karma)`,
        `  • Evening: ${plan.evening.act} (Tip: ${plan.evening.tip})`,
        "",
      ]),
      `Plan your mindful trip on YatraSetu: https://yatrasetu.in/trip?q=${encodeURIComponent(
        selectedDest
      )}`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setItineraryCopied(true);
    setTimeout(() => setItineraryCopied(false), 3000);
  };

  const transitPerPerson = useMemo(() => {
    switch (transitMode) {
      case "train":
        return currentBenchmark.intercityTrainEst * 2; // return journey
      case "bus":
        return currentBenchmark.intercityBusEst * 2;
      case "flight":
        return currentBenchmark.intercityFlightEst * 2;
      case "self":
        return 900; // estimated toll/fuel share per person
      default:
        return 1200;
    }
  }, [transitMode, currentBenchmark]);

  const nights = Math.max(1, durationDays - 1);

  // Group stay efficiency: rooms needed (2 people per room if private, or per bed in hostel)
  const roomsNeeded =
    travelStyle === "backpacker"
      ? travelersCount
      : Math.ceil(travelersCount / 2);

  const totalStayCost =
    travelStyle === "backpacker"
      ? currentTier.stayPerNight * nights * travelersCount
      : currentTier.stayPerNight * nights * roomsNeeded;

  const totalFoodCost = currentTier.foodPerDay * durationDays * travelersCount;
  const totalLocalTransportCost =
    currentTier.localTransportPerDay * durationDays * travelersCount;
  const totalActivitiesCost =
    currentTier.activitiesPerDay * durationDays * travelersCount;
  const totalTransitCost = transitPerPerson * travelersCount;

  const baseTotal =
    totalStayCost +
    totalFoodCost +
    totalLocalTransportCost +
    totalActivitiesCost +
    totalTransitCost;

  const bufferCost = includeBuffer ? Math.round(baseTotal * 0.12) : 0;
  const grandTotal = baseTotal + bufferCost;
  const costPerPerson = Math.round(grandTotal / Math.max(1, travelersCount));

  // ─────────────────────────────────────────────────────────────
  // SPLITTER SETTLEMENT ALGORITHM (Minimal Transactions)
  // ─────────────────────────────────────────────────────────────
  const { totalGroupSpent, balances, settlements } = useMemo(() => {
    let spent = 0;
    const balanceMap: Record<string, number> = {};

    members.forEach((m) => {
      balanceMap[m] = 0;
    });

    expenses.forEach((exp) => {
      spent += exp.amount;
      const payer = exp.paidBy;
      const beneficiaries =
        exp.splitAmong.length > 0 ? exp.splitAmong : members;
      const perHeadShare = exp.amount / beneficiaries.length;

      // Payer gets credit
      balanceMap[payer] = (balanceMap[payer] || 0) + exp.amount;

      // Beneficiaries get debited
      beneficiaries.forEach((b) => {
        balanceMap[b] = (balanceMap[b] || 0) - perHeadShare;
      });
    });

    // Simplify debts (Greedy match positive balances with negative balances)
    const debtors: { name: string; amount: number }[] = [];
    const creditors: { name: string; amount: number }[] = [];

    Object.entries(balanceMap).forEach(([name, bal]) => {
      const rounded = Math.round(bal);
      if (rounded < -0.5) {
        debtors.push({ name, amount: -rounded });
      } else if (rounded > 0.5) {
        creditors.push({ name, amount: rounded });
      }
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const calculatedSettlements: Settlement[] = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const settleAmount = Math.min(debtors[i].amount, creditors[j].amount);
      if (settleAmount > 0) {
        calculatedSettlements.push({
          from: debtors[i].name,
          to: creditors[j].name,
          amount: Math.round(settleAmount),
        });
      }

      debtors[i].amount -= settleAmount;
      creditors[j].amount -= settleAmount;

      if (debtors[i].amount <= 0.5) i++;
      if (creditors[j].amount <= 0.5) j++;
    }

    return {
      totalGroupSpent: spent,
      balances: balanceMap,
      settlements: calculatedSettlements,
    };
  }, [members, expenses]);

  // Handlers for Splitter
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newMemberName.trim();
    if (!trimmed) return;
    if (members.map((m) => m.toLowerCase()).includes(trimmed.toLowerCase())) {
      alert("Member already in the trip group!");
      return;
    }
    setMembers([...members, trimmed]);
    setExpenseSplitAmong([...expenseSplitAmong, trimmed]);
    setNewMemberName("");
  };

  const handleRemoveMember = (nameToRemove: string) => {
    if (members.length <= 2) {
      alert("A trip group needs at least 2 members to split expenses.");
      return;
    }
    const hasExpenses = expenses.some(
      (e) => e.paidBy === nameToRemove || e.splitAmong.includes(nameToRemove)
    );
    if (
      hasExpenses &&
      !confirm(
        `${nameToRemove} has existing expenses logged. Deleting them will remove them from calculations. Continue?`
      )
    ) {
      return;
    }
    setMembers(members.filter((m) => m !== nameToRemove));
    setExpenses(
      expenses
        .filter((e) => e.paidBy !== nameToRemove)
        .map((e) => ({
          ...e,
          splitAmong: e.splitAmong.filter((m) => m !== nameToRemove),
        }))
    );
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if (!expenseTitle.trim() || isNaN(amt) || amt <= 0) {
      alert("Please enter a valid expense title and positive amount.");
      return;
    }
    if (expenseSplitAmong.length === 0) {
      alert("Select at least one person to split this expense with.");
      return;
    }

    const newExp: ExpenseItem = {
      id: "exp-" + Date.now(),
      title: expenseTitle.trim(),
      amount: Math.round(amt),
      paidBy: expensePaidBy,
      splitAmong: [...expenseSplitAmong],
      category: expenseCategory,
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
    };

    setExpenses([newExp, ...expenses]);
    setExpenseTitle("");
    setExpenseAmount("");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleCopyWhatsApp = () => {
    const lines = [
      `🏔️ *${selectedDest} Trip Expense Summary*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `💰 *Total Spent:* ₹${totalGroupSpent.toLocaleString("en-IN")}`,
      `👥 *Trip Members (${members.length}):* ${members.join(", ")}`,
      "",
      `⚖️ *Final Settlements (Who Owes Whom):*`,
    ];

    if (settlements.length === 0) {
      lines.push(`✅ All expenses are completely settled! No debts.`);
    } else {
      settlements.forEach((s) => {
        const upiLink = userUpiId
          ? `\n👉 Pay via UPI: upi://pay?pa=${encodeURIComponent(
              userUpiId
            )}&pn=${encodeURIComponent(s.to)}&am=${s.amount}&cu=INR`
          : "";
        lines.push(`• *${s.from}* owes *${s.to}*: ₹${s.amount}${upiLink}`);
      });
    }

    lines.push("");
    lines.push(`📊 *Recent Expenses:*`);
    expenses.slice(0, 5).forEach((e) => {
      lines.push(`• ${e.title}: ₹${e.amount} (Paid by ${e.paidBy})`);
    });
    lines.push("");
    lines.push(`_Calculated via YatraSetu Trip Splitter 🇮🇳_`);

    const text = lines.join("\n");
    navigator.clipboard.writeText(text);
    setCopiedStatus("whatsapp");
    setTimeout(() => setCopiedStatus(""), 3000);
  };

  // ─────────────────────────────────────────────────────────────
  // SUB-SECTION RENDERERS
  // ─────────────────────────────────────────────────────────────

  // 1. ESTIMATOR SECTION
  const renderEstimatorSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Controls & Options (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Step 1: Destination & Quick Selection */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Step 1: Selected Destination
            </label>
            <span className="text-xs text-emerald-400 font-bold">
              {selectedDest}
            </span>
          </div>
          <p className="text-xs text-neutral-400 mb-3">
            Change city using the search bar above, or pick from popular hubs:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {popularDestinations.slice(0, 8).map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setSelectedDest(dest);
                  setSearchCityInput(dest);
                }}
                className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition truncate ${
                  selectedDest.toLowerCase() === dest.toLowerCase()
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {dest}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
            <span>
              Region:{" "}
              <strong className="text-neutral-200">
                {currentBenchmark.state}
              </strong>
            </span>
            <span>
              Type:{" "}
              <strong className="text-emerald-400">
                {currentBenchmark.category}
              </strong>
            </span>
          </div>
        </div>

        {/* Step 2: Duration & Travelers Sliders */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Step 2: Trip Duration & Travelers
          </h3>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Trip Duration
              </span>
              <span className="text-base font-bold text-white bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-700">
                {durationDays} Days ({nights} Nights)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>1 Day (Quick)</span>
              <span>5 Days (Standard)</span>
              <span>14 Days (Extended)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Number of Travelers
              </span>
              <span className="text-base font-bold text-white bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-700">
                {travelersCount}{" "}
                {travelersCount === 1 ? "Solo" : "People"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={travelersCount}
              onChange={(e) => setTravelersCount(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>Solo Nomad</span>
              <span>Duo / Couple (2)</span>
              <span>Squad (4-6)</span>
              <span>10 People</span>
            </div>
          </div>
        </div>

        {/* Step 3: Travel Style Selection */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Step 3: Travel Style
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                key: "backpacker",
                title: "Backpacker / Nomad",
                subtitle: "Hostel dorms, dhabas, shared autos",
                range: `₹${currentBenchmark.tiers.backpacker.stayPerNight}/nt stay`,
              },
              {
                key: "budget",
                title: "Smart Budget (Popular)",
                subtitle: "Clean homestays, scooty rental, cafes",
                range: `₹${currentBenchmark.tiers.budget.stayPerNight}/nt stay`,
              },
              {
                key: "comfortable",
                title: "Comfortable",
                subtitle: "3-star resort, private cabs, fine dining",
                range: `₹${currentBenchmark.tiers.comfortable.stayPerNight}/nt stay`,
              },
              {
                key: "luxury",
                title: "Luxury / Premium",
                subtitle: "Boutique chalets, private SUV, tours",
                range: `₹${currentBenchmark.tiers.luxury.stayPerNight}/nt stay`,
              },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTravelStyle(item.key as TravelStyle)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  travelStyle === item.key
                    ? "bg-emerald-500/10 border-emerald-500 text-white ring-1 ring-emerald-500/50"
                    : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">
                    {item.title}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {item.range}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>

          <p className="text-xs text-neutral-400 mt-4 bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 italic">
            💡 &quot;{currentTier.desc}&quot;
          </p>
        </div>

        {/* Step 4: Intercity Transit Mode */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Step 4: Intercity Transport (Return)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                key: "bus",
                label: "Volvo / AC Bus",
                cost: `₹${currentBenchmark.intercityBusEst * 2}`,
              },
              {
                key: "train",
                label: "Train (3AC / Slp)",
                cost: `₹${currentBenchmark.intercityTrainEst * 2}`,
              },
              {
                key: "flight",
                label: "Flight (Nearest)",
                cost: `₹${currentBenchmark.intercityFlightEst * 2}`,
              },
              {
                key: "self",
                label: "Self-Drive / Carpool",
                cost: "₹1,800/car",
              },
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setTransitMode(mode.key as TransitMode)}
                className={`p-3 rounded-xl border text-center transition ${
                  transitMode === mode.key
                    ? "bg-emerald-500/15 border-emerald-500 text-white font-semibold"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <div className="text-xs font-medium">{mode.label}</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                  {mode.cost}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Buffer Checkbox */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="buffer"
              checked={includeBuffer}
              onChange={(e) => setIncludeBuffer(e.target.checked)}
              className="w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-neutral-900"
            />
            <label htmlFor="buffer" className="text-xs text-neutral-300">
              <span className="font-semibold block text-white">
                Include 12% Emergency & Detour Buffer
              </span>
              Recommended for sudden hill taxi surges, medicals, or mountain route detours.
            </label>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {includeBuffer ? `+₹${bufferCost.toLocaleString("en-IN")}` : "Off"}
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Cost Breakdown & Summary (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Realistic Total Cost
            </span>
            <span className="text-xs text-neutral-400">
              {durationDays}D / {nights}N
            </span>
          </div>

          <div className="my-6 text-center">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              ₹{grandTotal.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              For entire group of{" "}
              <strong className="text-neutral-200">
                {travelersCount} {travelersCount === 1 ? "person" : "travelers"}
              </strong>
            </p>

            {travelersCount > 1 && (
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
                ≈ ₹{costPerPerson.toLocaleString("en-IN")} per person
              </div>
            )}
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                Stay ({nights} Nights · {travelStyle === "backpacker" ? `${travelersCount} beds` : `${roomsNeeded} rooms`})
              </span>
              <span className="font-semibold text-white">
                ₹{totalStayCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" />
                Food & Drinking ({durationDays} Days)
              </span>
              <span className="font-semibold text-white">
                ₹{totalFoodCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-2">
                <Car className="w-4 h-4 text-sky-400" />
                Intercity Transit (Return)
              </span>
              <span className="font-semibold text-white">
                ₹{totalTransitCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                Local Transit & Scooter/Fuel
              </span>
              <span className="font-semibold text-white">
                ₹{totalLocalTransportCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-rose-400" />
                Activities & Entry Tickets
              </span>
              <span className="font-semibold text-white">
                ₹{totalActivitiesCost.toLocaleString("en-IN")}
              </span>
            </div>

            {includeBuffer && (
              <div className="flex items-center justify-between text-emerald-400 font-medium pt-2 border-t border-neutral-800/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  12% Contingency / Buffer
                </span>
                <span>₹{bufferCost.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          {/* Switch to Splitter CTA */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("splitter")}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              Split this with Friends
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Insider Saving Tips Box */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4" />
            Local Money Saving Hacks ({selectedDest})
          </h4>
          <ul className="space-y-2.5">
            {currentBenchmark.insiderTips.map((tip, idx) => (
              <li
                key={idx}
                className="text-xs text-neutral-300 flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // 2. AI ITINERARY SECTION
  const renderItinerarySection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            AI Mindful Itinerary for {selectedDest}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {durationDays} Days / {nights} Nights · Verified low-pressure spots, community restoration & authentic heritage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyItinerary}
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-3.5 py-2 text-xs font-semibold text-neutral-200 border border-neutral-700 transition"
          >
            <Copy className="h-3.5 w-3.5 text-emerald-400" />
            {itineraryCopied ? "Copied! ✓" : "Copy Plan"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Trip Plan to ${selectedDest} (${durationDays} Days):\n` +
                generatedItinerary
                  .map(
                    (p) =>
                      `*${p.title}*:\n  • Morning: ${p.morning.act}\n  • Seva: ${p.afternoon.seva}\n  • Evening: ${p.evening.act}`
                  )
                  .join("\n\n") +
                `\n\nFull details on YatraSetu: https://yatrasetu.in/trip?q=${encodeURIComponent(
                  selectedDest
                )}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-bold text-black transition shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share WhatsApp
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        {generatedItinerary.map((plan) => (
          <div
            key={plan.day}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 hover:border-neutral-700 transition-all"
          >
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                  D{plan.day}
                </span>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {plan.title}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                +{plan.afternoon.bonus} Green Karma
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800/60">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  🌅 Morning · Exploration
                </span>
                <p className="font-semibold text-neutral-200">
                  {plan.morning.act}
                </p>
                <p className="text-neutral-400 mt-1 text-[11px]">
                  {plan.morning.note}
                </p>
              </div>

              <div className="bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800/60">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  🌱 Afternoon · Community Seva
                </span>
                <p className="font-semibold text-neutral-200">
                  {plan.afternoon.act}
                </p>
                <p className="text-emerald-400/80 mt-1 text-[11px] font-medium">
                  📍 {plan.afternoon.seva}
                </p>
              </div>

              <div className="bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800/60">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  🌆 Evening · Culture & Dining
                </span>
                <p className="font-semibold text-neutral-200">
                  {plan.evening.act}
                </p>
                <p className="text-neutral-400 mt-1 text-[11px]">
                  💡 {plan.evening.tip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 3. VERIFIED STAYS & HOTELS SECTION
  const renderStaysSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-emerald-400" />
            Verified Eco-Stays & Homestays in {selectedDest}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Real properties from OpenStreetMap POI & certified local hosts with solar energy and zero-waste
          </p>
        </div>
        <Link
          href={`/discover?q=${encodeURIComponent(selectedDest)}`}
          className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
        >
          Discover Map →
        </Link>
      </div>

      {loadingPlaces ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse p-4"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(hotelPlaces.length > 0
            ? hotelPlaces.slice(0, 6)
            : [
                {
                  id: "fb-1",
                  name: `${selectedDest} Heritage Eco Residency`,
                  type: "Boutique",
                  address: `Heritage Quarter, ${selectedDest}`,
                  priceRange: `₹${currentTier.stayPerNight}/night`,
                  rating: 4.8,
                  photo:
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
                  amenities: ["Solar Water", "Organic Food", "Wifi"],
                },
                {
                  id: "fb-2",
                  name: `${selectedDest} Local Family Homestay`,
                  type: "Homestay",
                  address: `Old Town Center, ${selectedDest}`,
                  priceRange: `₹${Math.round(currentTier.stayPerNight * 0.7)}/night`,
                  rating: 4.7,
                  photo:
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
                  amenities: ["Home Cooked", "Mountain View", "Cultural Tour"],
                },
                {
                  id: "fb-3",
                  name: `${selectedDest} Pine & Riverside Retreat`,
                  type: "Resort",
                  address: `Nature Buffer Belt, ${selectedDest}`,
                  priceRange: `₹${Math.round(currentTier.stayPerNight * 1.4)}/night`,
                  rating: 4.9,
                  photo:
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
                  amenities: ["Zero-Plastic", "EV Charging", "Guided Treks"],
                },
              ]
          ).map((stay, idx) => (
            <div
              key={stay.id || idx}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-neutral-700 transition group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-neutral-950">
                  <img
                    src={
                      stay.photo ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
                    }
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-lg bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-neutral-800">
                    {stay.type || "Eco Stay"}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-neutral-950/85 backdrop-blur-md px-2 py-1 text-xs font-bold text-white flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{stay.rating || 4.7}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-white text-sm line-clamp-1">
                    {stay.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    {stay.address || `${selectedDest}, India`}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(stay.amenities || [
                      "Solar Water",
                      "Eco Meals",
                      "Wifi",
                    ])
                      .slice(0, 3)
                      .map((a: string) => (
                        <span
                          key={a}
                          className="rounded-md bg-neutral-950 px-2 py-0.5 text-[10px] font-medium text-neutral-300 border border-neutral-800"
                        >
                          {a}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-neutral-800/80 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">
                    Tariff
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {stay.priceRange || `₹${currentTier.stayPerNight}/night`}
                  </span>
                </div>
                <a
                  href={`https://www.google.com/travel/hotels?q=${encodeURIComponent(
                    stay.name + " " + selectedDest
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-black transition"
                >
                  Book Stay ➔
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 4. TRANSPORT SECTION
  const renderTransportSection = () => (
    <div className="space-y-6">
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Train className="h-5 w-5 text-emerald-400" />
          Direct Transport Booking to {selectedDest}
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Deep links to official, verified booking engines with zero extra commission
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <a
            href="https://www.irctc.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <Train className="h-5 w-5" />
                <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
              </div>
              <h4 className="font-bold text-white text-sm">
                IRCTC Indian Railways
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Sleeper, 3AC, Vande Bharat trains to nearest railhead.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-xs">
              <span className="text-neutral-500">Est. Return:</span>
              <strong className="text-emerald-400 font-mono">
                ₹{currentBenchmark.intercityTrainEst * 2}
              </strong>
            </div>
          </a>

          <a
            href="https://www.redbus.in"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-rose-400 mb-2">
                <Bus className="h-5 w-5" />
                <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
              </div>
              <h4 className="font-bold text-white text-sm">
                RedBus & State Transport
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Volvo, Scania & HRTC/UPSRTC luxury sleeper buses.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-xs">
              <span className="text-neutral-500">Est. Return:</span>
              <strong className="text-emerald-400 font-mono">
                ₹{currentBenchmark.intercityBusEst * 2}
              </strong>
            </div>
          </a>

          <a
            href="https://www.skyscanner.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-sky-400 mb-2">
                <Plane className="h-5 w-5" />
                <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
              </div>
              <h4 className="font-bold text-white text-sm">
                Skyscanner Flights
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Direct & connecting flights to nearest airport.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-xs">
              <span className="text-neutral-500">Est. Return:</span>
              <strong className="text-emerald-400 font-mono">
                ₹{currentBenchmark.intercityFlightEst * 2}
              </strong>
            </div>
          </a>

          <a
            href="https://www.olacabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <Car className="h-5 w-5" />
                <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
              </div>
              <h4 className="font-bold text-white text-sm">
                Ola / Uber Outstation
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Private cabs & shared carpooling for group travel.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-xs">
              <span className="text-neutral-500">Carpool Share:</span>
              <strong className="text-emerald-400 font-mono">
                ₹1,800/car
              </strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  // 5. EXPENSE SPLITTER SECTION
  const renderSplitterSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Add Expenses & Members (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Group Members Bar */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Trip Friends ({members.length})
            </h3>
            <span className="text-xs text-neutral-500">
              Add who is on this trip
            </span>
          </div>

          {/* Member Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {members.map((member) => (
              <div
                key={member}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {member}
                <button
                  onClick={() => handleRemoveMember(member)}
                  className="text-neutral-500 hover:text-red-400 transition ml-1"
                  title="Remove member"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Member Form */}
          <form
            onSubmit={handleAddMember}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Add friend name (e.g. Sneha)"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>
        </div>

        {/* Add Expense Form */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-4">
            <Receipt className="w-4 h-4 text-emerald-400" />
            Log New Group Expense
          </h3>

          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Expense Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rafting Tickets / Cafe Dinner"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="2400"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Who Paid?
                </label>
                <select
                  value={expensePaidBy}
                  onChange={(e) => setExpensePaidBy(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {members.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Category
                </label>
                <select
                  value={expenseCategory}
                  onChange={(e) =>
                    setExpenseCategory(e.target.value as ExpenseItem["category"])
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="stay">Stay / Hotel</option>
                  <option value="food">Food & Cafe</option>
                  <option value="transport">Transport / Fuel</option>
                  <option value="activity">Activities / Treks</option>
                  <option value="other">Miscellaneous</option>
                </select>
              </div>
            </div>

            {/* Split Among Selection */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Split Equally Among:
              </label>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => {
                  const isChecked = expenseSplitAmong.includes(m);
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => {
                        if (isChecked) {
                          setExpenseSplitAmong(
                            expenseSplitAmong.filter((name) => name !== m)
                          );
                        } else {
                          setExpenseSplitAmong([...expenseSplitAmong, m]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                        isChecked
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition mt-2"
            >
              Save Expense to Trip Log
            </button>
          </form>
        </div>

        {/* Expenses List */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Trip Expense Log ({expenses.length})
            </h3>
            <span className="text-xs text-neutral-400">
              Total Logged:{" "}
              <strong className="text-emerald-400 font-mono">
                ₹{totalGroupSpent.toLocaleString("en-IN")}
              </strong>
            </span>
          </div>

          {expenses.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              No expenses added yet. Add tickets, food or stays above!
            </div>
          ) : (
            <div className="space-y-2.5">
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">
                      {exp.title}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Paid by{" "}
                      <strong className="text-emerald-400">{exp.paidBy}</strong> ·
                      Split among {exp.splitAmong.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white text-sm">
                      ₹{exp.amount.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="text-neutral-500 hover:text-red-400 transition"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Settlement Plan & WhatsApp UPI Export (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              Who Owes Whom
            </span>
            <span className="text-xs text-neutral-400">
              Minimal Transactions
            </span>
          </div>

          {settlements.length === 0 ? (
            <div className="py-8 text-center text-emerald-400 text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <span>Everyone is completely squared up! No pending debts.</span>
            </div>
          ) : (
            <div className="space-y-3 my-5">
              {settlements.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between"
                >
                  <div className="text-xs">
                    <span className="font-bold text-rose-400">
                      {s.from}
                    </span>
                    <span className="text-neutral-400 mx-1.5">owes</span>
                    <span className="font-bold text-emerald-400">
                      {s.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-white">
                      ₹{s.amount.toLocaleString("en-IN")}
                    </span>
                    {userUpiId && (
                      <a
                        href={`upi://pay?pa=${encodeURIComponent(
                          userUpiId
                        )}&pn=${encodeURIComponent(
                          s.to
                        )}&am=${s.amount}&cu=INR`}
                        className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 hover:bg-emerald-500/30 transition"
                        title="Open in UPI App"
                      >
                        Pay UPI
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Net Balances breakdown */}
          <div className="pt-4 border-t border-neutral-800">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Net Balances
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(balances).map(([name, bal]) => (
                <div
                  key={name}
                  className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60 flex justify-between items-center"
                >
                  <span className="text-neutral-300 font-medium">
                    {name}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      bal > 0
                        ? "text-emerald-400"
                        : bal < 0
                        ? "text-rose-400"
                        : "text-neutral-500"
                    }`}
                  >
                    {bal > 0 ? `+₹${Math.round(bal)}` : `₹${Math.round(bal)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* UPI Handle Configuration */}
          <div className="mt-5 pt-4 border-t border-neutral-800">
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Receiver UPI ID for 1-Click Payment Links:
            </label>
            <input
              type="text"
              placeholder="e.g. mobile@okhdfcbank or name@upi"
              value={userUpiId}
              onChange={(e) => setUserUpiId(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Export to WhatsApp button */}
          <div className="mt-5">
            <button
              onClick={handleCopyWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <Share2 className="w-4 h-4" />
              {copiedStatus === "whatsapp"
                ? "Copied to Clipboard! ✓"
                : "Copy WhatsApp Settlement"}
            </button>
            <p className="text-[11px] text-neutral-500 text-center mt-2">
              Formats with clean bullets, group totals, and direct UPI pay links.
            </p>
          </div>
        </div>

        {/* Free Tier Offline note */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 text-xs text-neutral-400 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-200">
              Privacy-First & Local:
            </strong>{" "}
            Expenses and splits are stored directly in your browser&apos;s
            local cache. No logins or credit cards required. Works offline on
            mountain treks.
          </div>
        </div>
      </div>
    </div>
  );

  // 6. SEVA & RESTORATION SECTION
  const renderSevaSection = () => {
    const event = getRestorationEvent(selectedDest);
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 to-neutral-950 p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <Leaf className="h-4 w-4" />
          Mindful Seva & Eco-Restoration Drive
        </div>
        <h3 className="text-xl font-bold text-white">{event.title}</h3>
        <p className="text-sm text-neutral-300 mt-1">
          📍 {event.location} · ⏰ {event.time}
        </p>
        <p className="text-xs text-neutral-400 mt-2">
          Join {event.volunteers} fellow conscious travelers and local volunteer units. Restore fragile ecosystems, clean plastic waste trails, and earn verifiable Ministry Green Karma Certificates.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Link
            href="/events"
            className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-black transition"
          >
            RSVP & Join Seva Drive ➔
          </Link>
          <Link
            href="/certificates"
            className="rounded-xl bg-neutral-900 hover:bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-300 border border-neutral-800 transition"
          >
            View Verifiable Certificates
          </Link>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // MAIN RETURN
  // ─────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <PiggyBank className="w-3.5 h-3.5" />
                Universal India Trip Planner & Expense Engine · 100% Free
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                Trip Planner & Budget
                <span className="text-sm font-normal px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Trip Kitne Mein Hogi?
                </span>
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 max-w-2xl">
                Universal search across any Indian city, town or village. Calculate exact realistic budgets, generate AI day-wise itineraries, explore verified eco-stays, book direct transit & split group expenses with instant UPI links.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                Discover Map
              </Link>
              <Link
                href="/advisory"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
              >
                <Mountain className="w-4 h-4 text-amber-400" />
                Road Advisory
              </Link>
            </div>
          </div>
        </div>

        {/* Universal City Search Bar */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Search Destination in India:
            </label>
            <span className="text-[11px] font-mono text-emerald-400">
              Universal All-City Search
            </span>
          </div>

          <CityAutocomplete
            value={searchCityInput}
            onChange={setSearchCityInput}
            onSelect={(suggestion) => {
              setSelectedDest(suggestion.name);
              setSearchCityInput(suggestion.name);
            }}
            placeholder="Search any destination in India (e.g. Pune, Bhopal, Shimla, Manali, Goa, Ayodhya, Shillong, Leh)..."
          />

          {/* Quick Popular Destination Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mr-1">
              Popular:
            </span>
            {popularDestinations.map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setSelectedDest(dest);
                  setSearchCityInput(dest);
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedDest.toLowerCase() === dest.toLowerCase()
                    ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Destination Status Banner */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedDest}
                </h2>
                <span className="rounded-md bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-neutral-700">
                  {currentBenchmark.category}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {currentBenchmark.state}, India · Est. {travelStyle} cost: ₹
                {costPerPerson.toLocaleString("en-IN")}/person for {durationDays} Days
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {liveWeather?.current ? (
              <div className="flex items-center gap-1.5 rounded-xl bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-emerald-400 border border-neutral-800">
                <span>🌤️</span>
                <span>
                  {liveWeather.current.temp}°C · {liveWeather.current.condition}
                </span>
              </div>
            ) : null}

            {crowdData?.destination ? (
              <CrowdBadge
                crowdScore={crowdData.destination.crowd_score}
                size="sm"
              />
            ) : null}

            {[
              "manali",
              "kasol",
              "shimla",
              "munnar",
              "chopta",
              "rishikesh",
              "spiti",
              "leh",
              "kullu",
              "dharamshala",
            ].some((m) => selectedDest.toLowerCase().includes(m)) && (
              <Link
                href="/advisory"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
              >
                <Mountain className="h-3.5 w-3.5 text-amber-400" />
                <span>Road Advisory</span>
              </Link>
            )}

            <Link
              href={`/discover?q=${encodeURIComponent(selectedDest)}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 transition"
            >
              <Compass className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full Guide ➔</span>
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin">
          {[
            { id: "estimator", label: "💰 1. Budget Estimator", icon: Calculator },
            { id: "itinerary", label: `📅 2. AI Itinerary (${durationDays}D)`, icon: Calendar },
            { id: "stays", label: `🏨 3. Verified Stays (${hotelPlaces.length || 3})`, icon: Building },
            { id: "transport", label: "🚆 4. Transport Links", icon: Train },
            { id: "splitter", label: `👥 5. Expense Splitter (${members.length})`, icon: Receipt },
            { id: "all", label: "🌐 All Sections View", icon: Layers },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "estimator" && (
            <motion.div
              key="estimator"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {renderEstimatorSection()}
            </motion.div>
          )}

          {activeTab === "itinerary" && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {renderItinerarySection()}
            </motion.div>
          )}

          {activeTab === "stays" && (
            <motion.div
              key="stays"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {renderStaysSection()}
            </motion.div>
          )}

          {activeTab === "transport" && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {renderTransportSection()}
            </motion.div>
          )}

          {activeTab === "splitter" && (
            <motion.div
              key="splitter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {renderSplitterSection()}
            </motion.div>
          )}

          {activeTab === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-400" />
                  Section 1: Budget Estimator
                </h3>
                {renderEstimatorSection()}
              </div>

              <div className="border-t border-neutral-800 pt-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  Section 2: Day-by-Day AI Itinerary
                </h3>
                {renderItinerarySection()}
              </div>

              <div className="border-t border-neutral-800 pt-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-emerald-400" />
                  Section 3: Verified Stays & Homestays
                </h3>
                {renderStaysSection()}
              </div>

              <div className="border-t border-neutral-800 pt-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Train className="h-5 w-5 text-emerald-400" />
                  Section 4: Direct Transport Booking Links
                </h3>
                {renderTransportSection()}
              </div>

              <div className="border-t border-neutral-800 pt-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-emerald-400" />
                  Section 5: Friend Expense Splitter & Settlement
                </h3>
                {renderSplitterSection()}
              </div>

              <div className="border-t border-neutral-800 pt-10">
                {renderSevaSection()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
