# @localisprimary/esi

A slightly opinionated TypeScript client library for the EVE Online ESI (EVE Swagger Interface) API.

## Usage

```typescript
import { EsiClient } from '@localisprimary/esi'

// Create client (optionally with auth token)
const esi = new EsiClient({ token: 'bearer-token' })

// Get all alliances
const alliances = await esi.getAlliances()
console.log(alliances.data)

// Get specific alliance by ID
const alliance = await esi.getAlliance({ alliance_id: 123 })
console.log(alliance.data)
```

## Methods

This client provides methods for all EVE ESI endpoints. Methods return a Promise that resolves to an `EsiResponse<T>` object or throws an `EsiError`.

```typescript
interface EsiResponse<T> {
  data: T;
  status: number;
  headers: Partial<Record<string, string>>;
}

interface EsiError {
  error: string;
  status: number;
}
```

All methods are fully typed: `getAlliance` will take `GetAllianceParams` and return `GetAllianceResponse`.

`Params` types make no distinction between path, query, or body parameters, it's all the same object:
```typescript
const esi = new EsiClient({ token: 'bearer-token' })

// https://esi.evetech.net/characters/{character_id}/mail
esi.postCharacterMail({
  // character_id path parameter
  character_id: 91884358,

  // request body
  approved_cost: 0,
  body: "Hello from the ESI!",
  recipients: [{ recipient_type: 'character', recipient_id: 96135698 }]
})
```

| Method | Description
|--------|-------------|
| [`getAlliance`](https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceId) | Public information about an alliance |
| [`getAllianceContacts`](https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContacts) | Return contacts of an alliance |
| [`getAllianceContactsLabels`](https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContactsLabels) | Return custom labels for an alliance's contacts |
| [`getAllianceCorporations`](https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdCorporations) | List all current member corporations of an alliance |
| [`getAllianceIcons`](https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdIcons) | Get the icon urls for a alliance. This route expires daily at 11:05 |
| [`getAlliances`](https://developers.eveonline.com/api-explorer#/operations/GetAlliances) | List all active player alliances |
| [`getCharacter`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterId) | Public information about a character |
| [`getCharacterAgentsResearch`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAgentsResearch) | Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate) |
| [`getCharacterAssets`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAssets) | Return a list of the characters assets |
| [`postCharacterAssetsLocations`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsLocations) | Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0) |
| [`postCharacterAssetsNames`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsNames) | Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships. |
| [`getCharacterAttributes`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAttributes) | Return attributes of a character |
| [`getCharacterBlueprints`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdBlueprints) | Return a list of blueprints the character owns |
| [`getCharacterCalendar`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendar) | Get 50 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event |
| [`getCharacterCalendarEventAttendees`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventIdAttendees) | Get all invited attendees for a given event |
| [`getCharacterCalendarEventId`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventId) | Get all the information for a specific event |
| [`putCharacterCalendarEventId`](https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdCalendarEventId) | Set your response status to an event |
| [`getCharacterClones`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdClones) | A list of the character's clones |
| [`deleteCharacterContacts`](https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdContacts) | Bulk delete contacts |
| [`getCharacterContacts`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContacts) | Return contacts of a character |
| [`postCharacterContacts`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdContacts) | Bulk add contacts with same settings |
| [`putCharacterContacts`](https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdContacts) | Bulk edit contacts with same settings |
| [`getCharacterContactsLabels`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContactsLabels) | Return custom labels for a character's contacts |
| [`getCharacterContractBids`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdBids) | Lists bids on a particular auction contract |
| [`getCharacterContractItems`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdItems) | Lists items of a particular contract |
| [`getCharacterContracts`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContracts) | Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress". |
| [`getCharacterCorporationhistory`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCorporationhistory) | Get a list of all the corporations a character has been a member of |
| [`postCharacterCspa`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdCspa) | Takes a source character ID in the url and a set of target character ID's in the body, returns a CSPA charge cost |
| [`getCharacterFatigue`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFatigue) | Return a character's jump activation and fatigue information |
| [`deleteCharacterFitting`](https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdFittingsFittingId) | Delete a fitting from a character |
| [`getCharacterFittings`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFittings) | Return fittings of a character |
| [`postCharacterFittings`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdFittings) | Save a new fitting for a character |
| [`getCharacterFleet`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFleet) | Return the fleet ID the character is in, if any. |
| [`getCharacterFwStats`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFwStats) | Statistical overview of a character involved in faction warfare. This route expires daily at 11:05 |
| [`getCharacterImplants`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdImplants) | Return implants on the active clone of a character |
| [`getCharacterIndustryJobs`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdIndustryJobs) | List industry jobs placed by a character |
| [`getCharacterKillmailsRecent`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdKillmailsRecent) | Return a list of a character's kills and losses going back 90 days |
| [`getCharacterLocation`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLocation) | Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable |
| [`getCharacterLoyaltyPoints`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLoyaltyPoints) | Return a list of loyalty points for all corporations the character has worked for |
| [`getCharacterMail`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMail) | Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards |
| [`postCharacterMail`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMail) | Create and send a new mail |
| [`deleteCharacterMailLabel`](https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailLabelsLabelId) | Delete a mail label |
| [`getCharacterMailLabels`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLabels) | Return a list of the users mail labels, unread counts for each label and a total unread count. |
| [`postCharacterMailLabels`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMailLabels) | Create a mail label |
| [`getCharacterMailLists`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLists) | Return all mailing lists that the character is subscribed to |
| [`deleteCharacterMailMailId`](https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailMailId) | Delete a mail |
| [`getCharacterMailMailId`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailMailId) | Return the contents of an EVE mail |
| [`putCharacterMailMailId`](https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdMailMailId) | Update metadata about a mail |
| [`getCharacterMedals`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMedals) | Return a list of medals the character has |
| [`getCharacterMining`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMining) | Paginated record of all mining done by a character for the past 30 days |
| [`getCharacterNotifications`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotifications) | Return character notifications |
| [`getCharacterNotificationsContacts`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotificationsContacts) | Return notifications about having been added to someone's contact list |
| [`getCharacterOnline`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOnline) | Checks if the character is currently online |
| [`getCharacterOrders`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrders) | List open market orders placed by a character |
| [`getCharacterOrdersHistory`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrdersHistory) | List cancelled and expired market orders placed by a character up to 90 days in the past. |
| [`getCharacterPlanet`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanetsPlanetId) | Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met. |
| [`getCharacterPlanets`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanets) | Returns a list of all planetary colonies owned by a character. |
| [`getCharacterPortrait`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPortrait) | Get portrait urls for a character. This route expires daily at 11:05 |
| [`getCharacterRoles`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdRoles) | Returns a character's corporation roles |
| [`postCharactersAffiliation`](https://developers.eveonline.com/api-explorer#/operations/PostCharactersAffiliation) | Bulk lookup of character IDs to corporation, alliance and faction |
| [`getCharacterSearch`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSearch) | Search for entities that match a given sub-string. |
| [`getCharacterShip`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdShip) | Get the current ship type, name and id |
| [`getCharacterSkillqueue`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkillqueue) | List the configured skill queue for the given character |
| [`getCharacterSkills`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkills) | List all trained skills for the given character |
| [`getCharacterStandings`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdStandings) | Return character standings from agents, NPC corporations, and factions |
| [`getCharacterTitles`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdTitles) | Returns a character's titles |
| [`getCharacterWallet`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWallet) | Returns a character's wallet balance |
| [`getCharacterWalletJournal`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletJournal) | Retrieve the given character's wallet journal going 30 days back |
| [`getCharacterWalletTransactions`](https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletTransactions) | Get wallet transactions of a character |
| [`getContractsPublicBids`](https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicBidsContractId) | Lists bids on a public auction contract |
| [`getContractsPublicItems`](https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicItemsContractId) | Lists items of a public contract |
| [`getContractsPublicRegionId`](https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicRegionId) | Returns a paginated list of all public contracts in the given region |
| [`getCorporation`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationId) | Public information about a corporation |
| [`getCorporationAlliancehistory`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAlliancehistory) | Get a list of all the alliances a corporation has been a member of |
| [`getCorporationAssets`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAssets) | Return a list of the corporation assets. Requires one of the following EVE corporation role(s): Director |
| [`postCorporationAssetsLocations`](https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsLocations) | Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0). Requires one of the following EVE corporation role(s): Director |
| [`postCorporationAssetsNames`](https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsNames) | Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationBlueprints`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdBlueprints) | Returns a list of blueprints the corporation owns. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationContacts`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContacts) | Return contacts of a corporation |
| [`getCorporationContactsLabels`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContactsLabels) | Return custom labels for a corporation's contacts |
| [`getCorporationContainersLogs`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContainersLogs) | Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationContractBids`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdBids) | Lists bids on a particular auction contract |
| [`getCorporationContractItems`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdItems) | Lists items of a particular contract |
| [`getCorporationContracts`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContracts) | Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress". |
| [`getCorporationCorporationMiningExtractions`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningExtractions) | Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.. Requires one of the following EVE corporation role(s): Station_Manager |
| [`getCorporationCorporationMiningObserver`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObserversObserverId) | Paginated record of all mining seen by an observer. Requires one of the following EVE corporation role(s): Accountant |
| [`getCorporationCorporationMiningObservers`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObservers) | Paginated list of all entities capable of observing and recording mining for a corporation. Requires one of the following EVE corporation role(s): Accountant |
| [`getCorporationCustomsOffices`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdCustomsOffices) | List customs offices owned by a corporation. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationDivisions`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdDivisions) | Return corporation hangar and wallet division names, only show if a division is not using the default name. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationFacilities`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFacilities) | Return a corporation's facilities. Requires one of the following EVE corporation role(s): Factory_Manager |
| [`getCorporationFwStats`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFwStats) | Statistics about a corporation involved in faction warfare. This route expires daily at 11:05 |
| [`getCorporationIcons`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIcons) | Get the icon urls for a corporation |
| [`getCorporationIndustryJobs`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIndustryJobs) | List industry jobs run by a corporation. Requires one of the following EVE corporation role(s): Factory_Manager |
| [`getCorporationKillmailsRecent`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdKillmailsRecent) | Get a list of a corporation's kills and losses going back 90 days. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationMedals`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedals) | Returns a corporation's medals |
| [`getCorporationMedalsIssued`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedalsIssued) | Returns medals issued by a corporation. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationMembers`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembers) | Return the current member list of a corporation, the token's character need to be a member of the corporation. |
| [`getCorporationMembersLimit`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersLimit) | Return a corporation's member limit, not including CEO himself. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationMembersTitles`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersTitles) | Returns a corporation's members' titles. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationMembertracking`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembertracking) | Returns additional information about a corporation's members which helps tracking their activities. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationOrders`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrders) | List open market orders placed on behalf of a corporation. Requires one of the following EVE corporation role(s): Accountant, Trader |
| [`getCorporationOrdersHistory`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrdersHistory) | List cancelled and expired market orders placed on behalf of a corporation up to 90 days in the past.. Requires one of the following EVE corporation role(s): Accountant, Trader |
| [`getCorporationRoles`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRoles) | Return the roles of all members if the character has the personnel manager role or any grantable role. |
| [`getCorporationRolesHistory`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRolesHistory) | Return how roles have changed for a coporation's members, up to a month. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationShareholders`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdShareholders) | Return the current shareholders of a corporation.. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationsNpccorps`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsNpccorps) | Get a list of npc corporations. This route expires daily at 11:05 |
| [`getCorporationStandings`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStandings) | Return corporation standings from agents, NPC corporations, and factions |
| [`getCorporationStarbase`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbasesStarbaseId) | Returns various settings and fuels of a starbase (POS). Requires one of the following EVE corporation role(s): Director |
| [`getCorporationStarbases`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbases) | Returns list of corporation starbases (POSes). Requires one of the following EVE corporation role(s): Director |
| [`getCorporationStructures`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStructures) | Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-2.0-structures-changes-coming-on-february-13th. Requires one of the following EVE corporation role(s): Station_Manager |
| [`getCorporationTitles`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdTitles) | Returns a corporation's titles. Requires one of the following EVE corporation role(s): Director |
| [`getCorporationWallets`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWallets) | Get a corporation's wallets. Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant |
| [`getCorporationWalletsDivisionJournal`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionJournal) | Retrieve the given corporation's wallet journal for the given division going 30 days back. Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant |
| [`getCorporationWalletsDivisionTransactions`](https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionTransactions) | Get wallet transactions of a corporation. Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant |
| [`getDogmaAttribute`](https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributesAttributeId) | Get information on a dogma attribute. This route expires daily at 11:05 |
| [`getDogmaAttributes`](https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributes) | Get a list of dogma attribute ids. This route expires daily at 11:05 |
| [`getDogmaDynamicTypeItemId`](https://developers.eveonline.com/api-explorer#/operations/GetDogmaDynamicItemsTypeIdItemId) | Returns info about a dynamic item resulting from mutation with a mutaplasmid.. This route expires daily at 11:05 |
| [`getDogmaEffect`](https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffectsEffectId) | Get information on a dogma effect. This route expires daily at 11:05 |
| [`getDogmaEffects`](https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffects) | Get a list of dogma effect ids. This route expires daily at 11:05 |
| [`getFleet`](https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetId) | Return details about a fleet |
| [`putFleet`](https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetId) | Update settings about a fleet |
| [`deleteFleetMember`](https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdMembersMemberId) | Kick a fleet member |
| [`putFleetMember`](https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdMembersMemberId) | Move a fleet member around |
| [`getFleetMembers`](https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdMembers) | Return information about fleet members |
| [`postFleetMembers`](https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdMembers) | Invite a character into the fleet. If a character has a CSPA charge set it is not possible to invite them to the fleet using ESI |
| [`deleteFleetSquad`](https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdSquadsSquadId) | Delete a fleet squad, only empty squads can be deleted |
| [`putFleetSquad`](https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdSquadsSquadId) | Rename a fleet squad |
| [`deleteFleetWing`](https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdWingsWingId) | Delete a fleet wing, only empty wings can be deleted. The wing may contain squads, but the squads must be empty |
| [`putFleetWing`](https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdWingsWingId) | Rename a fleet wing |
| [`getFleetWings`](https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdWings) | Return information about wings in a fleet |
| [`postFleetWings`](https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWings) | Create a new wing in a fleet |
| [`postFleetWingSquads`](https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWingsWingIdSquads) | Create a new squad in a fleet |
| [`getFwLeaderboards`](https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboards) | Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday. This route expires daily at 11:05 |
| [`getFwLeaderboardsCharacters`](https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCharacters) | Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday. This route expires daily at 11:05 |
| [`getFwLeaderboardsCorporations`](https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCorporations) | Top 10 leaderboard of corporations for kills and victory points separated by total, last week and yesterday. This route expires daily at 11:05 |
| [`getFwStats`](https://developers.eveonline.com/api-explorer#/operations/GetFwStats) | Statistical overviews of factions involved in faction warfare. This route expires daily at 11:05 |
| [`getFwSystems`](https://developers.eveonline.com/api-explorer#/operations/GetFwSystems) | An overview of the current ownership of faction warfare solar systems |
| [`getFwWars`](https://developers.eveonline.com/api-explorer#/operations/GetFwWars) | Data about which NPC factions are at war. This route expires daily at 11:05 |
| [`getIncursions`](https://developers.eveonline.com/api-explorer#/operations/GetIncursions) | Return a list of current incursions |
| [`getIndustryFacilities`](https://developers.eveonline.com/api-explorer#/operations/GetIndustryFacilities) | Return a list of industry facilities |
| [`getIndustrySystems`](https://developers.eveonline.com/api-explorer#/operations/GetIndustrySystems) | Return cost indices for solar systems |
| [`getInsurancePrices`](https://developers.eveonline.com/api-explorer#/operations/GetInsurancePrices) | Return available insurance levels for all ship types |
| [`getKillmailKillmailHash`](https://developers.eveonline.com/api-explorer#/operations/GetKillmailsKillmailIdKillmailHash) | Return a single killmail from its ID and hash |
| [`getLoyaltyCorporationOffers`](https://developers.eveonline.com/api-explorer#/operations/GetLoyaltyStoresCorporationIdOffers) | Return a list of offers from a specific corporation's loyalty store. This route expires daily at 11:05 |
| [`getMarketsGroups`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroups) | Get a list of item groups. This route expires daily at 11:05 |
| [`getMarketsGroupsMarketGroupId`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroupsMarketGroupId) | Get information on an item group. This route expires daily at 11:05 |
| [`getMarketsPrices`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsPrices) | Return a list of prices |
| [`getMarketsStructure`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsStructuresStructureId) | Return all orders in a structure |
| [`getRegionHistory`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdHistory) | Return a list of historical market statistics for the specified type in a region. This route expires daily at 11:05 |
| [`getRegionOrders`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdOrders) | Return a list of orders in a region |
| [`getRegionTypes`](https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdTypes) | Return a list of type IDs that have active orders in the region, for efficient market indexing. |
| [`getRouteOriginDestination`](https://developers.eveonline.com/api-explorer#/operations/GetRouteOriginDestination) | Get the systems between origin and destination |
| [`getSovereigntyCampaigns`](https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyCampaigns) | Shows sovereignty data for campaigns. |
| [`getSovereigntyMap`](https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyMap) | Shows sovereignty information for solar systems |
| [`getSovereigntyStructures`](https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyStructures) | Shows sovereignty data for structures. |
| [`getStatus`](https://developers.eveonline.com/api-explorer#/operations/GetStatus) | EVE Server status |
| [`postUiAutopilotWaypoint`](https://developers.eveonline.com/api-explorer#/operations/PostUiAutopilotWaypoint) | Set a solar system as autopilot waypoint |
| [`postUiOpenwindowContract`](https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowContract) | Open the contract window inside the client |
| [`postUiOpenwindowInformation`](https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowInformation) | Open the information window for a character, corporation or alliance inside the client |
| [`postUiOpenwindowMarketdetails`](https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowMarketdetails) | Open the market details window for a specific typeID inside the client |
| [`postUiOpenwindowNewmail`](https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowNewmail) | Open the New Mail window, according to settings from the request if applicable |
| [`getUniverseAncestries`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseAncestries) | Get all character ancestries. This route expires daily at 11:05 |
| [`getUniverseAsteroidBeltsAsteroidBeltId`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseAsteroidBeltsAsteroidBeltId) | Get information on an asteroid belt. This route expires daily at 11:05 |
| [`getUniverseBloodlines`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseBloodlines) | Get a list of bloodlines. This route expires daily at 11:05 |
| [`getUniverseCategories`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategories) | Get a list of item categories. This route expires daily at 11:05 |
| [`getUniverseCategory`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategoriesCategoryId) | Get information of an item category. This route expires daily at 11:05 |
| [`getUniverseConstellation`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellationsConstellationId) | Get information on a constellation. This route expires daily at 11:05 |
| [`getUniverseConstellations`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellations) | Get a list of constellations. This route expires daily at 11:05 |
| [`getUniverseFactions`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseFactions) | Get a list of factions. This route expires daily at 11:05 |
| [`getUniverseGraphic`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphicsGraphicId) | Get information on a graphic. This route expires daily at 11:05 |
| [`getUniverseGraphics`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphics) | Get a list of graphics. This route expires daily at 11:05 |
| [`getUniverseGroup`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroupsGroupId) | Get information on an item group. This route expires daily at 11:05 |
| [`getUniverseGroups`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroups) | Get a list of item groups. This route expires daily at 11:05 |
| [`postUniverseIds`](https://developers.eveonline.com/api-explorer#/operations/PostUniverseIds) | Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 12 hours |
| [`getUniverseMoon`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseMoonsMoonId) | Get information on a moon. This route expires daily at 11:05 |
| [`postUniverseNames`](https://developers.eveonline.com/api-explorer#/operations/PostUniverseNames) | Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions |
| [`getUniversePlanet`](https://developers.eveonline.com/api-explorer#/operations/GetUniversePlanetsPlanetId) | Get information on a planet. This route expires daily at 11:05 |
| [`getUniverseRaces`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseRaces) | Get a list of character races. This route expires daily at 11:05 |
| [`getUniverseRegion`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegionsRegionId) | Get information on a region. This route expires daily at 11:05 |
| [`getUniverseRegions`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegions) | Get a list of regions. This route expires daily at 11:05 |
| [`getUniverseSchematic`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseSchematicsSchematicId) | Get information on a planetary factory schematic |
| [`getUniverseStar`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseStarsStarId) | Get information on a star. This route expires daily at 11:05 |
| [`getUniverseStargate`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseStargatesStargateId) | Get information on a stargate. This route expires daily at 11:05 |
| [`getUniverseStation`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseStationsStationId) | Get information on a station. This route expires daily at 11:05 |
| [`getUniverseStructure`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructuresStructureId) | Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs. |
| [`getUniverseStructures`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructures) | List all public structures |
| [`getUniverseSystem`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemsSystemId) | Get information on a solar system.. This route expires daily at 11:05 |
| [`getUniverseSystemJumps`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemJumps) | Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed |
| [`getUniverseSystemKills`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemKills) | Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed |
| [`getUniverseSystems`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystems) | Get a list of solar systems. This route expires daily at 11:05 |
| [`getUniverseType`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypesTypeId) | Get information on a type. This route expires daily at 11:05 |
| [`getUniverseTypes`](https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypes) | Get a list of type ids. This route expires daily at 11:05 |
| [`getWar`](https://developers.eveonline.com/api-explorer#/operations/GetWarsWarId) | Return details about a war |
| [`getWarKillmails`](https://developers.eveonline.com/api-explorer#/operations/GetWarsWarIdKillmails) | Return a list of kills related to a war |
| [`getWars`](https://developers.eveonline.com/api-explorer#/operations/GetWars) | Return a list of wars |



[![BuyMeACoffee](https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-green.svg)](https://buymeacoffee.com/nfinished)
