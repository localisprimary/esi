// Auto-generated TypeScript types for EVE ESI API
export interface EsiResponse<TData, THeaders = Record<string, string>> {
  data: TData
  status: number
  headers: THeaders
}

export interface EsiError {
  error: string
  status: number
}

export type AcceptLanguage =
  | 'en'
  | 'de'
  | 'fr'
  | 'ja'
  | 'ru'
  | 'zh'
  | 'ko'
  | 'es'
export type CompatibilityDate = '2020-01-01'
export type IfModifiedSince = string
export type IfNoneMatch = string
export type Tenant = string

export type GetAlliancesResponse = number[]

export interface GetAlliancesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type CorporationID = number

export type CharacterID = number

export type FactionID = number

export interface GetAllianceResponse {
  creator_corporation_id: CorporationID
  creator_id: CharacterID
  date_founded: string
  executor_corporation_id?: CorporationID
  faction_id?: FactionID
  name: string
  ticker: string
}

export interface GetAllianceParams {
  alliance_id: number | string
}

export interface GetAllianceResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetAllianceContactsResponse = {
  contact_id: number
  contact_type: 'character' | 'corporation' | 'alliance' | 'faction'
  label_ids: number[]
  standing: number
}[]

export interface GetAllianceContactsParams {
  alliance_id: number | string
  page?: number
}

export interface GetAllianceContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetAllianceContactsLabelsResponse = {
  label_id: number
  label_name: string
}[]

export interface GetAllianceContactsLabelsParams {
  alliance_id: number | string
}

export interface GetAllianceContactsLabelsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetAllianceCorporationsResponse = number[]

export interface GetAllianceCorporationsParams {
  alliance_id: number | string
}

export interface GetAllianceCorporationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetAllianceIconsResponse {
  px128x128?: string
  px64x64?: string
}

export interface GetAllianceIconsParams {
  alliance_id: number | string
}

export interface GetAllianceIconsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCharactersAffiliationResponse = {
  alliance_id: number
  character_id: number
  corporation_id: number
  faction_id: number
}[]

export interface PostCharactersAffiliationParams {
  body: number[]
}

export interface PostCharactersAffiliationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type AllianceID = number

export type BloodlineID = number

export type RaceID = number

export interface GetCharacterResponse {
  alliance_id?: AllianceID
  birthday: string
  bloodline_id: BloodlineID
  corporation_id: CorporationID
  description?: string
  faction_id?: FactionID
  gender: 'male' | 'female'
  name: string
  race_id: RaceID
  security_status?: number
  title?: string
}

export interface GetCharacterParams {
  character_id: number | string
}

export interface GetCharacterResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterAgentsResearchResponse = {
  agent_id: number
  points_per_day: number
  remainder_points: number
  skill_type_id: number
  started_at: string
}[]

export interface GetCharacterAgentsResearchParams {
  character_id: number | string
}

export interface GetCharacterAgentsResearchResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterAssetsResponse = {
  is_blueprint_copy: boolean
  is_singleton: boolean
  item_id: number
  location_flag:
    | 'AssetSafety'
    | 'AutoFit'
    | 'BoosterBay'
    | 'CapsuleerDeliveries'
    | 'Cargo'
    | 'CorporationGoalDeliveries'
    | 'CorpseBay'
    | 'Deliveries'
    | 'DroneBay'
    | 'ExpeditionHold'
    | 'FighterBay'
    | 'FighterTube0'
    | 'FighterTube1'
    | 'FighterTube2'
    | 'FighterTube3'
    | 'FighterTube4'
    | 'FleetHangar'
    | 'FrigateEscapeBay'
    | 'Hangar'
    | 'HangarAll'
    | 'HiSlot0'
    | 'HiSlot1'
    | 'HiSlot2'
    | 'HiSlot3'
    | 'HiSlot4'
    | 'HiSlot5'
    | 'HiSlot6'
    | 'HiSlot7'
    | 'HiddenModifiers'
    | 'Implant'
    | 'InfrastructureHangar'
    | 'LoSlot0'
    | 'LoSlot1'
    | 'LoSlot2'
    | 'LoSlot3'
    | 'LoSlot4'
    | 'LoSlot5'
    | 'LoSlot6'
    | 'LoSlot7'
    | 'Locked'
    | 'MedSlot0'
    | 'MedSlot1'
    | 'MedSlot2'
    | 'MedSlot3'
    | 'MedSlot4'
    | 'MedSlot5'
    | 'MedSlot6'
    | 'MedSlot7'
    | 'MobileDepotHold'
    | 'MoonMaterialBay'
    | 'QuafeBay'
    | 'RigSlot0'
    | 'RigSlot1'
    | 'RigSlot2'
    | 'RigSlot3'
    | 'RigSlot4'
    | 'RigSlot5'
    | 'RigSlot6'
    | 'RigSlot7'
    | 'ShipHangar'
    | 'Skill'
    | 'SpecializedAmmoHold'
    | 'SpecializedAsteroidHold'
    | 'SpecializedCommandCenterHold'
    | 'SpecializedFuelBay'
    | 'SpecializedGasHold'
    | 'SpecializedIceHold'
    | 'SpecializedIndustrialShipHold'
    | 'SpecializedLargeShipHold'
    | 'SpecializedMaterialBay'
    | 'SpecializedMediumShipHold'
    | 'SpecializedMineralHold'
    | 'SpecializedOreHold'
    | 'SpecializedPlanetaryCommoditiesHold'
    | 'SpecializedSalvageHold'
    | 'SpecializedShipHold'
    | 'SpecializedSmallShipHold'
    | 'StructureDeedBay'
    | 'SubSystemBay'
    | 'SubSystemSlot0'
    | 'SubSystemSlot1'
    | 'SubSystemSlot2'
    | 'SubSystemSlot3'
    | 'SubSystemSlot4'
    | 'SubSystemSlot5'
    | 'SubSystemSlot6'
    | 'SubSystemSlot7'
    | 'Unlocked'
    | 'Wardrobe'
  location_id: number
  location_type: 'station' | 'solar_system' | 'item' | 'other'
  quantity: number
  type_id: number
}[]

export interface GetCharacterAssetsParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterAssetsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type PostCharacterAssetsLocationsResponse = {
  item_id: number
  position: { x: number; y: number; z: number }
}[]

export interface PostCharacterAssetsLocationsParams {
  character_id: number | string
  body: number[]
}

export interface PostCharacterAssetsLocationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCharacterAssetsNamesResponse = {
  item_id: number
  name: string
}[]

export interface PostCharacterAssetsNamesParams {
  character_id: number | string
  body: number[]
}

export interface PostCharacterAssetsNamesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterAttributesResponse {
  accrued_remap_cooldown_date?: string
  bonus_remaps?: number
  charisma: number
  intelligence: number
  last_remap_date?: string
  memory: number
  perception: number
  willpower: number
}

export interface GetCharacterAttributesParams {
  character_id: number | string
}

export interface GetCharacterAttributesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterBlueprintsResponse = {
  item_id: number
  location_flag:
    | 'AutoFit'
    | 'Cargo'
    | 'CorpseBay'
    | 'DroneBay'
    | 'FleetHangar'
    | 'Deliveries'
    | 'HiddenModifiers'
    | 'Hangar'
    | 'HangarAll'
    | 'LoSlot0'
    | 'LoSlot1'
    | 'LoSlot2'
    | 'LoSlot3'
    | 'LoSlot4'
    | 'LoSlot5'
    | 'LoSlot6'
    | 'LoSlot7'
    | 'MedSlot0'
    | 'MedSlot1'
    | 'MedSlot2'
    | 'MedSlot3'
    | 'MedSlot4'
    | 'MedSlot5'
    | 'MedSlot6'
    | 'MedSlot7'
    | 'HiSlot0'
    | 'HiSlot1'
    | 'HiSlot2'
    | 'HiSlot3'
    | 'HiSlot4'
    | 'HiSlot5'
    | 'HiSlot6'
    | 'HiSlot7'
    | 'AssetSafety'
    | 'Locked'
    | 'Unlocked'
    | 'Implant'
    | 'QuafeBay'
    | 'RigSlot0'
    | 'RigSlot1'
    | 'RigSlot2'
    | 'RigSlot3'
    | 'RigSlot4'
    | 'RigSlot5'
    | 'RigSlot6'
    | 'RigSlot7'
    | 'ShipHangar'
    | 'SpecializedFuelBay'
    | 'SpecializedOreHold'
    | 'SpecializedGasHold'
    | 'SpecializedMineralHold'
    | 'SpecializedSalvageHold'
    | 'SpecializedShipHold'
    | 'SpecializedSmallShipHold'
    | 'SpecializedMediumShipHold'
    | 'SpecializedLargeShipHold'
    | 'SpecializedIndustrialShipHold'
    | 'SpecializedAmmoHold'
    | 'SpecializedCommandCenterHold'
    | 'SpecializedPlanetaryCommoditiesHold'
    | 'SpecializedMaterialBay'
    | 'SubSystemSlot0'
    | 'SubSystemSlot1'
    | 'SubSystemSlot2'
    | 'SubSystemSlot3'
    | 'SubSystemSlot4'
    | 'SubSystemSlot5'
    | 'SubSystemSlot6'
    | 'SubSystemSlot7'
    | 'FighterBay'
    | 'FighterTube0'
    | 'FighterTube1'
    | 'FighterTube2'
    | 'FighterTube3'
    | 'FighterTube4'
    | 'Module'
  location_id: number
  material_efficiency: number
  quantity: number
  runs: number
  time_efficiency: number
  type_id: number
}[]

export interface GetCharacterBlueprintsParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterBlueprintsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCharacterCalendarResponse = {
  event_date: string
  event_id: number
  event_response: 'declined' | 'not_responded' | 'accepted' | 'tentative'
  importance: number
  title: string
}[]

export interface GetCharacterCalendarParams {
  character_id: number | string
  from_event?: number
}

export interface GetCharacterCalendarResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterCalendarEventIdResponse {
  date: string
  duration: number
  event_id: number
  importance: number
  owner_id: number
  owner_name: string
  owner_type:
    | 'eve_server'
    | 'corporation'
    | 'faction'
    | 'character'
    | 'alliance'
  response: string
  text: string
  title: string
}

export interface GetCharacterCalendarEventIdParams {
  character_id: number | string
  event_id: number | string
}

export interface GetCharacterCalendarEventIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutCharacterCalendarEventIdParams {
  character_id: number | string
  event_id: number | string
  response: 'accepted' | 'declined' | 'tentative'
}

export interface PutCharacterCalendarEventIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterCalendarEventAttendeesResponse = {
  character_id: number
  event_response: 'declined' | 'not_responded' | 'accepted' | 'tentative'
}[]

export interface GetCharacterCalendarEventAttendeesParams {
  character_id: number | string
  event_id: number | string
}

export interface GetCharacterCalendarEventAttendeesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterClonesResponse {
  home_location?: {
    location_id: number
    location_type: 'station' | 'structure'
  }
  jump_clones: {
    implants: number[]
    jump_clone_id: number
    location_id: number
    location_type: 'station' | 'structure'
    name: string
  }[]
  last_clone_jump_date?: string
  last_station_change_date?: string
}

export interface GetCharacterClonesParams {
  character_id: number | string
}

export interface GetCharacterClonesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteCharacterContactsParams {
  character_id: number | string
  contact_ids?: number[]
}

export interface DeleteCharacterContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterContactsResponse = {
  contact_id: number
  contact_type: 'character' | 'corporation' | 'alliance' | 'faction'
  is_blocked: boolean
  is_watched: boolean
  label_ids: number[]
  standing: number
}[]

export interface GetCharacterContactsParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type PostCharacterContactsResponse = number[]

export interface PostCharacterContactsParams {
  character_id: number | string
  label_ids?: number[]
  standing?: number
  watched?: boolean
  body: number[]
}

export interface PostCharacterContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutCharacterContactsParams {
  character_id: number | string
  label_ids?: number[]
  standing?: number
  watched?: boolean
  body: number[]
}

export interface PutCharacterContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterContactsLabelsResponse = {
  label_id: number
  label_name: string
}[]

export interface GetCharacterContactsLabelsParams {
  character_id: number | string
}

export interface GetCharacterContactsLabelsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterContractsResponse = {
  acceptor_id: number
  assignee_id: number
  availability: 'public' | 'personal' | 'corporation' | 'alliance'
  buyout: number
  collateral: number
  contract_id: number
  date_accepted: string
  date_completed: string
  date_expired: string
  date_issued: string
  days_to_complete: number
  end_location_id: number
  for_corporation: boolean
  issuer_corporation_id: number
  issuer_id: number
  price: number
  reward: number
  start_location_id: number
  status:
    | 'outstanding'
    | 'in_progress'
    | 'finished_issuer'
    | 'finished_contractor'
    | 'finished'
    | 'cancelled'
    | 'rejected'
    | 'failed'
    | 'deleted'
    | 'reversed'
  title: string
  type: 'unknown' | 'item_exchange' | 'auction' | 'courier' | 'loan'
  volume: number
}[]

export interface GetCharacterContractsParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterContractsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCharacterContractBidsResponse = {
  amount: number
  bid_id: number
  bidder_id: number
  date_bid: string
}[]

export interface GetCharacterContractBidsParams {
  character_id: number | string
  contract_id: number | string
}

export interface GetCharacterContractBidsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterContractItemsResponse = {
  is_included: boolean
  is_singleton: boolean
  quantity: number
  raw_quantity: number
  record_id: number
  type_id: number
}[]

export interface GetCharacterContractItemsParams {
  character_id: number | string
  contract_id: number | string
}

export interface GetCharacterContractItemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterCorporationhistoryResponse = {
  corporation_id: number
  is_deleted: boolean
  record_id: number
  start_date: string
}[]

export interface GetCharacterCorporationhistoryParams {
  character_id: number | string
}

export interface GetCharacterCorporationhistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCharacterCspaResponse = number

export interface PostCharacterCspaParams {
  character_id: number | string
  body: number[]
}

export interface PostCharacterCspaResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterFatigueResponse {
  jump_fatigue_expire_date?: string
  last_jump_date?: string
  last_update_date?: string
}

export interface GetCharacterFatigueParams {
  character_id: number | string
}

export interface GetCharacterFatigueResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterFittingsResponse = {
  description: string
  fitting_id: number
  items: {
    flag:
      | 'Cargo'
      | 'DroneBay'
      | 'FighterBay'
      | 'HiSlot0'
      | 'HiSlot1'
      | 'HiSlot2'
      | 'HiSlot3'
      | 'HiSlot4'
      | 'HiSlot5'
      | 'HiSlot6'
      | 'HiSlot7'
      | 'Invalid'
      | 'LoSlot0'
      | 'LoSlot1'
      | 'LoSlot2'
      | 'LoSlot3'
      | 'LoSlot4'
      | 'LoSlot5'
      | 'LoSlot6'
      | 'LoSlot7'
      | 'MedSlot0'
      | 'MedSlot1'
      | 'MedSlot2'
      | 'MedSlot3'
      | 'MedSlot4'
      | 'MedSlot5'
      | 'MedSlot6'
      | 'MedSlot7'
      | 'RigSlot0'
      | 'RigSlot1'
      | 'RigSlot2'
      | 'ServiceSlot0'
      | 'ServiceSlot1'
      | 'ServiceSlot2'
      | 'ServiceSlot3'
      | 'ServiceSlot4'
      | 'ServiceSlot5'
      | 'ServiceSlot6'
      | 'ServiceSlot7'
      | 'SubSystemSlot0'
      | 'SubSystemSlot1'
      | 'SubSystemSlot2'
      | 'SubSystemSlot3'
    quantity: number
    type_id: number
  }[]
  name: string
  ship_type_id: number
}[]

export interface GetCharacterFittingsParams {
  character_id: number | string
}

export interface GetCharacterFittingsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostCharacterFittingsResponse {
  fitting_id: number
}

export interface PostCharacterFittingsParams {
  character_id: number | string
  description: string
  items: {
    flag:
      | 'Cargo'
      | 'DroneBay'
      | 'FighterBay'
      | 'HiSlot0'
      | 'HiSlot1'
      | 'HiSlot2'
      | 'HiSlot3'
      | 'HiSlot4'
      | 'HiSlot5'
      | 'HiSlot6'
      | 'HiSlot7'
      | 'Invalid'
      | 'LoSlot0'
      | 'LoSlot1'
      | 'LoSlot2'
      | 'LoSlot3'
      | 'LoSlot4'
      | 'LoSlot5'
      | 'LoSlot6'
      | 'LoSlot7'
      | 'MedSlot0'
      | 'MedSlot1'
      | 'MedSlot2'
      | 'MedSlot3'
      | 'MedSlot4'
      | 'MedSlot5'
      | 'MedSlot6'
      | 'MedSlot7'
      | 'RigSlot0'
      | 'RigSlot1'
      | 'RigSlot2'
      | 'ServiceSlot0'
      | 'ServiceSlot1'
      | 'ServiceSlot2'
      | 'ServiceSlot3'
      | 'ServiceSlot4'
      | 'ServiceSlot5'
      | 'ServiceSlot6'
      | 'ServiceSlot7'
      | 'SubSystemSlot0'
      | 'SubSystemSlot1'
      | 'SubSystemSlot2'
      | 'SubSystemSlot3'
    quantity: number
    type_id: number
  }[]
  name: string
  ship_type_id: number
}

export interface PostCharacterFittingsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteCharacterFittingParams {
  character_id: number | string
  fitting_id: number | string
}

export interface DeleteCharacterFittingResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterFleetResponse {
  fleet_boss_id: number
  fleet_id: number
  role:
    | 'fleet_commander'
    | 'squad_commander'
    | 'squad_member'
    | 'wing_commander'
  squad_id: number
  wing_id: number
}

export interface GetCharacterFleetParams {
  character_id: number | string
}

export interface GetCharacterFleetResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterFwStatsResponse {
  current_rank?: number
  enlisted_on?: string
  faction_id?: number
  highest_rank?: number
  kills: { last_week: number; total: number; yesterday: number }
  victory_points: { last_week: number; total: number; yesterday: number }
}

export interface GetCharacterFwStatsParams {
  character_id: number | string
}

export interface GetCharacterFwStatsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterImplantsResponse = number[]

export interface GetCharacterImplantsParams {
  character_id: number | string
}

export interface GetCharacterImplantsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterIndustryJobsResponse = {
  activity_id: number
  blueprint_id: number
  blueprint_location_id: number
  blueprint_type_id: number
  completed_character_id: number
  completed_date: string
  cost: number
  duration: number
  end_date: string
  facility_id: number
  installer_id: number
  job_id: number
  licensed_runs: number
  output_location_id: number
  pause_date: string
  probability: number
  product_type_id: number
  runs: number
  start_date: string
  station_id: number
  status: 'active' | 'cancelled' | 'delivered' | 'paused' | 'ready' | 'reverted'
  successful_runs: number
}[]

export interface GetCharacterIndustryJobsParams {
  character_id: number | string
  include_completed?: boolean
}

export interface GetCharacterIndustryJobsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterKillmailsRecentResponse = {
  killmail_hash: string
  killmail_id: number
}[]

export interface GetCharacterKillmailsRecentParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterKillmailsRecentResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetCharacterLocationResponse {
  solar_system_id: number
  station_id?: number
  structure_id?: number
}

export interface GetCharacterLocationParams {
  character_id: number | string
}

export interface GetCharacterLocationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterLoyaltyPointsResponse = {
  corporation_id: number
  loyalty_points: number
}[]

export interface GetCharacterLoyaltyPointsParams {
  character_id: number | string
}

export interface GetCharacterLoyaltyPointsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterMailResponse = {
  from: number
  is_read: boolean
  labels: number[]
  mail_id: number
  recipients: {
    recipient_id: number
    recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list'
  }[]
  subject: string
  timestamp: string
}[]

export interface GetCharacterMailParams {
  character_id: number | string
  labels?: number[]
  last_mail_id?: number
}

export interface GetCharacterMailResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCharacterMailResponse = number

export interface PostCharacterMailParams {
  character_id: number | string
  approved_cost?: number
  body: string
  recipients: {
    recipient_id: number
    recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list'
  }[]
  subject: string
}

export interface PostCharacterMailResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterMailLabelsResponse {
  labels?: {
    color:
      | '#0000fe'
      | '#006634'
      | '#0099ff'
      | '#00ff33'
      | '#01ffff'
      | '#349800'
      | '#660066'
      | '#666666'
      | '#999999'
      | '#99ffff'
      | '#9a0000'
      | '#ccff9a'
      | '#e6e6e6'
      | '#fe0000'
      | '#ff6600'
      | '#ffff01'
      | '#ffffcd'
      | '#ffffff'
    label_id: number
    name: string
    unread_count: number
  }[]
  total_unread_count?: number
}

export interface GetCharacterMailLabelsParams {
  character_id: number | string
}

export interface GetCharacterMailLabelsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCharacterMailLabelsResponse = number

export interface PostCharacterMailLabelsParams {
  character_id: number | string
  color?:
    | '#0000fe'
    | '#006634'
    | '#0099ff'
    | '#00ff33'
    | '#01ffff'
    | '#349800'
    | '#660066'
    | '#666666'
    | '#999999'
    | '#99ffff'
    | '#9a0000'
    | '#ccff9a'
    | '#e6e6e6'
    | '#fe0000'
    | '#ff6600'
    | '#ffff01'
    | '#ffffcd'
    | '#ffffff'
  name: string
}

export interface PostCharacterMailLabelsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteCharacterMailLabelParams {
  character_id: number | string
  label_id: number | string
}

export interface DeleteCharacterMailLabelResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterMailListsResponse = {
  mailing_list_id: number
  name: string
}[]

export interface GetCharacterMailListsParams {
  character_id: number | string
}

export interface GetCharacterMailListsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteCharacterMailMailIdParams {
  character_id: number | string
  mail_id: number | string
}

export interface DeleteCharacterMailMailIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterMailMailIdResponse {
  body?: string
  from?: number
  labels?: number[]
  read?: boolean
  recipients?: {
    recipient_id: number
    recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list'
  }[]
  subject?: string
  timestamp?: string
}

export interface GetCharacterMailMailIdParams {
  character_id: number | string
  mail_id: number | string
}

export interface GetCharacterMailMailIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutCharacterMailMailIdParams {
  character_id: number | string
  mail_id: number | string
  labels?: number[]
  read?: boolean
}

export interface PutCharacterMailMailIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterMedalsResponse = {
  corporation_id: number
  date: string
  description: string
  graphics: { color: number; graphic: string; layer: number; part: number }[]
  issuer_id: number
  medal_id: number
  reason: string
  status: 'public' | 'private'
  title: string
}[]

export interface GetCharacterMedalsParams {
  character_id: number | string
}

export interface GetCharacterMedalsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterMiningResponse = {
  date: string
  quantity: number
  solar_system_id: number
  type_id: number
}[]

export interface GetCharacterMiningParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterMiningResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCharacterNotificationsResponse = {
  is_read: boolean
  notification_id: number
  sender_id: number
  sender_type: 'character' | 'corporation' | 'alliance' | 'faction' | 'other'
  text: string
  timestamp: string
  type:
    | 'AcceptedAlly'
    | 'AcceptedSurrender'
    | 'AgentRetiredTrigravian'
    | 'AllAnchoringMsg'
    | 'AllMaintenanceBillMsg'
    | 'AllStrucInvulnerableMsg'
    | 'AllStructVulnerableMsg'
    | 'AllWarCorpJoinedAllianceMsg'
    | 'AllWarDeclaredMsg'
    | 'AllWarInvalidatedMsg'
    | 'AllWarRetractedMsg'
    | 'AllWarSurrenderMsg'
    | 'AllianceCapitalChanged'
    | 'AllianceWarDeclaredV2'
    | 'AllyContractCancelled'
    | 'AllyJoinedWarAggressorMsg'
    | 'AllyJoinedWarAllyMsg'
    | 'AllyJoinedWarDefenderMsg'
    | 'BattlePunishFriendlyFire'
    | 'BillOutOfMoneyMsg'
    | 'BillPaidCorpAllMsg'
    | 'BountyClaimMsg'
    | 'BountyESSShared'
    | 'BountyESSTaken'
    | 'BountyPlacedAlliance'
    | 'BountyPlacedChar'
    | 'BountyPlacedCorp'
    | 'BountyYourBountyClaimed'
    | 'BuddyConnectContactAdd'
    | 'CharAppAcceptMsg'
    | 'CharAppRejectMsg'
    | 'CharAppWithdrawMsg'
    | 'CharLeftCorpMsg'
    | 'CharMedalMsg'
    | 'CharTerminationMsg'
    | 'CloneActivationMsg'
    | 'CloneActivationMsg2'
    | 'CloneMovedMsg'
    | 'CloneRevokedMsg1'
    | 'CloneRevokedMsg2'
    | 'CombatOperationFinished'
    | 'ContactAdd'
    | 'ContactEdit'
    | 'ContainerPasswordMsg'
    | 'ContractRegionChangedToPochven'
    | 'CorpAllBillMsg'
    | 'CorpAppAcceptMsg'
    | 'CorpAppInvitedMsg'
    | 'CorpAppNewMsg'
    | 'CorpAppRejectCustomMsg'
    | 'CorpAppRejectMsg'
    | 'CorpBecameWarEligible'
    | 'CorpDividendMsg'
    | 'CorpFriendlyFireDisableTimerCompleted'
    | 'CorpFriendlyFireDisableTimerStarted'
    | 'CorpFriendlyFireEnableTimerCompleted'
    | 'CorpFriendlyFireEnableTimerStarted'
    | 'CorpKicked'
    | 'CorpLiquidationMsg'
    | 'CorpNewCEOMsg'
    | 'CorpNewsMsg'
    | 'CorpNoLongerWarEligible'
    | 'CorpOfficeExpirationMsg'
    | 'CorpStructLostMsg'
    | 'CorpTaxChangeMsg'
    | 'CorpVoteCEORevokedMsg'
    | 'CorpVoteMsg'
    | 'CorpWarDeclaredMsg'
    | 'CorpWarDeclaredV2'
    | 'CorpWarFightingLegalMsg'
    | 'CorpWarInvalidatedMsg'
    | 'CorpWarRetractedMsg'
    | 'CorpWarSurrenderMsg'
    | 'CorporationGoalClosed'
    | 'CorporationGoalCompleted'
    | 'CorporationGoalCreated'
    | 'CorporationGoalExpired'
    | 'CorporationGoalLimitReached'
    | 'CorporationGoalNameChange'
    | 'CorporationLeft'
    | 'CustomsMsg'
    | 'DailyItemRewardAutoClaimed'
    | 'DeclareWar'
    | 'DistrictAttacked'
    | 'DustAppAcceptedMsg'
    | 'ESSMainBankLink'
    | 'EntosisCaptureStarted'
    | 'ExpertSystemExpired'
    | 'ExpertSystemExpiryImminent'
    | 'FWAllianceKickMsg'
    | 'FWAllianceWarningMsg'
    | 'FWCharKickMsg'
    | 'FWCharRankGainMsg'
    | 'FWCharRankLossMsg'
    | 'FWCharWarningMsg'
    | 'FWCorpJoinMsg'
    | 'FWCorpKickMsg'
    | 'FWCorpLeaveMsg'
    | 'FWCorpWarningMsg'
    | 'FacWarCorpJoinRequestMsg'
    | 'FacWarCorpJoinWithdrawMsg'
    | 'FacWarCorpLeaveRequestMsg'
    | 'FacWarCorpLeaveWithdrawMsg'
    | 'FacWarDirectEnlistmentRevoked'
    | 'FacWarLPDisqualifiedEvent'
    | 'FacWarLPDisqualifiedKill'
    | 'FacWarLPPayoutEvent'
    | 'FacWarLPPayoutKill'
    | 'FreelanceProjectClosed'
    | 'FreelanceProjectCompleted'
    | 'FreelanceProjectCreated'
    | 'FreelanceProjectExpired'
    | 'FreelanceProjectLimitReached'
    | 'FreelanceProjectParticipantKicked'
    | 'GameTimeAdded'
    | 'GameTimeReceived'
    | 'GameTimeSent'
    | 'GiftReceived'
    | 'IHubDestroyedByBillFailure'
    | 'IncursionCompletedMsg'
    | 'IndustryOperationFinished'
    | 'IndustryTeamAuctionLost'
    | 'IndustryTeamAuctionWon'
    | 'InfrastructureHubBillAboutToExpire'
    | 'InsuranceExpirationMsg'
    | 'InsuranceFirstShipMsg'
    | 'InsuranceInvalidatedMsg'
    | 'InsuranceIssuedMsg'
    | 'InsurancePayoutMsg'
    | 'InvasionCompletedMsg'
    | 'InvasionSystemLogin'
    | 'InvasionSystemStart'
    | 'JumpCloneDeletedMsg1'
    | 'JumpCloneDeletedMsg2'
    | 'KillReportFinalBlow'
    | 'KillReportVictim'
    | 'KillRightAvailable'
    | 'KillRightAvailableOpen'
    | 'KillRightEarned'
    | 'KillRightUnavailable'
    | 'KillRightUnavailableOpen'
    | 'KillRightUsed'
    | 'LPAutoRedeemed'
    | 'LocateCharMsg'
    | 'MadeWarMutual'
    | 'MercOfferRetractedMsg'
    | 'MercOfferedNegotiationMsg'
    | 'MercenaryDenAttacked'
    | 'MercenaryDenNewMTO'
    | 'MercenaryDenReinforced'
    | 'MissionCanceledTriglavian'
    | 'MissionOfferExpirationMsg'
    | 'MissionTimeoutMsg'
    | 'MoonminingAutomaticFracture'
    | 'MoonminingExtractionCancelled'
    | 'MoonminingExtractionFinished'
    | 'MoonminingExtractionStarted'
    | 'MoonminingLaserFired'
    | 'MutualWarExpired'
    | 'MutualWarInviteAccepted'
    | 'MutualWarInviteRejected'
    | 'MutualWarInviteSent'
    | 'NPCStandingsGained'
    | 'NPCStandingsLost'
    | 'OfferToAllyRetracted'
    | 'OfferedSurrender'
    | 'OfferedToAlly'
    | 'OfficeLeaseCanceledInsufficientStandings'
    | 'OldLscMessages'
    | 'OperationFinished'
    | 'OrbitalAttacked'
    | 'OrbitalReinforced'
    | 'OwnershipTransferred'
    | 'RaffleCreated'
    | 'RaffleExpired'
    | 'RaffleFinished'
    | 'ReimbursementMsg'
    | 'ResearchMissionAvailableMsg'
    | 'RetractsWar'
    | 'SPAutoRedeemed'
    | 'SeasonalChallengeCompleted'
    | 'SkinSequencingCompleted'
    | 'SkyhookDeployed'
    | 'SkyhookDestroyed'
    | 'SkyhookLostShields'
    | 'SkyhookOnline'
    | 'SkyhookUnderAttack'
    | 'SovAllClaimAquiredMsg'
    | 'SovAllClaimLostMsg'
    | 'SovCommandNodeEventStarted'
    | 'SovCorpBillLateMsg'
    | 'SovCorpClaimFailMsg'
    | 'SovDisruptorMsg'
    | 'SovStationEnteredFreeport'
    | 'SovStructureDestroyed'
    | 'SovStructureReinforced'
    | 'SovStructureSelfDestructCancel'
    | 'SovStructureSelfDestructFinished'
    | 'SovStructureSelfDestructRequested'
    | 'SovereigntyIHDamageMsg'
    | 'SovereigntySBUDamageMsg'
    | 'SovereigntyTCUDamageMsg'
    | 'StationAggressionMsg1'
    | 'StationAggressionMsg2'
    | 'StationConquerMsg'
    | 'StationServiceDisabled'
    | 'StationServiceEnabled'
    | 'StationStateChangeMsg'
    | 'StoryLineMissionAvailableMsg'
    | 'StructureAnchoring'
    | 'StructureCourierContractChanged'
    | 'StructureDestroyed'
    | 'StructureFuelAlert'
    | 'StructureImpendingAbandonmentAssetsAtRisk'
    | 'StructureItemsDelivered'
    | 'StructureItemsMovedToSafety'
    | 'StructureLostArmor'
    | 'StructureLostShields'
    | 'StructureLowReagentsAlert'
    | 'StructureNoReagentsAlert'
    | 'StructureOnline'
    | 'StructurePaintPurchased'
    | 'StructureServicesOffline'
    | 'StructureUnanchoring'
    | 'StructureUnderAttack'
    | 'StructureWentHighPower'
    | 'StructureWentLowPower'
    | 'StructuresJobsCancelled'
    | 'StructuresJobsPaused'
    | 'StructuresReinforcementChanged'
    | 'TowerAlertMsg'
    | 'TowerResourceAlertMsg'
    | 'TransactionReversalMsg'
    | 'TutorialMsg'
    | 'WarAdopted '
    | 'WarAllyInherited'
    | 'WarAllyOfferDeclinedMsg'
    | 'WarConcordInvalidates'
    | 'WarDeclared'
    | 'WarEndedHqSecurityDrop'
    | 'WarHQRemovedFromSpace'
    | 'WarInherited'
    | 'WarInvalid'
    | 'WarRetracted'
    | 'WarRetractedByConcord'
    | 'WarSurrenderDeclinedMsg'
    | 'WarSurrenderOfferMsg'
}[]

export interface GetCharacterNotificationsParams {
  character_id: number | string
}

export interface GetCharacterNotificationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterNotificationsContactsResponse = {
  message: string
  notification_id: number
  send_date: string
  sender_character_id: number
  standing_level: number
}[]

export interface GetCharacterNotificationsContactsParams {
  character_id: number | string
}

export interface GetCharacterNotificationsContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterOnlineResponse {
  last_login?: string
  last_logout?: string
  logins?: number
  online: boolean
}

export interface GetCharacterOnlineParams {
  character_id: number | string
}

export interface GetCharacterOnlineResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterOrdersResponse = {
  duration: number
  escrow: number
  is_buy_order: boolean
  is_corporation: boolean
  issued: string
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | '1'
    | '10'
    | '2'
    | '20'
    | '3'
    | '30'
    | '4'
    | '40'
    | '5'
    | 'region'
    | 'solarsystem'
    | 'station'
  region_id: number
  type_id: number
  volume_remain: number
  volume_total: number
}[]

export interface GetCharacterOrdersParams {
  character_id: number | string
}

export interface GetCharacterOrdersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterOrdersHistoryResponse = {
  duration: number
  escrow: number
  is_buy_order: boolean
  is_corporation: boolean
  issued: string
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | '1'
    | '10'
    | '2'
    | '20'
    | '3'
    | '30'
    | '4'
    | '40'
    | '5'
    | 'region'
    | 'solarsystem'
    | 'station'
  region_id: number
  state: 'cancelled' | 'expired'
  type_id: number
  volume_remain: number
  volume_total: number
}[]

export interface GetCharacterOrdersHistoryParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterOrdersHistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCharacterPlanetsResponse = {
  last_update: string
  num_pins: number
  owner_id: number
  planet_id: number
  planet_type:
    | 'temperate'
    | 'barren'
    | 'oceanic'
    | 'ice'
    | 'gas'
    | 'lava'
    | 'storm'
    | 'plasma'
  solar_system_id: number
  upgrade_level: number
}[]

export interface GetCharacterPlanetsParams {
  character_id: number | string
}

export interface GetCharacterPlanetsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterPlanetResponse {
  links: {
    destination_pin_id: number
    link_level: number
    source_pin_id: number
  }[]
  pins: {
    contents: { amount: number; type_id: number }[]
    expiry_time: string
    extractor_details: {
      cycle_time: number
      head_radius: number
      heads: { head_id: number; latitude: number; longitude: number }[]
      product_type_id: number
      qty_per_cycle: number
    }
    factory_details: { schematic_id: number }
    install_time: string
    last_cycle_start: string
    latitude: number
    longitude: number
    pin_id: number
    schematic_id: number
    type_id: number
  }[]
  routes: {
    content_type_id: number
    destination_pin_id: number
    quantity: number
    route_id: number
    source_pin_id: number
    waypoints: number[]
  }[]
}

export interface GetCharacterPlanetParams {
  character_id: number | string
  planet_id: number | string
}

export interface GetCharacterPlanetResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterPortraitResponse {
  px128x128?: string
  px256x256?: string
  px512x512?: string
  px64x64?: string
}

export interface GetCharacterPortraitParams {
  character_id: number | string
}

export interface GetCharacterPortraitResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterRolesResponse {
  roles?: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_base?: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_hq?: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_other?: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
}

export interface GetCharacterRolesParams {
  character_id: number | string
}

export interface GetCharacterRolesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterSearchResponse {
  agent?: number[]
  alliance?: number[]
  character?: number[]
  constellation?: number[]
  corporation?: number[]
  faction?: number[]
  inventory_type?: number[]
  region?: number[]
  solar_system?: number[]
  station?: number[]
  structure?: number[]
}

export interface GetCharacterSearchParams {
  character_id: number | string
  categories?: (
    | 'agent'
    | 'alliance'
    | 'character'
    | 'constellation'
    | 'corporation'
    | 'faction'
    | 'inventory_type'
    | 'region'
    | 'solar_system'
    | 'station'
    | 'structure'
  )[]
  search?: string
  strict?: boolean
}

export interface GetCharacterSearchResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCharacterShipResponse {
  ship_item_id: number
  ship_name: string
  ship_type_id: number
}

export interface GetCharacterShipParams {
  character_id: number | string
}

export interface GetCharacterShipResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type TypeID = number

export interface CharactersSkillqueueSkill {
  finish_date?: string
  finished_level: number
  level_end_sp?: number
  level_start_sp?: number
  queue_position: number
  skill_id: TypeID
  start_date?: string
  training_start_sp?: number
}

export type GetCharacterSkillqueueResponse = CharactersSkillqueueSkill[]

export interface GetCharacterSkillqueueParams {
  character_id: number | string
}

export interface GetCharacterSkillqueueResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface CharactersSkillsSkill {
  active_skill_level: number
  skill_id: number
  skillpoints_in_skill: number
  trained_skill_level: number
}

export interface GetCharacterSkillsResponse {
  skills: CharactersSkillsSkill[]
  total_sp: number
  unallocated_sp?: number
}

export interface GetCharacterSkillsParams {
  character_id: number | string
}

export interface GetCharacterSkillsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterStandingsResponse = {
  from_id: number
  from_type: 'agent' | 'npc_corp' | 'faction'
  standing: number
}[]

export interface GetCharacterStandingsParams {
  character_id: number | string
}

export interface GetCharacterStandingsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterTitlesResponse = { name: string; title_id: number }[]

export interface GetCharacterTitlesParams {
  character_id: number | string
}

export interface GetCharacterTitlesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterWalletResponse = number

export interface GetCharacterWalletParams {
  character_id: number | string
}

export interface GetCharacterWalletResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCharacterWalletJournalResponse = {
  amount: number
  balance: number
  context_id: number
  context_id_type:
    | 'structure_id'
    | 'station_id'
    | 'market_transaction_id'
    | 'character_id'
    | 'corporation_id'
    | 'alliance_id'
    | 'eve_system'
    | 'industry_job_id'
    | 'contract_id'
    | 'planet_id'
    | 'system_id'
    | 'type_id'
  date: string
  description: string
  first_party_id: number
  id: number
  reason: string
  ref_type:
    | 'acceleration_gate_fee'
    | 'advertisement_listing_fee'
    | 'agent_donation'
    | 'agent_location_services'
    | 'agent_miscellaneous'
    | 'agent_mission_collateral_paid'
    | 'agent_mission_collateral_refunded'
    | 'agent_mission_reward'
    | 'agent_mission_reward_corporation_tax'
    | 'agent_mission_time_bonus_reward'
    | 'agent_mission_time_bonus_reward_corporation_tax'
    | 'agent_security_services'
    | 'agent_services_rendered'
    | 'agents_preward'
    | 'air_career_program_reward'
    | 'alliance_maintainance_fee'
    | 'alliance_registration_fee'
    | 'allignment_based_gate_toll'
    | 'asset_safety_recovery_tax'
    | 'bounty'
    | 'bounty_prize'
    | 'bounty_prize_corporation_tax'
    | 'bounty_prizes'
    | 'bounty_reimbursement'
    | 'bounty_surcharge'
    | 'brokers_fee'
    | 'clone_activation'
    | 'clone_transfer'
    | 'contraband_fine'
    | 'contract_auction_bid'
    | 'contract_auction_bid_corp'
    | 'contract_auction_bid_refund'
    | 'contract_auction_sold'
    | 'contract_brokers_fee'
    | 'contract_brokers_fee_corp'
    | 'contract_collateral'
    | 'contract_collateral_deposited_corp'
    | 'contract_collateral_payout'
    | 'contract_collateral_refund'
    | 'contract_deposit'
    | 'contract_deposit_corp'
    | 'contract_deposit_refund'
    | 'contract_deposit_sales_tax'
    | 'contract_price'
    | 'contract_price_payment_corp'
    | 'contract_reversal'
    | 'contract_reward'
    | 'contract_reward_deposited'
    | 'contract_reward_deposited_corp'
    | 'contract_reward_refund'
    | 'contract_sales_tax'
    | 'copying'
    | 'corporate_reward_payout'
    | 'corporate_reward_tax'
    | 'corporation_account_withdrawal'
    | 'corporation_bulk_payment'
    | 'corporation_dividend_payment'
    | 'corporation_liquidation'
    | 'corporation_logo_change_cost'
    | 'corporation_payment'
    | 'corporation_registration_fee'
    | 'cosmetic_market_component_item_purchase'
    | 'cosmetic_market_skin_purchase'
    | 'cosmetic_market_skin_sale'
    | 'cosmetic_market_skin_sale_broker_fee'
    | 'cosmetic_market_skin_sale_tax'
    | 'cosmetic_market_skin_transaction'
    | 'courier_mission_escrow'
    | 'cspa'
    | 'cspaofflinerefund'
    | 'daily_challenge_reward'
    | 'daily_goal_payouts'
    | 'daily_goal_payouts_tax'
    | 'datacore_fee'
    | 'dna_modification_fee'
    | 'docking_fee'
    | 'duel_wager_escrow'
    | 'duel_wager_payment'
    | 'duel_wager_refund'
    | 'ess_escrow_transfer'
    | 'external_trade_delivery'
    | 'external_trade_freeze'
    | 'external_trade_thaw'
    | 'factory_slot_rental_fee'
    | 'flux_payout'
    | 'flux_tax'
    | 'flux_ticket_repayment'
    | 'flux_ticket_sale'
    | 'freelance_jobs_broadcasting_fee'
    | 'freelance_jobs_duration_fee'
    | 'freelance_jobs_escrow_refund'
    | 'freelance_jobs_reward'
    | 'freelance_jobs_reward_corporation_tax'
    | 'freelance_jobs_reward_escrow'
    | 'gm_cash_transfer'
    | 'gm_plex_fee_refund'
    | 'industry_job_tax'
    | 'infrastructure_hub_maintenance'
    | 'inheritance'
    | 'insurance'
    | 'insurgency_corruption_contribution_reward'
    | 'insurgency_suppression_contribution_reward'
    | 'item_trader_payment'
    | 'jump_clone_activation_fee'
    | 'jump_clone_installation_fee'
    | 'kill_right_fee'
    | 'lp_store'
    | 'manufacturing'
    | 'market_escrow'
    | 'market_fine_paid'
    | 'market_provider_tax'
    | 'market_transaction'
    | 'medal_creation'
    | 'medal_issued'
    | 'milestone_reward_payment'
    | 'mission_completion'
    | 'mission_cost'
    | 'mission_expiration'
    | 'mission_reward'
    | 'office_rental_fee'
    | 'operation_bonus'
    | 'opportunity_reward'
    | 'planetary_construction'
    | 'planetary_export_tax'
    | 'planetary_import_tax'
    | 'player_donation'
    | 'player_trading'
    | 'project_discovery_reward'
    | 'project_discovery_tax'
    | 'project_payouts'
    | 'reaction'
    | 'redeemed_isk_token'
    | 'release_of_impounded_property'
    | 'repair_bill'
    | 'reprocessing_tax'
    | 'researching_material_productivity'
    | 'researching_technology'
    | 'researching_time_productivity'
    | 'resource_wars_reward'
    | 'reverse_engineering'
    | 'season_challenge_reward'
    | 'security_processing_fee'
    | 'shares'
    | 'skill_purchase'
    | 'skyhook_claim_fee'
    | 'sovereignity_bill'
    | 'store_purchase'
    | 'store_purchase_refund'
    | 'structure_gate_jump'
    | 'transaction_tax'
    | 'under_construction'
    | 'upkeep_adjustment_fee'
    | 'war_ally_contract'
    | 'war_fee'
    | 'war_fee_surrender'
  second_party_id: number
  tax: number
  tax_receiver_id: number
}[]

export interface GetCharacterWalletJournalParams {
  character_id: number | string
  page?: number
}

export interface GetCharacterWalletJournalResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCharacterWalletTransactionsResponse = {
  client_id: number
  date: string
  is_buy: boolean
  is_personal: boolean
  journal_ref_id: number
  location_id: number
  quantity: number
  transaction_id: number
  type_id: number
  unit_price: number
}[]

export interface GetCharacterWalletTransactionsParams {
  character_id: number | string
  from_id?: number
}

export interface GetCharacterWalletTransactionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetContractsPublicBidsResponse = {
  amount: number
  bid_id: number
  date_bid: string
}[]

export interface GetContractsPublicBidsParams {
  contract_id: number | string
  page?: number
}

export interface GetContractsPublicBidsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetContractsPublicItemsResponse = {
  is_blueprint_copy: boolean
  is_included: boolean
  item_id: number
  material_efficiency: number
  quantity: number
  record_id: number
  runs: number
  time_efficiency: number
  type_id: number
}[]

export interface GetContractsPublicItemsParams {
  contract_id: number | string
  page?: number
}

export interface GetContractsPublicItemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetContractsPublicRegionIdResponse = {
  buyout: number
  collateral: number
  contract_id: number
  date_expired: string
  date_issued: string
  days_to_complete: number
  end_location_id: number
  for_corporation: boolean
  issuer_corporation_id: number
  issuer_id: number
  price: number
  reward: number
  start_location_id: number
  title: string
  type: 'unknown' | 'item_exchange' | 'auction' | 'courier' | 'loan'
  volume: number
}[]

export interface GetContractsPublicRegionIdParams {
  region_id: number | string
  page?: number
}

export interface GetContractsPublicRegionIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationCorporationMiningExtractionsResponse = {
  chunk_arrival_time: string
  extraction_start_time: string
  moon_id: number
  natural_decay_time: string
  structure_id: number
}[]

export interface GetCorporationCorporationMiningExtractionsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationCorporationMiningExtractionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationCorporationMiningObserversResponse = {
  last_updated: string
  observer_id: number
  observer_type: 'structure'
}[]

export interface GetCorporationCorporationMiningObserversParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationCorporationMiningObserversResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationCorporationMiningObserverResponse = {
  character_id: number
  last_updated: string
  quantity: number
  recorded_corporation_id: number
  type_id: number
}[]

export interface GetCorporationCorporationMiningObserverParams {
  corporation_id: number | string
  observer_id: number | string
  page?: number
}

export interface GetCorporationCorporationMiningObserverResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationsNpccorpsResponse = number[]

export interface GetCorporationsNpccorpsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type StationID = number

export interface GetCorporationResponse {
  alliance_id?: AllianceID
  ceo_id: CharacterID
  creator_id: CharacterID
  date_founded?: string
  description?: string
  faction_id?: FactionID
  home_station_id?: StationID
  member_count: number
  name: string
  shares?: number
  tax_rate: number
  ticker: string
  url?: string
  war_eligible?: boolean
}

export interface GetCorporationParams {
  corporation_id: number | string
}

export interface GetCorporationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationAlliancehistoryResponse = {
  alliance_id: number
  is_deleted: boolean
  record_id: number
  start_date: string
}[]

export interface GetCorporationAlliancehistoryParams {
  corporation_id: number | string
}

export interface GetCorporationAlliancehistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationAssetsResponse = {
  is_blueprint_copy: boolean
  is_singleton: boolean
  item_id: number
  location_flag:
    | 'AssetSafety'
    | 'AutoFit'
    | 'Bonus'
    | 'Booster'
    | 'BoosterBay'
    | 'Capsule'
    | 'CapsuleerDeliveries'
    | 'Cargo'
    | 'CorpDeliveries'
    | 'CorpSAG1'
    | 'CorpSAG2'
    | 'CorpSAG3'
    | 'CorpSAG4'
    | 'CorpSAG5'
    | 'CorpSAG6'
    | 'CorpSAG7'
    | 'CorporationGoalDeliveries'
    | 'CrateLoot'
    | 'Deliveries'
    | 'DroneBay'
    | 'DustBattle'
    | 'DustDatabank'
    | 'ExpeditionHold'
    | 'FighterBay'
    | 'FighterTube0'
    | 'FighterTube1'
    | 'FighterTube2'
    | 'FighterTube3'
    | 'FighterTube4'
    | 'FleetHangar'
    | 'FrigateEscapeBay'
    | 'Hangar'
    | 'HangarAll'
    | 'HiSlot0'
    | 'HiSlot1'
    | 'HiSlot2'
    | 'HiSlot3'
    | 'HiSlot4'
    | 'HiSlot5'
    | 'HiSlot6'
    | 'HiSlot7'
    | 'HiddenModifiers'
    | 'Implant'
    | 'Impounded'
    | 'InfrastructureHangar'
    | 'JunkyardReprocessed'
    | 'JunkyardTrashed'
    | 'LoSlot0'
    | 'LoSlot1'
    | 'LoSlot2'
    | 'LoSlot3'
    | 'LoSlot4'
    | 'LoSlot5'
    | 'LoSlot6'
    | 'LoSlot7'
    | 'Locked'
    | 'MedSlot0'
    | 'MedSlot1'
    | 'MedSlot2'
    | 'MedSlot3'
    | 'MedSlot4'
    | 'MedSlot5'
    | 'MedSlot6'
    | 'MedSlot7'
    | 'MobileDepotHold'
    | 'MoonMaterialBay'
    | 'OfficeFolder'
    | 'Pilot'
    | 'PlanetSurface'
    | 'QuafeBay'
    | 'QuantumCoreRoom'
    | 'Reward'
    | 'RigSlot0'
    | 'RigSlot1'
    | 'RigSlot2'
    | 'RigSlot3'
    | 'RigSlot4'
    | 'RigSlot5'
    | 'RigSlot6'
    | 'RigSlot7'
    | 'SecondaryStorage'
    | 'ServiceSlot0'
    | 'ServiceSlot1'
    | 'ServiceSlot2'
    | 'ServiceSlot3'
    | 'ServiceSlot4'
    | 'ServiceSlot5'
    | 'ServiceSlot6'
    | 'ServiceSlot7'
    | 'ShipHangar'
    | 'ShipOffline'
    | 'Skill'
    | 'SkillInTraining'
    | 'SpecializedAmmoHold'
    | 'SpecializedAsteroidHold'
    | 'SpecializedCommandCenterHold'
    | 'SpecializedFuelBay'
    | 'SpecializedGasHold'
    | 'SpecializedIceHold'
    | 'SpecializedIndustrialShipHold'
    | 'SpecializedLargeShipHold'
    | 'SpecializedMaterialBay'
    | 'SpecializedMediumShipHold'
    | 'SpecializedMineralHold'
    | 'SpecializedOreHold'
    | 'SpecializedPlanetaryCommoditiesHold'
    | 'SpecializedSalvageHold'
    | 'SpecializedShipHold'
    | 'SpecializedSmallShipHold'
    | 'StructureActive'
    | 'StructureFuel'
    | 'StructureInactive'
    | 'StructureOffline'
    | 'SubSystemBay'
    | 'SubSystemSlot0'
    | 'SubSystemSlot1'
    | 'SubSystemSlot2'
    | 'SubSystemSlot3'
    | 'SubSystemSlot4'
    | 'SubSystemSlot5'
    | 'SubSystemSlot6'
    | 'SubSystemSlot7'
    | 'Unlocked'
    | 'Wallet'
    | 'Wardrobe'
  location_id: number
  location_type: 'station' | 'solar_system' | 'item' | 'other'
  quantity: number
  type_id: number
}[]

export interface GetCorporationAssetsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationAssetsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type PostCorporationAssetsLocationsResponse = {
  item_id: number
  position: { x: number; y: number; z: number }
}[]

export interface PostCorporationAssetsLocationsParams {
  corporation_id: number | string
  body: number[]
}

export interface PostCorporationAssetsLocationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostCorporationAssetsNamesResponse = {
  item_id: number
  name: string
}[]

export interface PostCorporationAssetsNamesParams {
  corporation_id: number | string
  body: number[]
}

export interface PostCorporationAssetsNamesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationBlueprintsResponse = {
  item_id: number
  location_flag:
    | 'AssetSafety'
    | 'AutoFit'
    | 'Bonus'
    | 'Booster'
    | 'BoosterBay'
    | 'Capsule'
    | 'CapsuleerDeliveries'
    | 'Cargo'
    | 'CorpDeliveries'
    | 'CorpSAG1'
    | 'CorpSAG2'
    | 'CorpSAG3'
    | 'CorpSAG4'
    | 'CorpSAG5'
    | 'CorpSAG6'
    | 'CorpSAG7'
    | 'CorporationGoalDeliveries'
    | 'CrateLoot'
    | 'Deliveries'
    | 'DroneBay'
    | 'DustBattle'
    | 'DustDatabank'
    | 'ExpeditionHold'
    | 'FighterBay'
    | 'FighterTube0'
    | 'FighterTube1'
    | 'FighterTube2'
    | 'FighterTube3'
    | 'FighterTube4'
    | 'FleetHangar'
    | 'FrigateEscapeBay'
    | 'Hangar'
    | 'HangarAll'
    | 'HiSlot0'
    | 'HiSlot1'
    | 'HiSlot2'
    | 'HiSlot3'
    | 'HiSlot4'
    | 'HiSlot5'
    | 'HiSlot6'
    | 'HiSlot7'
    | 'HiddenModifiers'
    | 'Implant'
    | 'Impounded'
    | 'InfrastructureHangar'
    | 'JunkyardReprocessed'
    | 'JunkyardTrashed'
    | 'LoSlot0'
    | 'LoSlot1'
    | 'LoSlot2'
    | 'LoSlot3'
    | 'LoSlot4'
    | 'LoSlot5'
    | 'LoSlot6'
    | 'LoSlot7'
    | 'Locked'
    | 'MedSlot0'
    | 'MedSlot1'
    | 'MedSlot2'
    | 'MedSlot3'
    | 'MedSlot4'
    | 'MedSlot5'
    | 'MedSlot6'
    | 'MedSlot7'
    | 'MobileDepotHold'
    | 'MoonMaterialBay'
    | 'OfficeFolder'
    | 'Pilot'
    | 'PlanetSurface'
    | 'QuafeBay'
    | 'QuantumCoreRoom'
    | 'Reward'
    | 'RigSlot0'
    | 'RigSlot1'
    | 'RigSlot2'
    | 'RigSlot3'
    | 'RigSlot4'
    | 'RigSlot5'
    | 'RigSlot6'
    | 'RigSlot7'
    | 'SecondaryStorage'
    | 'ServiceSlot0'
    | 'ServiceSlot1'
    | 'ServiceSlot2'
    | 'ServiceSlot3'
    | 'ServiceSlot4'
    | 'ServiceSlot5'
    | 'ServiceSlot6'
    | 'ServiceSlot7'
    | 'ShipHangar'
    | 'ShipOffline'
    | 'Skill'
    | 'SkillInTraining'
    | 'SpecializedAmmoHold'
    | 'SpecializedAsteroidHold'
    | 'SpecializedCommandCenterHold'
    | 'SpecializedFuelBay'
    | 'SpecializedGasHold'
    | 'SpecializedIceHold'
    | 'SpecializedIndustrialShipHold'
    | 'SpecializedLargeShipHold'
    | 'SpecializedMaterialBay'
    | 'SpecializedMediumShipHold'
    | 'SpecializedMineralHold'
    | 'SpecializedOreHold'
    | 'SpecializedPlanetaryCommoditiesHold'
    | 'SpecializedSalvageHold'
    | 'SpecializedShipHold'
    | 'SpecializedSmallShipHold'
    | 'StructureActive'
    | 'StructureFuel'
    | 'StructureInactive'
    | 'StructureOffline'
    | 'SubSystemBay'
    | 'SubSystemSlot0'
    | 'SubSystemSlot1'
    | 'SubSystemSlot2'
    | 'SubSystemSlot3'
    | 'SubSystemSlot4'
    | 'SubSystemSlot5'
    | 'SubSystemSlot6'
    | 'SubSystemSlot7'
    | 'Unlocked'
    | 'Wallet'
    | 'Wardrobe'
  location_id: number
  material_efficiency: number
  quantity: number
  runs: number
  time_efficiency: number
  type_id: number
}[]

export interface GetCorporationBlueprintsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationBlueprintsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationContactsResponse = {
  contact_id: number
  contact_type: 'character' | 'corporation' | 'alliance' | 'faction'
  is_watched: boolean
  label_ids: number[]
  standing: number
}[]

export interface GetCorporationContactsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationContactsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationContactsLabelsResponse = {
  label_id: number
  label_name: string
}[]

export interface GetCorporationContactsLabelsParams {
  corporation_id: number | string
}

export interface GetCorporationContactsLabelsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationContainersLogsResponse = {
  action:
    | 'add'
    | 'assemble'
    | 'configure'
    | 'enter_password'
    | 'lock'
    | 'move'
    | 'repackage'
    | 'set_name'
    | 'set_password'
    | 'unlock'
  character_id: number
  container_id: number
  container_type_id: number
  location_flag:
    | 'AssetSafety'
    | 'AutoFit'
    | 'Bonus'
    | 'Booster'
    | 'BoosterBay'
    | 'Capsule'
    | 'CapsuleerDeliveries'
    | 'Cargo'
    | 'CorpDeliveries'
    | 'CorpSAG1'
    | 'CorpSAG2'
    | 'CorpSAG3'
    | 'CorpSAG4'
    | 'CorpSAG5'
    | 'CorpSAG6'
    | 'CorpSAG7'
    | 'CorporationGoalDeliveries'
    | 'CrateLoot'
    | 'Deliveries'
    | 'DroneBay'
    | 'DustBattle'
    | 'DustDatabank'
    | 'ExpeditionHold'
    | 'FighterBay'
    | 'FighterTube0'
    | 'FighterTube1'
    | 'FighterTube2'
    | 'FighterTube3'
    | 'FighterTube4'
    | 'FleetHangar'
    | 'FrigateEscapeBay'
    | 'Hangar'
    | 'HangarAll'
    | 'HiSlot0'
    | 'HiSlot1'
    | 'HiSlot2'
    | 'HiSlot3'
    | 'HiSlot4'
    | 'HiSlot5'
    | 'HiSlot6'
    | 'HiSlot7'
    | 'HiddenModifiers'
    | 'Implant'
    | 'Impounded'
    | 'InfrastructureHangar'
    | 'JunkyardReprocessed'
    | 'JunkyardTrashed'
    | 'LoSlot0'
    | 'LoSlot1'
    | 'LoSlot2'
    | 'LoSlot3'
    | 'LoSlot4'
    | 'LoSlot5'
    | 'LoSlot6'
    | 'LoSlot7'
    | 'Locked'
    | 'MedSlot0'
    | 'MedSlot1'
    | 'MedSlot2'
    | 'MedSlot3'
    | 'MedSlot4'
    | 'MedSlot5'
    | 'MedSlot6'
    | 'MedSlot7'
    | 'MobileDepotHold'
    | 'MoonMaterialBay'
    | 'OfficeFolder'
    | 'Pilot'
    | 'PlanetSurface'
    | 'QuafeBay'
    | 'QuantumCoreRoom'
    | 'Reward'
    | 'RigSlot0'
    | 'RigSlot1'
    | 'RigSlot2'
    | 'RigSlot3'
    | 'RigSlot4'
    | 'RigSlot5'
    | 'RigSlot6'
    | 'RigSlot7'
    | 'SecondaryStorage'
    | 'ServiceSlot0'
    | 'ServiceSlot1'
    | 'ServiceSlot2'
    | 'ServiceSlot3'
    | 'ServiceSlot4'
    | 'ServiceSlot5'
    | 'ServiceSlot6'
    | 'ServiceSlot7'
    | 'ShipHangar'
    | 'ShipOffline'
    | 'Skill'
    | 'SkillInTraining'
    | 'SpecializedAmmoHold'
    | 'SpecializedAsteroidHold'
    | 'SpecializedCommandCenterHold'
    | 'SpecializedFuelBay'
    | 'SpecializedGasHold'
    | 'SpecializedIceHold'
    | 'SpecializedIndustrialShipHold'
    | 'SpecializedLargeShipHold'
    | 'SpecializedMaterialBay'
    | 'SpecializedMediumShipHold'
    | 'SpecializedMineralHold'
    | 'SpecializedOreHold'
    | 'SpecializedPlanetaryCommoditiesHold'
    | 'SpecializedSalvageHold'
    | 'SpecializedShipHold'
    | 'SpecializedSmallShipHold'
    | 'StructureActive'
    | 'StructureFuel'
    | 'StructureInactive'
    | 'StructureOffline'
    | 'SubSystemBay'
    | 'SubSystemSlot0'
    | 'SubSystemSlot1'
    | 'SubSystemSlot2'
    | 'SubSystemSlot3'
    | 'SubSystemSlot4'
    | 'SubSystemSlot5'
    | 'SubSystemSlot6'
    | 'SubSystemSlot7'
    | 'Unlocked'
    | 'Wallet'
    | 'Wardrobe'
  location_id: number
  logged_at: string
  new_config_bitmask: number
  old_config_bitmask: number
  password_type: 'config' | 'general'
  quantity: number
  type_id: number
}[]

export interface GetCorporationContainersLogsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationContainersLogsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationContractsResponse = {
  acceptor_id: number
  assignee_id: number
  availability: 'public' | 'personal' | 'corporation' | 'alliance'
  buyout: number
  collateral: number
  contract_id: number
  date_accepted: string
  date_completed: string
  date_expired: string
  date_issued: string
  days_to_complete: number
  end_location_id: number
  for_corporation: boolean
  issuer_corporation_id: number
  issuer_id: number
  price: number
  reward: number
  start_location_id: number
  status:
    | 'outstanding'
    | 'in_progress'
    | 'finished_issuer'
    | 'finished_contractor'
    | 'finished'
    | 'cancelled'
    | 'rejected'
    | 'failed'
    | 'deleted'
    | 'reversed'
  title: string
  type: 'unknown' | 'item_exchange' | 'auction' | 'courier' | 'loan'
  volume: number
}[]

export interface GetCorporationContractsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationContractsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationContractBidsResponse = {
  amount: number
  bid_id: number
  bidder_id: number
  date_bid: string
}[]

export interface GetCorporationContractBidsParams {
  corporation_id: number | string
  contract_id: number | string
  page?: number
}

export interface GetCorporationContractBidsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationContractItemsResponse = {
  is_included: boolean
  is_singleton: boolean
  quantity: number
  raw_quantity: number
  record_id: number
  type_id: number
}[]

export interface GetCorporationContractItemsParams {
  corporation_id: number | string
  contract_id: number | string
}

export interface GetCorporationContractItemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationCustomsOfficesResponse = {
  alliance_tax_rate: number
  allow_access_with_standings: boolean
  allow_alliance_access: boolean
  bad_standing_tax_rate: number
  corporation_tax_rate: number
  excellent_standing_tax_rate: number
  good_standing_tax_rate: number
  neutral_standing_tax_rate: number
  office_id: number
  reinforce_exit_end: number
  reinforce_exit_start: number
  standing_level: 'bad' | 'excellent' | 'good' | 'neutral' | 'terrible'
  system_id: number
  terrible_standing_tax_rate: number
}[]

export interface GetCorporationCustomsOfficesParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationCustomsOfficesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetCorporationDivisionsResponse {
  hangar?: { division: number; name: string }[]
  wallet?: { division: number; name: string }[]
}

export interface GetCorporationDivisionsParams {
  corporation_id: number | string
}

export interface GetCorporationDivisionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationFacilitiesResponse = {
  facility_id: number
  system_id: number
  type_id: number
}[]

export interface GetCorporationFacilitiesParams {
  corporation_id: number | string
}

export interface GetCorporationFacilitiesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCorporationFwStatsResponse {
  enlisted_on?: string
  faction_id?: number
  kills: { last_week: number; total: number; yesterday: number }
  pilots?: number
  victory_points: { last_week: number; total: number; yesterday: number }
}

export interface GetCorporationFwStatsParams {
  corporation_id: number | string
}

export interface GetCorporationFwStatsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetCorporationIconsResponse {
  px128x128?: string
  px256x256?: string
  px64x64?: string
}

export interface GetCorporationIconsParams {
  corporation_id: number | string
}

export interface GetCorporationIconsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationIndustryJobsResponse = {
  activity_id: number
  blueprint_id: number
  blueprint_location_id: number
  blueprint_type_id: number
  completed_character_id: number
  completed_date: string
  cost: number
  duration: number
  end_date: string
  facility_id: number
  installer_id: number
  job_id: number
  licensed_runs: number
  location_id: number
  output_location_id: number
  pause_date: string
  probability: number
  product_type_id: number
  runs: number
  start_date: string
  status: 'active' | 'cancelled' | 'delivered' | 'paused' | 'ready' | 'reverted'
  successful_runs: number
}[]

export interface GetCorporationIndustryJobsParams {
  corporation_id: number | string
  include_completed?: boolean
  page?: number
}

export interface GetCorporationIndustryJobsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationKillmailsRecentResponse = {
  killmail_hash: string
  killmail_id: number
}[]

export interface GetCorporationKillmailsRecentParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationKillmailsRecentResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationMedalsResponse = {
  created_at: string
  creator_id: number
  description: string
  medal_id: number
  title: string
}[]

export interface GetCorporationMedalsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationMedalsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationMedalsIssuedResponse = {
  character_id: number
  issued_at: string
  issuer_id: number
  medal_id: number
  reason: string
  status: 'private' | 'public'
}[]

export interface GetCorporationMedalsIssuedParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationMedalsIssuedResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationMembersResponse = number[]

export interface GetCorporationMembersParams {
  corporation_id: number | string
}

export interface GetCorporationMembersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationMembersLimitResponse = number

export interface GetCorporationMembersLimitParams {
  corporation_id: number | string
}

export interface GetCorporationMembersLimitResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationMembersTitlesResponse = {
  character_id: number
  titles: number[]
}[]

export interface GetCorporationMembersTitlesParams {
  corporation_id: number | string
}

export interface GetCorporationMembersTitlesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationMembertrackingResponse = {
  base_id: number
  character_id: number
  location_id: number
  logoff_date: string
  logon_date: string
  ship_type_id: number
  start_date: string
}[]

export interface GetCorporationMembertrackingParams {
  corporation_id: number | string
}

export interface GetCorporationMembertrackingResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationOrdersResponse = {
  duration: number
  escrow: number
  is_buy_order: boolean
  issued: string
  issued_by: number
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | '1'
    | '10'
    | '2'
    | '20'
    | '3'
    | '30'
    | '4'
    | '40'
    | '5'
    | 'region'
    | 'solarsystem'
    | 'station'
  region_id: number
  type_id: number
  volume_remain: number
  volume_total: number
  wallet_division: number
}[]

export interface GetCorporationOrdersParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationOrdersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationOrdersHistoryResponse = {
  duration: number
  escrow: number
  is_buy_order: boolean
  issued: string
  issued_by: number
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | '1'
    | '10'
    | '2'
    | '20'
    | '3'
    | '30'
    | '4'
    | '40'
    | '5'
    | 'region'
    | 'solarsystem'
    | 'station'
  region_id: number
  state: 'cancelled' | 'expired'
  type_id: number
  volume_remain: number
  volume_total: number
  wallet_division: number
}[]

export interface GetCorporationOrdersHistoryParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationOrdersHistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationRolesResponse = {
  character_id: number
  grantable_roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_base: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_hq: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_other: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_base: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_hq: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_other: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
}[]

export interface GetCorporationRolesParams {
  corporation_id: number | string
}

export interface GetCorporationRolesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationRolesHistoryResponse = {
  changed_at: string
  character_id: number
  issuer_id: number
  new_roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  old_roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  role_type:
    | 'grantable_roles'
    | 'grantable_roles_at_base'
    | 'grantable_roles_at_hq'
    | 'grantable_roles_at_other'
    | 'roles'
    | 'roles_at_base'
    | 'roles_at_hq'
    | 'roles_at_other'
}[]

export interface GetCorporationRolesHistoryParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationRolesHistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationShareholdersResponse = {
  share_count: number
  shareholder_id: number
  shareholder_type: 'character' | 'corporation'
}[]

export interface GetCorporationShareholdersParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationShareholdersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationStandingsResponse = {
  from_id: number
  from_type: 'agent' | 'npc_corp' | 'faction'
  standing: number
}[]

export interface GetCorporationStandingsParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationStandingsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationStarbasesResponse = {
  moon_id: number
  onlined_since: string
  reinforced_until: string
  starbase_id: number
  state: 'offline' | 'online' | 'onlining' | 'reinforced' | 'unanchoring'
  system_id: number
  type_id: number
  unanchor_at: string
}[]

export interface GetCorporationStarbasesParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationStarbasesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetCorporationStarbaseResponse {
  allow_alliance_members: boolean
  allow_corporation_members: boolean
  anchor:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  attack_if_at_war: boolean
  attack_if_other_security_status_dropping: boolean
  attack_security_status_threshold?: number
  attack_standing_threshold?: number
  fuel_bay_take:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  fuel_bay_view:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  fuels?: { quantity: number; type_id: number }[]
  offline:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  online:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  unanchor:
    | 'alliance_member'
    | 'config_starbase_equipment_role'
    | 'corporation_member'
    | 'starbase_fuel_technician_role'
  use_alliance_standings: boolean
}

export interface GetCorporationStarbaseParams {
  corporation_id: number | string
  starbase_id: number | string
  system_id?: number
}

export interface GetCorporationStarbaseResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationStructuresResponse = {
  corporation_id: number
  fuel_expires: string
  name: string
  next_reinforce_apply: string
  next_reinforce_hour: number
  profile_id: number
  reinforce_hour: number
  services: { name: string; state: 'online' | 'offline' | 'cleanup' }[]
  state:
    | 'anchor_vulnerable'
    | 'anchoring'
    | 'armor_reinforce'
    | 'armor_vulnerable'
    | 'deploy_vulnerable'
    | 'fitting_invulnerable'
    | 'hull_reinforce'
    | 'hull_vulnerable'
    | 'online_deprecated'
    | 'onlining_vulnerable'
    | 'shield_vulnerable'
    | 'unanchored'
    | 'unknown'
  state_timer_end: string
  state_timer_start: string
  structure_id: number
  system_id: number
  type_id: number
  unanchors_at: string
}[]

export interface GetCorporationStructuresParams {
  corporation_id: number | string
  page?: number
}

export interface GetCorporationStructuresResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationTitlesResponse = {
  grantable_roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_base: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_hq: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  grantable_roles_at_other: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  name: string
  roles: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_base: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_hq: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  roles_at_other: (
    | 'Account_Take_1'
    | 'Account_Take_2'
    | 'Account_Take_3'
    | 'Account_Take_4'
    | 'Account_Take_5'
    | 'Account_Take_6'
    | 'Account_Take_7'
    | 'Accountant'
    | 'Auditor'
    | 'Brand_Manager'
    | 'Communications_Officer'
    | 'Config_Equipment'
    | 'Config_Starbase_Equipment'
    | 'Container_Take_1'
    | 'Container_Take_2'
    | 'Container_Take_3'
    | 'Container_Take_4'
    | 'Container_Take_5'
    | 'Container_Take_6'
    | 'Container_Take_7'
    | 'Contract_Manager'
    | 'Deliveries_Container_Take'
    | 'Deliveries_Query'
    | 'Deliveries_Take'
    | 'Diplomat'
    | 'Director'
    | 'Factory_Manager'
    | 'Fitting_Manager'
    | 'Hangar_Query_1'
    | 'Hangar_Query_2'
    | 'Hangar_Query_3'
    | 'Hangar_Query_4'
    | 'Hangar_Query_5'
    | 'Hangar_Query_6'
    | 'Hangar_Query_7'
    | 'Hangar_Take_1'
    | 'Hangar_Take_2'
    | 'Hangar_Take_3'
    | 'Hangar_Take_4'
    | 'Hangar_Take_5'
    | 'Hangar_Take_6'
    | 'Hangar_Take_7'
    | 'Junior_Accountant'
    | 'Personnel_Manager'
    | 'Project_Manager'
    | 'Rent_Factory_Facility'
    | 'Rent_Office'
    | 'Rent_Research_Facility'
    | 'Security_Officer'
    | 'Skill_Plan_Manager'
    | 'Starbase_Defense_Operator'
    | 'Starbase_Fuel_Technician'
    | 'Station_Manager'
    | 'Trader'
  )[]
  title_id: number
}[]

export interface GetCorporationTitlesParams {
  corporation_id: number | string
}

export interface GetCorporationTitlesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationWalletsResponse = {
  balance: number
  division: number
}[]

export interface GetCorporationWalletsParams {
  corporation_id: number | string
}

export interface GetCorporationWalletsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetCorporationWalletsDivisionJournalResponse = {
  amount: number
  balance: number
  context_id: number
  context_id_type:
    | 'structure_id'
    | 'station_id'
    | 'market_transaction_id'
    | 'character_id'
    | 'corporation_id'
    | 'alliance_id'
    | 'eve_system'
    | 'industry_job_id'
    | 'contract_id'
    | 'planet_id'
    | 'system_id'
    | 'type_id'
  date: string
  description: string
  first_party_id: number
  id: number
  reason: string
  ref_type:
    | 'acceleration_gate_fee'
    | 'advertisement_listing_fee'
    | 'agent_donation'
    | 'agent_location_services'
    | 'agent_miscellaneous'
    | 'agent_mission_collateral_paid'
    | 'agent_mission_collateral_refunded'
    | 'agent_mission_reward'
    | 'agent_mission_reward_corporation_tax'
    | 'agent_mission_time_bonus_reward'
    | 'agent_mission_time_bonus_reward_corporation_tax'
    | 'agent_security_services'
    | 'agent_services_rendered'
    | 'agents_preward'
    | 'air_career_program_reward'
    | 'alliance_maintainance_fee'
    | 'alliance_registration_fee'
    | 'allignment_based_gate_toll'
    | 'asset_safety_recovery_tax'
    | 'bounty'
    | 'bounty_prize'
    | 'bounty_prize_corporation_tax'
    | 'bounty_prizes'
    | 'bounty_reimbursement'
    | 'bounty_surcharge'
    | 'brokers_fee'
    | 'clone_activation'
    | 'clone_transfer'
    | 'contraband_fine'
    | 'contract_auction_bid'
    | 'contract_auction_bid_corp'
    | 'contract_auction_bid_refund'
    | 'contract_auction_sold'
    | 'contract_brokers_fee'
    | 'contract_brokers_fee_corp'
    | 'contract_collateral'
    | 'contract_collateral_deposited_corp'
    | 'contract_collateral_payout'
    | 'contract_collateral_refund'
    | 'contract_deposit'
    | 'contract_deposit_corp'
    | 'contract_deposit_refund'
    | 'contract_deposit_sales_tax'
    | 'contract_price'
    | 'contract_price_payment_corp'
    | 'contract_reversal'
    | 'contract_reward'
    | 'contract_reward_deposited'
    | 'contract_reward_deposited_corp'
    | 'contract_reward_refund'
    | 'contract_sales_tax'
    | 'copying'
    | 'corporate_reward_payout'
    | 'corporate_reward_tax'
    | 'corporation_account_withdrawal'
    | 'corporation_bulk_payment'
    | 'corporation_dividend_payment'
    | 'corporation_liquidation'
    | 'corporation_logo_change_cost'
    | 'corporation_payment'
    | 'corporation_registration_fee'
    | 'cosmetic_market_component_item_purchase'
    | 'cosmetic_market_skin_purchase'
    | 'cosmetic_market_skin_sale'
    | 'cosmetic_market_skin_sale_broker_fee'
    | 'cosmetic_market_skin_sale_tax'
    | 'cosmetic_market_skin_transaction'
    | 'courier_mission_escrow'
    | 'cspa'
    | 'cspaofflinerefund'
    | 'daily_challenge_reward'
    | 'daily_goal_payouts'
    | 'daily_goal_payouts_tax'
    | 'datacore_fee'
    | 'dna_modification_fee'
    | 'docking_fee'
    | 'duel_wager_escrow'
    | 'duel_wager_payment'
    | 'duel_wager_refund'
    | 'ess_escrow_transfer'
    | 'external_trade_delivery'
    | 'external_trade_freeze'
    | 'external_trade_thaw'
    | 'factory_slot_rental_fee'
    | 'flux_payout'
    | 'flux_tax'
    | 'flux_ticket_repayment'
    | 'flux_ticket_sale'
    | 'freelance_jobs_broadcasting_fee'
    | 'freelance_jobs_duration_fee'
    | 'freelance_jobs_escrow_refund'
    | 'freelance_jobs_reward'
    | 'freelance_jobs_reward_corporation_tax'
    | 'freelance_jobs_reward_escrow'
    | 'gm_cash_transfer'
    | 'gm_plex_fee_refund'
    | 'industry_job_tax'
    | 'infrastructure_hub_maintenance'
    | 'inheritance'
    | 'insurance'
    | 'insurgency_corruption_contribution_reward'
    | 'insurgency_suppression_contribution_reward'
    | 'item_trader_payment'
    | 'jump_clone_activation_fee'
    | 'jump_clone_installation_fee'
    | 'kill_right_fee'
    | 'lp_store'
    | 'manufacturing'
    | 'market_escrow'
    | 'market_fine_paid'
    | 'market_provider_tax'
    | 'market_transaction'
    | 'medal_creation'
    | 'medal_issued'
    | 'milestone_reward_payment'
    | 'mission_completion'
    | 'mission_cost'
    | 'mission_expiration'
    | 'mission_reward'
    | 'office_rental_fee'
    | 'operation_bonus'
    | 'opportunity_reward'
    | 'planetary_construction'
    | 'planetary_export_tax'
    | 'planetary_import_tax'
    | 'player_donation'
    | 'player_trading'
    | 'project_discovery_reward'
    | 'project_discovery_tax'
    | 'project_payouts'
    | 'reaction'
    | 'redeemed_isk_token'
    | 'release_of_impounded_property'
    | 'repair_bill'
    | 'reprocessing_tax'
    | 'researching_material_productivity'
    | 'researching_technology'
    | 'researching_time_productivity'
    | 'resource_wars_reward'
    | 'reverse_engineering'
    | 'season_challenge_reward'
    | 'security_processing_fee'
    | 'shares'
    | 'skill_purchase'
    | 'skyhook_claim_fee'
    | 'sovereignity_bill'
    | 'store_purchase'
    | 'store_purchase_refund'
    | 'structure_gate_jump'
    | 'transaction_tax'
    | 'under_construction'
    | 'upkeep_adjustment_fee'
    | 'war_ally_contract'
    | 'war_fee'
    | 'war_fee_surrender'
  second_party_id: number
  tax: number
  tax_receiver_id: number
}[]

export interface GetCorporationWalletsDivisionJournalParams {
  corporation_id: number | string
  division: number | string
  page?: number
}

export interface GetCorporationWalletsDivisionJournalResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetCorporationWalletsDivisionTransactionsResponse = {
  client_id: number
  date: string
  is_buy: boolean
  journal_ref_id: number
  location_id: number
  quantity: number
  transaction_id: number
  type_id: number
  unit_price: number
}[]

export interface GetCorporationWalletsDivisionTransactionsParams {
  corporation_id: number | string
  division: number | string
  from_id?: number
}

export interface GetCorporationWalletsDivisionTransactionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetDogmaAttributesResponse = number[]

export interface GetDogmaAttributesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetDogmaAttributeResponse {
  attribute_id: number
  default_value?: number
  description?: string
  display_name?: string
  high_is_good?: boolean
  icon_id?: number
  name?: string
  published?: boolean
  stackable?: boolean
  unit_id?: number
}

export interface GetDogmaAttributeParams {
  attribute_id: number | string
}

export interface GetDogmaAttributeResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetDogmaDynamicTypeItemIdResponse {
  created_by: number
  dogma_attributes: { attribute_id: number; value: number }[]
  dogma_effects: { effect_id: number; is_default: boolean }[]
  mutator_type_id: number
  source_type_id: number
}

export interface GetDogmaDynamicTypeItemIdParams {
  type_id: number | string
  item_id: number | string
}

export interface GetDogmaDynamicTypeItemIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetDogmaEffectsResponse = number[]

export interface GetDogmaEffectsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetDogmaEffectResponse {
  description?: string
  disallow_auto_repeat?: boolean
  discharge_attribute_id?: number
  display_name?: string
  duration_attribute_id?: number
  effect_category?: number
  effect_id: number
  electronic_chance?: boolean
  falloff_attribute_id?: number
  icon_id?: number
  is_assistance?: boolean
  is_offensive?: boolean
  is_warp_safe?: boolean
  modifiers?: {
    domain: string
    effect_id: number
    func: string
    modified_attribute_id: number
    modifying_attribute_id: number
    operator: number
  }[]
  name?: string
  post_expression?: number
  pre_expression?: number
  published?: boolean
  range_attribute_id?: number
  range_chance?: boolean
  tracking_speed_attribute_id?: number
}

export interface GetDogmaEffectParams {
  effect_id: number | string
}

export interface GetDogmaEffectResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetFleetResponse {
  is_free_move: boolean
  is_registered: boolean
  is_voice_enabled: boolean
  motd: string
}

export interface GetFleetParams {
  fleet_id: number | string
}

export interface GetFleetResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutFleetParams {
  fleet_id: number | string
  is_free_move?: boolean
  motd?: string
}

export interface PutFleetResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetFleetMembersResponse = {
  character_id: number
  join_time: string
  role:
    | 'fleet_commander'
    | 'wing_commander'
    | 'squad_commander'
    | 'squad_member'
  role_name: string
  ship_type_id: number
  solar_system_id: number
  squad_id: number
  station_id: number
  takes_fleet_warp: boolean
  wing_id: number
}[]

export interface GetFleetMembersParams {
  fleet_id: number | string
}

export interface GetFleetMembersResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface PostFleetMembersParams {
  fleet_id: number | string
  character_id: number
  role:
    | 'fleet_commander'
    | 'wing_commander'
    | 'squad_commander'
    | 'squad_member'
  squad_id?: number
  wing_id?: number
}

export interface PostFleetMembersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteFleetMemberParams {
  fleet_id: number | string
  member_id: number | string
}

export interface DeleteFleetMemberResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutFleetMemberParams {
  fleet_id: number | string
  member_id: number | string
  role:
    | 'fleet_commander'
    | 'wing_commander'
    | 'squad_commander'
    | 'squad_member'
  squad_id?: number
  wing_id?: number
}

export interface PutFleetMemberResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteFleetSquadParams {
  fleet_id: number | string
  squad_id: number | string
}

export interface DeleteFleetSquadResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutFleetSquadParams {
  fleet_id: number | string
  squad_id: number | string
  name: string
}

export interface PutFleetSquadResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetFleetWingsResponse = {
  id: number
  name: string
  squads: { id: number; name: string }[]
}[]

export interface GetFleetWingsParams {
  fleet_id: number | string
}

export interface GetFleetWingsResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface PostFleetWingsResponse {
  wing_id: number
}

export interface PostFleetWingsParams {
  fleet_id: number | string
}

export interface PostFleetWingsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface DeleteFleetWingParams {
  fleet_id: number | string
  wing_id: number | string
}

export interface DeleteFleetWingResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PutFleetWingParams {
  fleet_id: number | string
  wing_id: number | string
  name: string
}

export interface PutFleetWingResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostFleetWingSquadsResponse {
  squad_id: number
}

export interface PostFleetWingSquadsParams {
  fleet_id: number | string
  wing_id: number | string
}

export interface PostFleetWingSquadsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetFwLeaderboardsResponse {
  kills: {
    active_total: { amount: number; faction_id: number }[]
    last_week: { amount: number; faction_id: number }[]
    yesterday: { amount: number; faction_id: number }[]
  }
  victory_points: {
    active_total: { amount: number; faction_id: number }[]
    last_week: { amount: number; faction_id: number }[]
    yesterday: { amount: number; faction_id: number }[]
  }
}

export interface GetFwLeaderboardsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetFwLeaderboardsCharactersResponse {
  kills: {
    active_total: { amount: number; character_id: number }[]
    last_week: { amount: number; character_id: number }[]
    yesterday: { amount: number; character_id: number }[]
  }
  victory_points: {
    active_total: { amount: number; character_id: number }[]
    last_week: { amount: number; character_id: number }[]
    yesterday: { amount: number; character_id: number }[]
  }
}

export interface GetFwLeaderboardsCharactersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetFwLeaderboardsCorporationsResponse {
  kills: {
    active_total: { amount: number; corporation_id: number }[]
    last_week: { amount: number; corporation_id: number }[]
    yesterday: { amount: number; corporation_id: number }[]
  }
  victory_points: {
    active_total: { amount: number; corporation_id: number }[]
    last_week: { amount: number; corporation_id: number }[]
    yesterday: { amount: number; corporation_id: number }[]
  }
}

export interface GetFwLeaderboardsCorporationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetFwStatsResponse = {
  faction_id: number
  kills: { last_week: number; total: number; yesterday: number }
  pilots: number
  systems_controlled: number
  victory_points: { last_week: number; total: number; yesterday: number }
}[]

export interface GetFwStatsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetFwSystemsResponse = {
  contested: 'captured' | 'contested' | 'uncontested' | 'vulnerable'
  occupier_faction_id: number
  owner_faction_id: number
  solar_system_id: number
  victory_points: number
  victory_points_threshold: number
}[]

export interface GetFwSystemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetFwWarsResponse = { against_id: number; faction_id: number }[]

export interface GetFwWarsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetIncursionsResponse = {
  constellation_id: number
  faction_id: number
  has_boss: boolean
  infested_solar_systems: number[]
  influence: number
  staging_solar_system_id: number
  state: 'withdrawing' | 'mobilizing' | 'established'
  type: string
}[]

export interface GetIncursionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetIndustryFacilitiesResponse = {
  facility_id: number
  owner_id: number
  region_id: number
  solar_system_id: number
  tax: number
  type_id: number
}[]

export interface GetIndustryFacilitiesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetIndustrySystemsResponse = {
  cost_indices: {
    activity:
      | 'copying'
      | 'duplicating'
      | 'invention'
      | 'manufacturing'
      | 'none'
      | 'reaction'
      | 'researching_material_efficiency'
      | 'researching_technology'
      | 'researching_time_efficiency'
      | 'reverse_engineering'
    cost_index: number
  }[]
  solar_system_id: number
}[]

export interface GetIndustrySystemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetInsurancePricesResponse = {
  levels: { cost: number; name: string; payout: number }[]
  type_id: number
}[]

export interface GetInsurancePricesResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface GetKillmailKillmailHashResponse {
  attackers: {
    alliance_id: number
    character_id: number
    corporation_id: number
    damage_done: number
    faction_id: number
    final_blow: boolean
    security_status: number
    ship_type_id: number
    weapon_type_id: number
  }[]
  killmail_id: number
  killmail_time: string
  moon_id?: number
  solar_system_id: number
  victim: {
    alliance_id: number
    character_id: number
    corporation_id: number
    damage_taken: number
    faction_id: number
    items: {
      flag: number
      item_type_id: number
      items: {
        flag: number
        item_type_id: number
        quantity_destroyed: number
        quantity_dropped: number
        singleton: number
      }[]
      quantity_destroyed: number
      quantity_dropped: number
      singleton: number
    }[]
    position: { x: number; y: number; z: number }
    ship_type_id: number
  }
  war_id?: number
}

export interface GetKillmailKillmailHashParams {
  killmail_id: number | string
  killmail_hash: number | string
}

export interface GetKillmailKillmailHashResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetLoyaltyCorporationOffersResponse = {
  ak_cost: number
  isk_cost: number
  lp_cost: number
  offer_id: number
  quantity: number
  required_items: { quantity: number; type_id: number }[]
  type_id: number
}[]

export interface GetLoyaltyCorporationOffersParams {
  corporation_id: number | string
}

export interface GetLoyaltyCorporationOffersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetMarketsGroupsResponse = number[]

export interface GetMarketsGroupsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetMarketsGroupsMarketGroupIdResponse {
  description: string
  market_group_id: number
  name: string
  parent_group_id?: number
  types: number[]
}

export interface GetMarketsGroupsMarketGroupIdParams {
  market_group_id: number | string
}

export interface GetMarketsGroupsMarketGroupIdResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetMarketsPricesResponse = {
  adjusted_price: number
  average_price: number
  type_id: number
}[]

export interface GetMarketsPricesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetMarketsStructureResponse = {
  duration: number
  is_buy_order: boolean
  issued: string
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | 'station'
    | 'region'
    | 'solarsystem'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '10'
    | '20'
    | '30'
    | '40'
  type_id: number
  volume_remain: number
  volume_total: number
}[]

export interface GetMarketsStructureParams {
  structure_id: number | string
  page?: number
}

export interface GetMarketsStructureResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetRegionHistoryResponse = {
  average: number
  date: string
  highest: number
  lowest: number
  order_count: number
  volume: number
}[]

export interface GetRegionHistoryParams {
  region_id: number | string
  type_id?: number
}

export interface GetRegionHistoryResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetRegionOrdersResponse = {
  duration: number
  is_buy_order: boolean
  issued: string
  location_id: number
  min_volume: number
  order_id: number
  price: number
  range:
    | 'station'
    | 'region'
    | 'solarsystem'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '10'
    | '20'
    | '30'
    | '40'
  system_id: number
  type_id: number
  volume_remain: number
  volume_total: number
}[]

export interface GetRegionOrdersParams {
  region_id: number | string
  order_type?: 'buy' | 'sell' | 'all'
  page?: number
  type_id?: number
}

export interface GetRegionOrdersResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export type GetRegionTypesResponse = number[]

export interface GetRegionTypesParams {
  region_id: number | string
  page?: number
}

export interface GetRegionTypesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetMetaChangelogResponse {
  changelog: Record<string, unknown>
}

export interface GetMetaChangelogResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetMetaCompatibilityDatesResponse {
  compatibility_dates: CompatibilityDate[]
}

export interface GetMetaCompatibilityDatesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetRouteOriginDestinationResponse = number[]

export interface GetRouteOriginDestinationParams {
  origin: number | string
  destination: number | string
  avoid?: number[]
  connections?: number[][]
  flag?: 'shortest' | 'secure' | 'insecure'
}

export interface GetRouteOriginDestinationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetSovereigntyCampaignsResponse = {
  attackers_score: number
  campaign_id: number
  constellation_id: number
  defender_id: number
  defender_score: number
  event_type:
    | 'tcu_defense'
    | 'ihub_defense'
    | 'station_defense'
    | 'station_freeport'
  participants: { alliance_id: number; score: number }[]
  solar_system_id: number
  start_time: string
  structure_id: number
}[]

export interface GetSovereigntyCampaignsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetSovereigntyMapResponse = {
  alliance_id: number
  corporation_id: number
  faction_id: number
  system_id: number
}[]

export interface GetSovereigntyMapResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetSovereigntyStructuresResponse = {
  alliance_id: number
  solar_system_id: number
  structure_id: number
  structure_type_id: number
  vulnerability_occupancy_level: number
  vulnerable_end_time: string
  vulnerable_start_time: string
}[]

export interface GetSovereigntyStructuresResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetStatusResponse {
  players: number
  server_version: string
  start_time: string
  vip?: boolean
}

export interface GetStatusResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUiAutopilotWaypointParams {
  add_to_beginning?: boolean
  clear_other_waypoints?: boolean
  destination_id?: number
}

export interface PostUiAutopilotWaypointResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUiOpenwindowContractParams {
  contract_id?: number
}

export interface PostUiOpenwindowContractResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUiOpenwindowInformationParams {
  target_id?: number
}

export interface PostUiOpenwindowInformationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUiOpenwindowMarketdetailsParams {
  type_id?: number
}

export interface PostUiOpenwindowMarketdetailsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUiOpenwindowNewmailParams {
  body: string
  recipients: number[]
  subject: string
  to_corp_or_alliance_id?: number
  to_mailing_list_id?: number
}

export interface PostUiOpenwindowNewmailResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseAncestriesResponse = {
  bloodline_id: number
  description: string
  icon_id: number
  id: number
  name: string
  short_description: string
}[]

export interface GetUniverseAncestriesResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseAsteroidBeltsAsteroidBeltIdResponse {
  name: string
  position: { x: number; y: number; z: number }
  system_id: number
}

export interface GetUniverseAsteroidBeltsAsteroidBeltIdParams {
  asteroid_belt_id: number | string
}

export interface GetUniverseAsteroidBeltsAsteroidBeltIdResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseBloodlinesResponse = {
  bloodline_id: number
  charisma: number
  corporation_id: number
  description: string
  intelligence: number
  memory: number
  name: string
  perception: number
  race_id: number
  ship_type_id: number
  willpower: number
}[]

export interface GetUniverseBloodlinesResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseCategoriesResponse = number[]

export interface GetUniverseCategoriesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseCategoryResponse {
  category_id: number
  groups: number[]
  name: string
  published: boolean
}

export interface GetUniverseCategoryParams {
  category_id: number | string
}

export interface GetUniverseCategoryResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseConstellationsResponse = number[]

export interface GetUniverseConstellationsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseConstellationResponse {
  constellation_id: number
  name: string
  position: { x: number; y: number; z: number }
  region_id: number
  systems: number[]
}

export interface GetUniverseConstellationParams {
  constellation_id: number | string
}

export interface GetUniverseConstellationResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseFactionsResponse = {
  corporation_id: number
  description: string
  faction_id: number
  is_unique: boolean
  militia_corporation_id: number
  name: string
  size_factor: number
  solar_system_id: number
  station_count: number
  station_system_count: number
}[]

export interface GetUniverseFactionsResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseGraphicsResponse = number[]

export interface GetUniverseGraphicsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseGraphicResponse {
  collision_file?: string
  graphic_file?: string
  graphic_id: number
  icon_folder?: string
  sof_dna?: string
  sof_fation_name?: string
  sof_hull_name?: string
  sof_race_name?: string
}

export interface GetUniverseGraphicParams {
  graphic_id: number | string
}

export interface GetUniverseGraphicResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseGroupsResponse = number[]

export interface GetUniverseGroupsParams {
  page?: number
}

export interface GetUniverseGroupsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetUniverseGroupResponse {
  category_id: number
  group_id: number
  name: string
  published: boolean
  types: number[]
}

export interface GetUniverseGroupParams {
  group_id: number | string
}

export interface GetUniverseGroupResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface PostUniverseIdsResponse {
  agents?: { id: number; name: string }[]
  alliances?: { id: number; name: string }[]
  characters?: { id: number; name: string }[]
  constellations?: { id: number; name: string }[]
  corporations?: { id: number; name: string }[]
  factions?: { id: number; name: string }[]
  inventory_types?: { id: number; name: string }[]
  regions?: { id: number; name: string }[]
  stations?: { id: number; name: string }[]
  systems?: { id: number; name: string }[]
}

export interface PostUniverseIdsParams {
  body: string[]
}

export interface PostUniverseIdsResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseMoonResponse {
  moon_id: number
  name: string
  position: { x: number; y: number; z: number }
  system_id: number
}

export interface GetUniverseMoonParams {
  moon_id: number | string
}

export interface GetUniverseMoonResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type PostUniverseNamesResponse = {
  category:
    | 'alliance'
    | 'character'
    | 'constellation'
    | 'corporation'
    | 'inventory_type'
    | 'region'
    | 'solar_system'
    | 'station'
    | 'faction'
  id: number
  name: string
}[]

export interface PostUniverseNamesParams {
  body: number[]
}

export interface PostUniverseNamesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniversePlanetResponse {
  name: string
  planet_id: number
  position: { x: number; y: number; z: number }
  system_id: number
  type_id: number
}

export interface GetUniversePlanetParams {
  planet_id: number | string
}

export interface GetUniversePlanetResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseRacesResponse = {
  alliance_id: number
  description: string
  name: string
  race_id: number
}[]

export interface GetUniverseRacesResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseRegionsResponse = number[]

export interface GetUniverseRegionsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseRegionResponse {
  constellations: number[]
  description?: string
  name: string
  region_id: number
}

export interface GetUniverseRegionParams {
  region_id: number | string
}

export interface GetUniverseRegionResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseSchematicResponse {
  cycle_time: number
  schematic_name: string
}

export interface GetUniverseSchematicParams {
  schematic_id: number | string
}

export interface GetUniverseSchematicResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseStargateResponse {
  destination: { stargate_id: number; system_id: number }
  name: string
  position: { x: number; y: number; z: number }
  stargate_id: number
  system_id: number
  type_id: number
}

export interface GetUniverseStargateParams {
  stargate_id: number | string
}

export interface GetUniverseStargateResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseStarResponse {
  age: number
  luminosity: number
  name: string
  radius: number
  solar_system_id: number
  spectral_class:
    | 'K2 V'
    | 'K4 V'
    | 'G2 V'
    | 'G8 V'
    | 'M7 V'
    | 'K7 V'
    | 'M2 V'
    | 'K5 V'
    | 'M3 V'
    | 'G0 V'
    | 'G7 V'
    | 'G3 V'
    | 'F9 V'
    | 'G5 V'
    | 'F6 V'
    | 'K8 V'
    | 'K9 V'
    | 'K6 V'
    | 'G9 V'
    | 'G6 V'
    | 'G4 VI'
    | 'G4 V'
    | 'F8 V'
    | 'F2 V'
    | 'F1 V'
    | 'K3 V'
    | 'F0 VI'
    | 'G1 VI'
    | 'G0 VI'
    | 'K1 V'
    | 'M4 V'
    | 'M1 V'
    | 'M6 V'
    | 'M0 V'
    | 'K2 IV'
    | 'G2 VI'
    | 'K0 V'
    | 'K5 IV'
    | 'F5 VI'
    | 'G6 VI'
    | 'F6 VI'
    | 'F2 IV'
    | 'G3 VI'
    | 'M8 V'
    | 'F1 VI'
    | 'K1 IV'
    | 'F7 V'
    | 'G5 VI'
    | 'M5 V'
    | 'G7 VI'
    | 'F5 V'
    | 'F4 VI'
    | 'F8 VI'
    | 'K3 IV'
    | 'F4 IV'
    | 'F0 V'
    | 'G7 IV'
    | 'G8 VI'
    | 'F2 VI'
    | 'F4 V'
    | 'F7 VI'
    | 'F3 V'
    | 'G1 V'
    | 'G9 VI'
    | 'F3 IV'
    | 'F9 VI'
    | 'M9 V'
    | 'K0 IV'
    | 'F1 IV'
    | 'G4 IV'
    | 'F3 VI'
    | 'K4 IV'
    | 'G5 IV'
    | 'G3 IV'
    | 'G1 IV'
    | 'K7 IV'
    | 'G0 IV'
    | 'K6 IV'
    | 'K9 IV'
    | 'G2 IV'
    | 'F9 IV'
    | 'F0 IV'
    | 'K8 IV'
    | 'G8 IV'
    | 'F6 IV'
    | 'F5 IV'
    | 'A0'
    | 'A0IV'
    | 'A0IV2'
  temperature: number
  type_id: number
}

export interface GetUniverseStarParams {
  star_id: number | string
}

export interface GetUniverseStarResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseStationResponse {
  max_dockable_ship_volume: number
  name: string
  office_rental_cost: number
  owner?: number
  position: { x: number; y: number; z: number }
  race_id?: number
  reprocessing_efficiency: number
  reprocessing_stations_take: number
  services: (
    | 'bounty-missions'
    | 'assasination-missions'
    | 'courier-missions'
    | 'interbus'
    | 'reprocessing-plant'
    | 'refinery'
    | 'market'
    | 'black-market'
    | 'stock-exchange'
    | 'cloning'
    | 'surgery'
    | 'dna-therapy'
    | 'repair-facilities'
    | 'factory'
    | 'labratory'
    | 'gambling'
    | 'fitting'
    | 'paintshop'
    | 'news'
    | 'storage'
    | 'insurance'
    | 'docking'
    | 'office-rental'
    | 'jump-clone-facility'
    | 'loyalty-point-store'
    | 'navy-offices'
    | 'security-offices'
  )[]
  station_id: number
  system_id: number
  type_id: number
}

export interface GetUniverseStationParams {
  station_id: number | string
}

export interface GetUniverseStationResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseStructuresResponse = number[]

export interface GetUniverseStructuresParams {
  filter?: 'market' | 'manufacturing_basic'
}

export interface GetUniverseStructuresResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseStructureResponse {
  name: string
  owner_id: number
  position?: { x: number; y: number; z: number }
  solar_system_id: number
  type_id?: number
}

export interface GetUniverseStructureParams {
  structure_id: number | string
}

export interface GetUniverseStructureResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseSystemJumpsResponse = {
  ship_jumps: number
  system_id: number
}[]

export interface GetUniverseSystemJumpsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseSystemKillsResponse = {
  npc_kills: number
  pod_kills: number
  ship_kills: number
  system_id: number
}[]

export interface GetUniverseSystemKillsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseSystemsResponse = number[]

export interface GetUniverseSystemsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetUniverseSystemResponse {
  constellation_id: number
  name: string
  planets?: { asteroid_belts: number[]; moons: number[]; planet_id: number }[]
  position: { x: number; y: number; z: number }
  security_class?: string
  security_status: number
  star_id?: number
  stargates?: number[]
  stations?: number[]
  system_id: number
}

export interface GetUniverseSystemParams {
  system_id: number | string
}

export interface GetUniverseSystemResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetUniverseTypesResponse = number[]

export interface GetUniverseTypesParams {
  page?: number
}

export interface GetUniverseTypesResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}

export interface GetUniverseTypeResponse {
  capacity?: number
  description: string
  dogma_attributes?: { attribute_id: number; value: number }[]
  dogma_effects?: { effect_id: number; is_default: boolean }[]
  graphic_id?: number
  group_id: number
  icon_id?: number
  market_group_id?: number
  mass?: number
  name: string
  packaged_volume?: number
  portion_size?: number
  published: boolean
  radius?: number
  type_id: number
  volume?: number
}

export interface GetUniverseTypeParams {
  type_id: number | string
}

export interface GetUniverseTypeResponseHeaders {
  'Cache-Control'?: string
  'Content-Language'?: 'en' | 'de' | 'fr' | 'ja' | 'ru' | 'zh' | 'ko' | 'es'
  ETag?: string
  'Last-Modified'?: string
}

export type GetWarsResponse = number[]

export interface GetWarsParams {
  max_war_id?: number
}

export interface GetWarsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export interface GetWarResponse {
  aggressor: {
    alliance_id: number
    corporation_id: number
    isk_destroyed: number
    ships_killed: number
  }
  allies?: { alliance_id: number; corporation_id: number }[]
  declared: string
  defender: {
    alliance_id: number
    corporation_id: number
    isk_destroyed: number
    ships_killed: number
  }
  finished?: string
  id: number
  mutual: boolean
  open_for_allies: boolean
  retracted?: string
  started?: string
}

export interface GetWarParams {
  war_id: number | string
}

export interface GetWarResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
}

export type GetWarKillmailsResponse = {
  killmail_hash: string
  killmail_id: number
}[]

export interface GetWarKillmailsParams {
  war_id: number | string
  page?: number
}

export interface GetWarKillmailsResponseHeaders {
  'Cache-Control'?: string
  ETag?: string
  'Last-Modified'?: string
  'X-Pages'?: number
}
