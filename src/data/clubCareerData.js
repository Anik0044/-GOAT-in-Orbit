export const CLUB_CAREER_DATA = [
  {
    id: "barcelona",
    name: "FC Barcelona",
    period: "2004 - 2021",
    jersey: "Blaugrana Blue & Red",
    totalTrophies: 35,
    tagline: "The Golden Era at Camp Nou",
    image: "/images/barcelona.png",
    fallbackImage: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-600 via-indigo-600 to-rose-700",
    borderColor: "border-blue-500/40",
    glowColor: "rgba(59, 130, 246, 0.35)",
    badgeColor: "bg-gradient-to-r from-blue-600 to-red-600 text-white",
    trophies: [
      { name: "La Liga", count: 10, years: ["2005", "2006", "2009", "2010", "2011", "2013", "2015", "2016", "2018", "2019"] },
      { name: "Supercopa de España", count: 8, years: ["2005", "2006", "2009", "2010", "2011", "2013", "2016", "2018"] },
      { name: "Copa del Rey", count: 7, years: ["2009", "2012", "2015", "2016", "2017", "2018", "2021"] },
      { name: "UEFA Champions League", count: 4, years: ["2006", "2009", "2011", "2015"] },
      { name: "UEFA Super Cup", count: 3, years: ["2009", "2011", "2015"] },
      { name: "FIFA Club World Cup", count: 3, years: ["2009", "2011", "2015"] }
    ]
  },
  {
    id: "psg",
    name: "Paris Saint-Germain",
    period: "2021 - 2023",
    jersey: "Dark Navy Blue",
    totalTrophies: 3,
    tagline: "European Dominance at Parc des Princes",
    image: "/images/psg.png",
    fallbackImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-900 via-sky-800 to-red-800",
    borderColor: "border-blue-700/40",
    glowColor: "rgba(30, 58, 138, 0.35)",
    badgeColor: "bg-gradient-to-r from-blue-900 to-red-700 text-white",
    trophies: [
      { name: "Ligue 1", count: 2, years: ["2022", "2023"] },
      { name: "Trophée des Champions", count: 1, years: ["2022"] }
    ]
  },
  {
    id: "inter-miami",
    name: "Inter Miami CF",
    period: "2023 - Present",
    jersey: "Heron Pink",
    totalTrophies: 2,
    tagline: "Conquering North American Football",
    image: "/images/inter-miami.png",
    fallbackImage: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
    gradient: "from-pink-600 via-rose-500 to-purple-700",
    borderColor: "border-pink-500/40",
    glowColor: "rgba(236, 72, 153, 0.35)",
    badgeColor: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
    trophies: [
      { name: "Leagues Cup", count: 1, years: ["2023"] },
      { name: "Supporters' Shield", count: 1, years: ["2024"] }
    ]
  },
  {
    id: "argentina",
    name: "Argentina National Team",
    period: "2005 - Present",
    jersey: "Sky Blue & White Stripes",
    totalTrophies: 6,
    tagline: "Eternal Glory for La Albiceleste",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    gradient: "from-sky-400 via-blue-500 to-amber-400",
    borderColor: "border-sky-400/40",
    glowColor: "rgba(117, 170, 219, 0.4)",
    badgeColor: "bg-gradient-to-r from-sky-400 to-gold text-space-darker font-bold",
    trophies: [
      { name: "FIFA World Cup", count: 1, years: ["2022"] },
      { name: "Copa América", count: 2, years: ["2021", "2024"] },
      { name: "Finalissima", count: 1, years: ["2022"] },
      { name: "Olympic Gold Medal", count: 1, years: ["2008"] },
      { name: "FIFA U-20 World Cup", count: 1, years: ["2005"] }
    ]
  },
  {
    id: "newells",
    name: "Newell's Old Boys",
    period: "1994 - 2000 (Youth)",
    jersey: "Red & Black Stripes",
    totalTrophies: "Youth Era",
    tagline: "Where the GOAT legend began",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    gradient: "from-red-700 via-neutral-800 to-zinc-900",
    borderColor: "border-red-600/40",
    glowColor: "rgba(220, 38, 38, 0.35)",
    badgeColor: "bg-gradient-to-r from-red-600 to-zinc-800 text-white",
    trophies: [
      { name: "Youth Team Dominance", count: "500+ Goals", years: ["1994 - 2000"] },
      { name: "La Máquina '87", count: "Unbeaten Record", years: ["Rosario Youth League"] }
    ]
  }
];
