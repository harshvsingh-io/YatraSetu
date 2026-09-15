export interface CostTier {
  stayPerNight: number;
  foodPerDay: number;
  localTransportPerDay: number;
  activitiesPerDay: number;
  desc: string;
}

export interface DestinationBenchmark {
  id: string;
  name: string;
  state: string;
  category: string;
  intercityTrainEst: number;
  intercityBusEst: number;
  intercityFlightEst: number;
  tiers: {
    backpacker: CostTier;
    budget: CostTier;
    comfortable: CostTier;
    luxury: CostTier;
  };
  insiderTips: string[];
}

export const DESTINATION_BENCHMARKS: Record<string, DestinationBenchmark> = {
  Manali: {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Hill Station",
    intercityTrainEst: 650,
    intercityBusEst: 1100,
    intercityFlightEst: 5500,
    tiers: {
      backpacker: {
        stayPerNight: 500,
        foodPerDay: 400,
        localTransportPerDay: 200,
        activitiesPerDay: 250,
        desc: "Dorm bed in Old Manali, local siddu/thukpa stalls, shared cabs & scenic foot trails.",
      },
      budget: {
        stayPerNight: 1200,
        foodPerDay: 750,
        localTransportPerDay: 450,
        activitiesPerDay: 600,
        desc: "Clean mountain-view homestay, scooter rental to explore Solang, cozy riverside cafes.",
      },
      comfortable: {
        stayPerNight: 2800,
        foodPerDay: 1300,
        localTransportPerDay: 1100,
        activitiesPerDay: 1400,
        desc: "Private cottage with balcony heater, cab for Atal Tunnel & Sissu, woodfired pizza & trout.",
      },
      luxury: {
        stayPerNight: 7500,
        foodPerDay: 2500,
        localTransportPerDay: 2500,
        activitiesPerDay: 3000,
        desc: "Premium cedarwood chalet, heated pool, private SUV, guided high-altitude explorations.",
      },
    },
    insiderTips: [
      "Stay in Old Manali or Vashisht instead of Mall Road to save 35% on room tariffs.",
      "Rent an Activa/Himalayan at ₹500–₹900/day instead of booking tourist cabs for local transit.",
      "HRTC electric buses ply between Kullu and Manali for just ₹40–₹60.",
    ],
  },
  Goa: {
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    intercityTrainEst: 850,
    intercityBusEst: 1400,
    intercityFlightEst: 4200,
    tiers: {
      backpacker: {
        stayPerNight: 550,
        foodPerDay: 450,
        localTransportPerDay: 250,
        activitiesPerDay: 200,
        desc: "Anjuna/Arambol hostel dorm, beach shack thalis, rented gear.",
      },
      budget: {
        stayPerNight: 1400,
        foodPerDay: 900,
        localTransportPerDay: 450,
        activitiesPerDay: 500,
        desc: "Private beachside cottage/guest room, scooter rental, fish thali restaurants.",
      },
      comfortable: {
        stayPerNight: 3200,
        foodPerDay: 1600,
        localTransportPerDay: 1000,
        activitiesPerDay: 1200,
        desc: "Boutique resort with pool in North/South Goa, rented car, seaside dining.",
      },
      luxury: {
        stayPerNight: 9000,
        foodPerDay: 3000,
        localTransportPerDay: 2800,
        activitiesPerDay: 3500,
        desc: "Heritage Portuguese villa or 5-star beachfront resort, yacht cruise, fine sundowners.",
      },
    },
    insiderTips: [
      "Rent a scooter right at Madgaon / Thivim station (₹350/day) to bypass exorbitant taxi unions.",
      "South Goa (Palolem, Agonda) is 25% cheaper and significantly less crowded than Baga-Calangute.",
      "Local Goan thalis at small eateries like Anand Seafood or Ritz Classic cost ₹180–₹250.",
    ],
  },
  Rishikesh: {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Spiritual & Adventure",
    intercityTrainEst: 450,
    intercityBusEst: 650,
    intercityFlightEst: 3800,
    tiers: {
      backpacker: {
        stayPerNight: 450,
        foodPerDay: 350,
        localTransportPerDay: 150,
        activitiesPerDay: 400,
        desc: "Tapovan dorm, Chotiwala / rooftop cafe meals, shared Vikram autos.",
      },
      budget: {
        stayPerNight: 1100,
        foodPerDay: 700,
        localTransportPerDay: 350,
        activitiesPerDay: 800,
        desc: "Riverside ashram/guesthouse, scooter rental, 16km Ganga rafting.",
      },
      comfortable: {
        stayPerNight: 2600,
        foodPerDay: 1200,
        localTransportPerDay: 800,
        activitiesPerDay: 1600,
        desc: "Luxury Swiss tent or boutique hotel, cliff jumping, bungee jump booking.",
      },
      luxury: {
        stayPerNight: 7000,
        foodPerDay: 2200,
        localTransportPerDay: 2000,
        activitiesPerDay: 3200,
        desc: "Riverside wellness resort (Aloha/Ananda), private yoga sessions, heli-tour.",
      },
    },
    insiderTips: [
      "Book rafting directly with licensed operators in Tapovan rather than through middleman websites for ₹600–₹800.",
      "Ashram stays like Parmarth Niketan or Gita Bhawan offer serene rooms at ₹500–₹1,000/night.",
      "Walk across Ram Jhula / Janki Setu or use ₹20 shared e-rickshaws instead of hiring dedicated cabs.",
    ],
  },
  Jaipur: {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    intercityTrainEst: 350,
    intercityBusEst: 500,
    intercityFlightEst: 3200,
    tiers: {
      backpacker: {
        stayPerNight: 400,
        foodPerDay: 350,
        localTransportPerDay: 180,
        activitiesPerDay: 200,
        desc: "Backpacker hostel near Sindhi Camp, kachori & lassi stalls, Jaipur Metro & e-rickshaws.",
      },
      budget: {
        stayPerNight: 1100,
        foodPerDay: 650,
        localTransportPerDay: 350,
        activitiesPerDay: 450,
        desc: "Traditional haveli guesthouse, Rajasthani thalis, composite monument ticket.",
      },
      comfortable: {
        stayPerNight: 2700,
        foodPerDay: 1200,
        localTransportPerDay: 850,
        activitiesPerDay: 1000,
        desc: "Heritage hotel stay (Civil Lines/Bani Park), AC cab for Amber & Nahargarh.",
      },
      luxury: {
        stayPerNight: 8500,
        foodPerDay: 2400,
        localTransportPerDay: 2400,
        activitiesPerDay: 2500,
        desc: "Royal Palace stay, Chokhi Dhani royal thali, private audio-guided fort tour.",
      },
    },
    insiderTips: [
      "Buy the Department of Archaeology 'Composite Ticket' (₹100 for Indian citizens / ₹400 foreign) covering 8 monuments including Amber, Hawa Mahal, Jantar Mantar.",
      "Use the Pink Line Jaipur Metro between Chandpole and Badi Chaupar for ₹10–₹20.",
      "Famous Rawat Pyaaz Kachori and Lassiwala on MI Road provide world-class food under ₹150.",
    ],
  },
  Varanasi: {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Spiritual & Cultural",
    intercityTrainEst: 500,
    intercityBusEst: 800,
    intercityFlightEst: 3900,
    tiers: {
      backpacker: {
        stayPerNight: 380,
        foodPerDay: 300,
        localTransportPerDay: 150,
        activitiesPerDay: 150,
        desc: "Ghat-side hostel, blue lassi, kachori-jalebi breakfasts, shared boat rides.",
      },
      budget: {
        stayPerNight: 950,
        foodPerDay: 550,
        localTransportPerDay: 300,
        activitiesPerDay: 350,
        desc: "Guesthouse near Assi Ghat, rooftop dining, sunrise rowing boat tour.",
      },
      comfortable: {
        stayPerNight: 2400,
        foodPerDay: 1100,
        localTransportPerDay: 750,
        activitiesPerDay: 800,
        desc: "Heritage hotel overlooking the Ganges, private motorboat for Ganga Aarti.",
      },
      luxury: {
        stayPerNight: 7500,
        foodPerDay: 2200,
        localTransportPerDay: 2000,
        activitiesPerDay: 2200,
        desc: "BrijRama Palace on Darbhanga Ghat, royal Bajra boat ride, private temple VIP darshan.",
      },
    },
    insiderTips: [
      "Negotiate boat rides at Assi Ghat rather than Dashashwamedh: shared sunrise boats are ₹100–₹150/head.",
      "Most central ghats are strictly pedestrian—save money and time by walking the ghat steps instead of auto jams.",
      "Kashi Vishwanath Sugam Darshan tickets can be booked online for ₹300 to skip 3-hour queues.",
    ],
  },
  Hampi: {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    category: "Heritage & Bouldering",
    intercityTrainEst: 600,
    intercityBusEst: 950,
    intercityFlightEst: 4500,
    tiers: {
      backpacker: {
        stayPerNight: 450,
        foodPerDay: 350,
        localTransportPerDay: 150,
        activitiesPerDay: 150,
        desc: "Sanapur / Hippie Island guesthouse, cycle rental, banana flower curry.",
      },
      budget: {
        stayPerNight: 1100,
        foodPerDay: 650,
        localTransportPerDay: 300,
        activitiesPerDay: 300,
        desc: "Homestay near Kamalapur, moped/scooter rental, coracle boat ride.",
      },
      comfortable: {
        stayPerNight: 2800,
        foodPerDay: 1200,
        localTransportPerDay: 800,
        activitiesPerDay: 750,
        desc: "Resort near Tungabhadra river, authorized ASI guide, air-conditioned cab.",
      },
      luxury: {
        stayPerNight: 8500,
        foodPerDay: 2400,
        localTransportPerDay: 2200,
        activitiesPerDay: 2000,
        desc: "Evolve Back Kamalapura Palace or heritage luxury bungalow, sunset safari.",
      },
    },
    insiderTips: [
      "Rent a bicycle for ₹100/day or a moped for ₹350/day to tour the ruins freely at your own pace.",
      "ASI unified monument ticket (₹40 Indian / ₹600 Foreign) covers Vijaya Vittala and Zenana Enclosure on the same day.",
      "Cross the Tungabhadra river on local boats for just ₹20–₹50.",
    ],
  },
  Gokarna: {
    id: "gokarna",
    name: "Gokarna",
    state: "Karnataka",
    category: "Beach & Trekking",
    intercityTrainEst: 750,
    intercityBusEst: 1100,
    intercityFlightEst: 4200,
    tiers: {
      backpacker: {
        stayPerNight: 450,
        foodPerDay: 380,
        localTransportPerDay: 120,
        activitiesPerDay: 100,
        desc: "Kudle / Om beach hut or hostel dorm, beach trek on foot, cafe shacks.",
      },
      budget: {
        stayPerNight: 1200,
        foodPerDay: 750,
        localTransportPerDay: 300,
        activitiesPerDay: 300,
        desc: "Cliffside cottage, scooter rental, temple visits, dolphin boat spotting.",
      },
      comfortable: {
        stayPerNight: 2900,
        foodPerDay: 1300,
        localTransportPerDay: 750,
        activitiesPerDay: 800,
        desc: "Eco-resort with sea view, fresh seafood cafes, private auto excursions.",
      },
      luxury: {
        stayPerNight: 8000,
        foodPerDay: 2400,
        localTransportPerDay: 2200,
        activitiesPerDay: 2200,
        desc: "SwaSwara / Kahani Paradise wellness sanctuary, ayurvedic rejuvenation.",
      },
    },
    insiderTips: [
      "The 5-beach trek (Belekan -> Paradise -> Half Moon -> Om -> Kudle) is completely free and the most breathtaking route in South India.",
      "Stay at Kudle or Main Beach for pocket-friendly stays under ₹800.",
    ],
  },
  Chopta: {
    id: "chopta",
    name: "Chopta & Tungnath",
    state: "Uttarakhand",
    category: "Himalayan Trekking",
    intercityTrainEst: 500,
    intercityBusEst: 750,
    intercityFlightEst: 4000,
    tiers: {
      backpacker: {
        stayPerNight: 400,
        foodPerDay: 350,
        localTransportPerDay: 200,
        activitiesPerDay: 100,
        desc: "Meadow camp or dhabawala room in Chopta, mountain dal-chawal, self-guided trek.",
      },
      budget: {
        stayPerNight: 1000,
        foodPerDay: 600,
        localTransportPerDay: 400,
        activitiesPerDay: 250,
        desc: "Alpine tent with blankets, shared Bolero from Ukhimath/Rudraprayag.",
      },
      comfortable: {
        stayPerNight: 2500,
        foodPerDay: 1000,
        localTransportPerDay: 1000,
        activitiesPerDay: 600,
        desc: "Geodesic glamping dome with heating, trekking poles & local guide to Chandrashila.",
      },
      luxury: {
        stayPerNight: 6500,
        foodPerDay: 1800,
        localTransportPerDay: 2200,
        activitiesPerDay: 1500,
        desc: "Eco luxury resort in Sari / Chopta meadows, private SUV from Haridwar/Dehradun.",
      },
    },
    insiderTips: [
      "There is no electricity grid in Chopta—solar camps run power only for 2-3 hrs. Pack high-capacity power banks.",
      "Carry water purification tablets to avoid buying single-use plastic bottles on the Tungnath trek.",
      "Shared Maxx cabs run from Rishikesh to Ukhimath for ₹350, then Ukhimath to Chopta for ₹80.",
    ],
  },
  Munnar: {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    category: "Tea Gardens & Hills",
    intercityTrainEst: 650,
    intercityBusEst: 900,
    intercityFlightEst: 3800,
    tiers: {
      backpacker: {
        stayPerNight: 500,
        foodPerDay: 380,
        localTransportPerDay: 180,
        activitiesPerDay: 200,
        desc: "Town hostel, KSRTC bus hops, parotta & egg roast at local mess.",
      },
      budget: {
        stayPerNight: 1300,
        foodPerDay: 750,
        localTransportPerDay: 400,
        activitiesPerDay: 450,
        desc: "Tea estate plantation homestay, scooter rental, Eravikulam entry.",
      },
      comfortable: {
        stayPerNight: 3000,
        foodPerDay: 1300,
        localTransportPerDay: 900,
        activitiesPerDay: 900,
        desc: "Valley-view resort, private cab to Top Station and Mattupetty Dam.",
      },
      luxury: {
        stayPerNight: 8500,
        foodPerDay: 2400,
        localTransportPerDay: 2200,
        activitiesPerDay: 2000,
        desc: "Heritage tea planter bungalow, spice garden private walk, private tea tasting.",
      },
    },
    insiderTips: [
      "KSRTC town buses run regularly to Top Station and Marayoor for less than ₹30.",
      "Book Eravikulam National Park tickets online to avoid 1.5 hr ticketing counter rush.",
      "Buy fresh spices and tea directly from KDHP factory outlets at 40% discount versus tourist souvenir stores.",
    ],
  },
  "General India": {
    id: "general",
    name: "Other Indian Destination",
    state: "India",
    category: "Travel Benchmark",
    intercityTrainEst: 600,
    intercityBusEst: 850,
    intercityFlightEst: 4000,
    tiers: {
      backpacker: {
        stayPerNight: 450,
        foodPerDay: 350,
        localTransportPerDay: 150,
        activitiesPerDay: 150,
        desc: "Budget hostel dorm or dharamshala, street food & thalis, public transit.",
      },
      budget: {
        stayPerNight: 1200,
        foodPerDay: 700,
        localTransportPerDay: 350,
        activitiesPerDay: 400,
        desc: "Double room in local guesthouse, cafes and dhabas, two-wheeler rental.",
      },
      comfortable: {
        stayPerNight: 2800,
        foodPerDay: 1300,
        localTransportPerDay: 900,
        activitiesPerDay: 1000,
        desc: "3-star comfortable hotel/homestay, AC transport, top local sights & guides.",
      },
      luxury: {
        stayPerNight: 7500,
        foodPerDay: 2200,
        localTransportPerDay: 2200,
        activitiesPerDay: 2500,
        desc: "4/5-star boutique resort, gourmet dining, dedicated vehicle & premium activities.",
      },
    },
    insiderTips: [
      "Always compare Train (IRCTC Sleeper/3AC) vs sleeper bus 10 days in advance.",
      "Keep 10-15% of your total budget as an emergency buffer for sudden weather or route detours.",
    ],
  },
};
