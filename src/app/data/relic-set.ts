export interface EnteredStatistic{
  statId?: string,
  value?: number
}

export interface EnteredRelic{
  setId?: string,
  mainStat?: EnteredStatistic,
  subStats?: EnteredStatistic[]
}

export interface RelicSet{
  head?: EnteredRelic,
  arms?: EnteredRelic,
  body?: EnteredRelic,
  feet?: EnteredRelic,
  orb?: EnteredRelic,
  rope?: EnteredRelic
}
