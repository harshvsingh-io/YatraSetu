"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import {
  DESTINATION_BENCHMARKS,
  DestinationBenchmark,
} from "@/lib/budget-benchmarks";

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

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<"estimator" | "splitter">("estimator");

  // ─────────────────────────────────────────────────────────────
  // TAB 1: ESTIMATOR STATE
  // ─────────────────────────────────────────────────────────────
  const destinationKeys = Object.keys(DESTINATION_BENCHMARKS);
  const [selectedDest, setSelectedDest] = useState<string>("Manali");
  const [durationDays, setDurationDays] = useState<number>(4);
  const [travelersCount, setTravelersCount] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("budget");
  const [transitMode, setTransitMode] = useState<TransitMode>("bus");
  const [includeBuffer, setIncludeBuffer] = useState<boolean>(true);

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
    DESTINATION_BENCHMARKS[selectedDest] || DESTINATION_BENCHMARKS["General India"];
  const currentTier = currentBenchmark.tiers[travelStyle];

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

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <PiggyBank className="w-3.5 h-3.5" />
              100% Free · Real Indian Benchmarks · Zero Ads
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Trip Budget & Splitter
              <span className="text-sm font-normal px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                Trip Kitne Mein Hogi?
              </span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
              Calculate accurate, realistic costs for destinations across India
              with live transport, dorm/hotel, and food estimates — plus instant
              Splitwise-style group settlement with direct UPI links.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Explore Places
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
            >
              Weather Advisory
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("estimator")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "estimator"
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <Calculator className="w-4 h-4" />
            1. Trip Budget Estimator
          </button>
          <button
            onClick={() => setActiveTab("splitter")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "splitter"
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <Receipt className="w-4 h-4" />
            2. Friend Expense Splitter ({members.length} Friends)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "estimator" ? (
            <motion.div
              key="estimator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN: Controls & Options (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Destination & Quick Stats */}
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Step 1: Choose Destination
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {destinationKeys.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => setSelectedDest(dest)}
                        className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition truncate ${
                          selectedDest === dest
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

                {/* Duration & Travelers Sliders */}
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

                {/* Travel Style Selection */}
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

                {/* Intercity Transit Mode */}
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
                            ? "bg-emerald-500/10 border-emerald-500 text-white font-semibold"
                            : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                        }`}
                      >
                        <div className="text-xs font-semibold">{mode.label}</div>
                        <div className="text-[11px] text-emerald-400 mt-0.5">
                          {mode.cost}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={includeBuffer}
                        onChange={(e) => setIncludeBuffer(e.target.checked)}
                        className="rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4 bg-neutral-950"
                      />
                      Include 12% Hidden Contingency / Emergency Buffer (Recommended)
                    </label>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Total Estimation Receipt Card (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Grand Total Card */}
                <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Estimated Total Trip Cost
                    </span>
                    <span className="text-xs text-neutral-400">
                      {selectedDest} · {durationDays}D
                    </span>
                  </div>

                  <div className="my-6">
                    <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm font-medium text-emerald-400 mt-2 flex items-center gap-2">
                      <span>
                        ≈ ₹{costPerPerson.toLocaleString("en-IN")} per person
                      </span>
                      {travelersCount > 1 && (
                        <span className="text-xs text-neutral-400">
                          (for {travelersCount} travelers)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Itemized Cost Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-sky-400" />
                        Accommodation ({nights}N, {roomsNeeded}{" "}
                        {travelStyle === "backpacker" ? "beds" : "rooms"})
                      </span>
                      <span className="font-semibold text-white">
                        ₹{totalStayCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-amber-400" />
                        Food & Dining ({durationDays} days)
                      </span>
                      <span className="font-semibold text-white">
                        ₹{totalFoodCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-emerald-400" />
                        Intercity Transit ({transitMode.toUpperCase()})
                      </span>
                      <span className="font-semibold text-white">
                        ₹{totalTransitCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-purple-400" />
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
            </motion.div>
          ) : (
            <motion.div
              key="splitter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
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
                          placeholder="e.g. 2400"
                          value={expenseAmount}
                          onChange={(e) => setExpenseAmount(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1">
                          Paid By
                        </label>
                        <select
                          value={expensePaidBy}
                          onChange={(e) => setExpensePaidBy(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                            setExpenseCategory(
                              e.target.value as ExpenseItem["category"]
                            )
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="food">Food & Drinks</option>
                          <option value="stay">Stay / Hotel</option>
                          <option value="transport">Transport / Fuel</option>
                          <option value="activity">Activities / Entry</option>
                          <option value="other">Miscellaneous</option>
                        </select>
                      </div>
                    </div>

                    {/* Split Among checkboxes */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-neutral-400">
                          Split Between ({expenseSplitAmong.length} selected):
                        </label>
                        <button
                          type="button"
                          onClick={() => setExpenseSplitAmong([...members])}
                          className="text-[11px] text-emerald-400 hover:underline"
                        >
                          Select All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {members.map((member) => {
                          const isChecked = expenseSplitAmong.includes(member);
                          return (
                            <button
                              type="button"
                              key={member}
                              onClick={() => {
                                if (isChecked) {
                                  if (expenseSplitAmong.length > 1) {
                                    setExpenseSplitAmong(
                                      expenseSplitAmong.filter((m) => m !== member)
                                    );
                                  }
                                } else {
                                  setExpenseSplitAmong([
                                    ...expenseSplitAmong,
                                    member,
                                  ]);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                                isChecked
                                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold"
                                  : "bg-neutral-950 border-neutral-800 text-neutral-400"
                              }`}
                            >
                              {member} {isChecked ? "✓" : "+"}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      Add Expense
                    </button>
                  </form>
                </div>

                {/* Expense History List */}
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                      Logged Expenses ({expenses.length})
                    </h3>
                    <span className="text-xs font-bold text-emerald-400">
                      Total: ₹{totalGroupSpent.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {expenses.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500 text-xs">
                      No expenses logged yet. Add your first expense above!
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {expenses.map((exp) => (
                        <div
                          key={exp.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-white">
                              {exp.title}
                            </div>
                            <div className="text-neutral-400 text-[11px]">
                              Paid by{" "}
                              <strong className="text-emerald-400">
                                {exp.paidBy}
                              </strong>{" "}
                              · Split by {exp.splitAmong.length} (₹
                              {Math.round(exp.amount / exp.splitAmong.length)}/head)
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-white">
                              ₹{exp.amount}
                            </span>
                            <button
                              onClick={() => handleDeleteExpense(exp.id)}
                              className="text-neutral-600 hover:text-rose-400 transition"
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
                {/* Settlement Card */}
                <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative">
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
                      Formats with clean bullets, group totals, and direct UPI pay
                      links.
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
                    local cache. No logins or credit cards required. Works
                    offline on mountain treks.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
