export interface EnteredStatistic{
  statId?: string,
  value?: number
}

export interface EnteredRelic{
  setId?: string,
  mainStat?: EnteredStatistic,
  subStats?: EnteredStatistic[]
}

export interface EnteredRelicBase{
  setId?: string
}
export interface CharacterRelicSet {
  head?: EnteredRelicBase,
  arms?: EnteredRelicBase,
  body?: EnteredRelicBase,
  feet?: EnteredRelicBase,
  orb?: EnteredRelicBase,
  rope?: EnteredRelicBase
}

export interface RelicSet {
  id: string,
 '2 piece': string,
 '4 piece': string,
  name: string
}