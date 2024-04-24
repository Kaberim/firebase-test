let characters = [
  {name: "Acheron", path: "Nihility", element: "Lightning"},
  {name: "Argenti", path: "Erudition", element: "Physical"},
  {name: "Arlan", path: "Destruction", element: "Lightning"},
  {name: "Asta", path: "Harmony", element: "Fire"},
  {name: "Aventurine", path: "Preservation", element: "Imaginary"},
  {name: "Bailu", path: "Abundance", element: "Lightning"},
  {name: "Black Swan", path: "Nihility", element: "Wind"},
  {name: "Blade", path: "Destruction", element: "Wind"},
  {name: "Bronya", path: "Harmony", element: "Wind"},
  {name: "Clara", path: "Destruction", element: "Physical"},
  {name: "Dan Heng", path: "The Hunt", element: "Wind"},
  {name: "Dan Heng • Imbibitor Lunae", path: "Destruction", element: "Imaginary"},
  {name: "Dr. Ratio", path: "The Hunt", element: "Imaginary"},
  {name: "Fu Xuan", path: "Preservation", element: "Quantum"},
  {name: "Gallagher", path: "Abundance", element: "Fire"},
  {name: "Gepard", path: "Preservation", element: "Ice"},
  {name: "Guinaifen", path: "Nihility", element: "Fire"},
  {name: "Hanya", path: "Harmony", element: "Physical"},
  {name: "Herta", path: "Erudition", element: "Ice"},
  {name: "Himeko", path: "Erudition", element: "Fire"},
  {name: "Hook", path: "Destruction", element: "Fire"},
  {name: "Huohuo", path: "Abundance", element: "Wind"},
  {name: "Jing Yuan", path: "Erudition", element: "Lightning"},
  {name: "Jingliu", path: "Destruction", element: "Ice"},
  {name: "Kafka", path: "Nihility", element: "Lightning"},
  {name: "Luka", path: "Nihility", element: "Physical"},
  {name: "Luocha", path: "Abundance", element: "Imaginary"},
  {name: "Lynx", path: "Abundance", element: "Quantum"},
  {name: "March 7th", path: "Preservation", element: "Ice"},
  {name: "Misha", path: "Destruction", element: "Ice"},
  {name: "Natasha", path: "Abundance", element: "Physical"},
  {name: "Pela", path: "Nihility", element: "Ice"},
  {name: "Qingque", path: "Erudition", element: "Quantum"},
  {name: "Ruan Mei", path: "Harmony", element: "Ice"},
  {name: "Sampo", path: "Nihility", element: "Wind"},
  {name: "Seele", path: "The Hunt", element: "Quantum"},
  {name: "Serval", path: "Erudition", element: "Lightning"},
  {name: "Silver Wolf", path: "Nihility", element: "Quantum"},
  {name: "Sparkle", path: "Harmony", element: "Quantum"},
  {name: "Sushang", path: "The Hunt", element: "Physical"},
  {name: "Tingyun", path: "Harmony", element: "Lightning"},
  {name: "Topaz and Numby", path: "The Hunt", element: "Fire"},
  {name: "Trailblazer", path: "Preservation", element: "Fire"},
  {name: "Trailblazer", path: "Destruction", element: "Physical"},
  {name: "Welt", path: "Nihility", element: "Imaginary"},
  {name: "Xueyi", path: "Destruction", element: "Quantum"},
  {name: "Yanqing", path: "The Hunt", element: "Ice"},  // Fixed element
  {name: "Yukong", path: "Harmony", element: "Imaginary"},
  {name: "Boothill", path: "The Hunt", element: "Physical"},
  {name: "Firefly", path: "Destruction", element: "Fire"},
  {name: "Robin", path: "Harmony", element: "Physical"},
];

let artifactSets = [
  {
    name: "Band of Sizzling Thunder",
    "2 piece": "Increases Lightning DMG by 10%.",
    "4 piece": "When the wearer uses their Skill, increases the wearer's ATK by 20% for 1 turn(s).",
  },
  {
    name: "Champion of Streetwise Boxing",
    "2 piece": "Increases Physical DMG by 10%.",
    "4 piece": "After the wearer attacks or is hit, their ATK increases by 5% for the rest of the battle. This effect can stack up to 5 time(s).",
  },
  {
    name: "Eagle of Twilight Line",
    "2 piece": "Increases Wind DMG by 10%.",
    "4 piece": "After the wearer uses their Ultimate, their action is Advanced Forward by 25%.",
  },
  {
    name: "Firesmith of Lava-Forging",
    "2 piece": "Increases Fire DMG by 10%.",
    "4 piece": "Increases the wearer's Skill DMG by 12%. After unleashing Ultimate, increases the wearer's Fire DMG by 12% for the next attack.",
  },
  {
    name: "Genius of Brilliant Stars",
    "2 piece": "Increases Quantum DMG by 10%.",
    "4 piece": "When the wearer deals DMG to the target enemy, ignores 10% DEF. If the target enemy has Quantum Weakness, the wearer additionally ignores 10% DEF.",
  },
  {
    name: "Guard of Wuthering Snow",
    "2 piece": "Reduces DMG taken by 8%.",
    "4 piece": "At the beginning of the turn, if the wearer's HP is equal to or less than 50%, restores HP equal to 8% of their Max HP and regenerates 5 Energy.",
  },
  {
    name: "Hunter of Glacial Forest",
    "2 piece": "Increases Ice DMG by 10%.",
    "4 piece": "After the wearer uses their Ultimate, their CRIT DMG increases by 25% for 2 turn(s).",
  },
  {
    name: "Knight of Purity Palace",
    "2 piece": "Increases DEF by 15%.",
    "4 piece": "Increases the max DMG that can be absorbed by the Shield created by the wearer by 20%.",
  },
  {
    name: "Longevous Disciple",
    "2 piece": "Increases Max HP by 12%.",
    "4 piece": "When the wearer is hit or has their HP consumed by an ally or themselves, their CRIT Rate increases by 8% for 2 turn(s) and up to 2 stacks.",
  },
  {
    name: "Messenger Traversing Hackerspace",
    "2 piece": "Increases SPD by 6%.",
    "4 piece": "When the wearer uses their Ultimate on an ally, SPD for all allies increases by 12% for 1 turn(s). This effect cannot be stacked.",
  },
  {
    name: "Musketeer of Wild Wheat",
    "2 piece": "ATK increases by 12%.",
    "4 piece": "The wearer's SPD increases by 6% and Basic ATK DMG increases by 10%.",
  },
  {
    name: "Passerby of Wandering Cloud",
    "2 piece": "Increases Outgoing Healing by 10%.",
    "4 piece": "At the beginning of the battle, immediately regenerates 1 Skill Point.",
  },
  {
    name: "Pioneer Diver of Dead Waters",
    "2 piece": "Increases DMG dealt to enemies with debuffs by 12%.",
    "4 piece": "Increases CRIT Rate by 4%. The wearer deals 8%/12% increased CRIT DMG to enemies with at least 2/3 debuffs. After the wearer inflicts a debuff on enemy targets, the aforementioned effects increase by 100%, lasting for 1 turn(s).",
  },
  {
    name: "Prisoner in Deep Confinement",
    "2 piece": "ATK increases by 12%.",
    "4 piece": "For every DoT (Damage over Time) the target enemy is afflicted with, the wearer will ignore 6% of its DEF when dealing DMG to it. This effect is valid for a maximum of 3 DoTs.",
  },
  {
    name: "The Ashblazing Grand Duke",
    "2 piece": "Increases the DMG dealt by follow-up attacks by 20%.",
    "4 piece": "When the wearer uses follow-up attacks, increases the wearer's ATK by 6% for every time the follow-up attack deals DMG. This effect can stack up to 8 times(s) and lasts for 3 turn(s). This effect is removed the next time the wearer uses a follow-up attack.",
  },
  {
    name: "Thief of Shooting Meteor",
    "2 piece": "Increases Break Effect by 16%.",
    "4 piece": "Increases the wearer's Break Effect by 16%. After the wearer inflicts Weakness Break on an enemy, regenerates 3 Energy.",
  },
  {
    name: "Wastelander of Banditry Desert",
    "2 piece": "Increases Imaginary DMG by 10%.",
    "4 piece": "When attacking debuffed enemies, the wearer's CRIT Rate increases by 10%, and their CRIT DMG increases by 20% against Imprisoned enemies.",
  },
  {
    name: "Watchmaker, Master of Dream Machinations",
    "2 piece": "Increases Break Effect by 16%.",
    "4 piece": "When the wearer uses their Ultimate on an ally, all allies' Break Effect increases by 30% for 2 turn(s). This effect cannot be stacked.",
  }
]


const planarOrnamentSets = [
  {
    name: "Belobog of the Architects",
    "2 piece": "Increases the wearer's DEF by 15%. When the wearer's Effect Hit Rate is 50% or higher, the wearer gains an extra 15% DEF.",
  },
  {
    name: "Broken Keel",
    "2 piece": "Increases the wearer's Effect RES by 10%. When the wearer's Effect RES is at 30% or higher, all allies' CRIT DMG increases by 10%.",
  },
  {
    name: "Celestial Differentiator",
    "2 piece": "Increases the wearer's CRIT DMG by 16%. When the wearer's current CRIT DMG reaches 120% or higher, after entering battle, the wearer's CRIT Rate increases by 60% until the end of their first attack.",
  },
  {
    name: "Firmament Frontline: Glamoth",
    "2 piece": "Increases the wearer's ATK by 12%. When the wearer's SPD is equal to or higher than 135/160, the wearer deals 12%/18% more DMG.",
  },
  {
    name: "Fleet of the Ageless",
    "2 piece": "Increases the wearer's Max HP by 12%. When the wearer's SPD reaches 120 or higher, all allies' ATK increases by 8%.",
  },
  {
    name: "Inert Salsotto",
    "2 piece": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 50% or higher, the wearer's Ultimate and follow-up attack DMG increases by 15%.",
  },
  {
    name: "Izumo Gensei and Takama Divine Realm",
    "2 piece": "Increases the wearer's ATK by 12%. When entering battle, if at least one other ally follows the same Path as the wearer, then the wearer's CRIT Rate increases by 12%.",
  },
  {
    name: "Pan-Cosmic Commercial Enterprise",
    "2 piece": "Increases the wearer's Effect Hit Rate by 10%. Meanwhile, the wearer's ATK increases by an amount that is equal to 25% of the current Effect Hit Rate, up to a maximum of 25%.",
  },
  {
    name: "Penacony, Land of the Dreams",
    "2 piece": "Increases wearer's Energy Regeneration Rate by 5%. Increases DMG by 10% for all other allies that are of the same Type as the wearer.",
  },
  {
    name: "Rutilant Arena",
    "2 piece": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 70% or higher, the wearer's Basic ATK and Skill DMG increase by 20%.",
  },
  {
    name: "Sigonia, the Unclaimed Desolation",
    "2 piece": "Increases the wearer's CRIT Rate by 4%. When an enemy target gets defeated, the wearer's CRIT DMG increases by 4%, stacking up to 10 time(s).",
  },
  {
    name: "Space Sealing Station",
    "2 piece": "Increases the wearer's ATK by 12%. When the wearer's SPD reaches 120 or higher, the wearer's ATK increases by an extra 12%.",
  },
  {
    name: "Sprightly Vonwacq",
    "2 piece": "Increases the wearer's Energy Regeneration Rate by 5%. When the wearer's SPD reaches 120 or higher, the wearer's action is Advanced Forward by 40% immediately upon entering battle.",
  },
  {
    name: "Talia: Kingdom of Banditry",
    "2 piece": "Increases the wearer's Break Effect by 16%. When the wearer's SPD reaches 145 or higher, the wearer's Break Effect increases by an extra 20%.",
  },
];
