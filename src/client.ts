// Auto-generated API client for EVE ESI API
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from './types'

const COMPATIBILITY_DATE = '2025-07-29'

export class EsiClient {
  private readonly baseUrl: string = 'https://esi.evetech.net'
  private readonly userAgent: string = 'localisprimary/esi'
  private readonly token?: string
  private readonly useRequestHeaders: boolean = true

  constructor(
    options: {
      token?: string
      userAgent?: string
      useRequestHeaders?: boolean
    } = {}
  ) {
    this.token = options.token
    this.useRequestHeaders = options.useRequestHeaders ?? true

    if (options.userAgent?.length) {
      this.userAgent += ` ${options.userAgent}`
    } else {
      console.warn(
        '@localisprimary/esi: No user agent provided in constructor. This will be required in a future release.'
      )
    }
  }

  private async request<TData, THeaders>(
    method: string,
    path: string,
    params?: Record<string, any>,
    body?: any
  ): Promise<Types.EsiResponse<TData, THeaders>> {
    const url = new URL(path, this.baseUrl)

    if (params && method === 'GET') {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    if (!this.useRequestHeaders) {
      url.searchParams.append('user_agent', this.userAgent)
      url.searchParams.append('compatibility_date', COMPATIBILITY_DATE)

      if (this.token) {
        url.searchParams.append('token', this.token)
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Compatibility-Date': COMPATIBILITY_DATE,
      'X-User-Agent': this.userAgent,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url.toString(), {
      method,
      headers: this.useRequestHeaders ? headers : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (!response.ok) {
      throw {
        error: data.error || 'Request failed',
        status: response.status,
      } as Types.EsiError
    }

    return {
      data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()) as THeaders,
    }
  }

  /**
   * List all active player alliances

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliances
   */
  async getAlliances() {
    const path = `/alliances`
    return this.request<
      Types.GetAlliancesResponse,
      Types.GetAlliancesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Public information about an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceId
   */
  async getAlliance(params: Types.GetAllianceParams) {
    const path = `/alliances/${params.alliance_id}`
    return this.request<
      Types.GetAllianceResponse,
      Types.GetAllianceResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return contacts of an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContacts
   */
  async getAllianceContacts(params: Types.GetAllianceContactsParams) {
    const path = `/alliances/${params.alliance_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetAllianceContactsResponse,
      Types.GetAllianceContactsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return custom labels for an alliance's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContactsLabels
   */
  async getAllianceContactsLabels(
    params: Types.GetAllianceContactsLabelsParams
  ) {
    const path = `/alliances/${params.alliance_id}/contacts/labels`
    return this.request<
      Types.GetAllianceContactsLabelsResponse,
      Types.GetAllianceContactsLabelsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List all current member corporations of an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdCorporations
   */
  async getAllianceCorporations(params: Types.GetAllianceCorporationsParams) {
    const path = `/alliances/${params.alliance_id}/corporations`
    return this.request<
      Types.GetAllianceCorporationsResponse,
      Types.GetAllianceCorporationsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the icon urls for a alliance

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdIcons
   */
  async getAllianceIcons(params: Types.GetAllianceIconsParams) {
    const path = `/alliances/${params.alliance_id}/icons`
    return this.request<
      Types.GetAllianceIconsResponse,
      Types.GetAllianceIconsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Bulk lookup of character IDs to corporation, alliance and faction

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersAffiliation
   */
  async postCharactersAffiliation(
    params: Types.PostCharactersAffiliationParams
  ) {
    const path = `/characters/affiliation`
    const body = params.body
    return this.request<
      Types.PostCharactersAffiliationResponse,
      Types.PostCharactersAffiliationResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Public information about a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterId
   */
  async getCharacter(params: Types.GetCharacterParams) {
    const path = `/characters/${params.character_id}`
    return this.request<
      Types.GetCharacterResponse,
      Types.GetCharacterResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate)

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAgentsResearch
   */
  async getCharacterAgentsResearch(
    params: Types.GetCharacterAgentsResearchParams
  ) {
    const path = `/characters/${params.character_id}/agents_research`
    return this.request<
      Types.GetCharacterAgentsResearchResponse,
      Types.GetCharacterAgentsResearchResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of the characters assets

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAssets
   */
  async getCharacterAssets(params: Types.GetCharacterAssetsParams) {
    const path = `/characters/${params.character_id}/assets`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterAssetsResponse,
      Types.GetCharacterAssetsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsLocations
   */
  async postCharacterAssetsLocations(
    params: Types.PostCharacterAssetsLocationsParams
  ) {
    const path = `/characters/${params.character_id}/assets/locations`
    const body = params.body
    return this.request<
      Types.PostCharacterAssetsLocationsResponse,
      Types.PostCharacterAssetsLocationsResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships.

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsNames
   */
  async postCharacterAssetsNames(params: Types.PostCharacterAssetsNamesParams) {
    const path = `/characters/${params.character_id}/assets/names`
    const body = params.body
    return this.request<
      Types.PostCharacterAssetsNamesResponse,
      Types.PostCharacterAssetsNamesResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Return attributes of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAttributes
   */
  async getCharacterAttributes(params: Types.GetCharacterAttributesParams) {
    const path = `/characters/${params.character_id}/attributes`
    return this.request<
      Types.GetCharacterAttributesResponse,
      Types.GetCharacterAttributesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of blueprints the character owns

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdBlueprints
   */
  async getCharacterBlueprints(params: Types.GetCharacterBlueprintsParams) {
    const path = `/characters/${params.character_id}/blueprints`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterBlueprintsResponse,
      Types.GetCharacterBlueprintsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get 50 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendar
   */
  async getCharacterCalendar(params: Types.GetCharacterCalendarParams) {
    const path = `/characters/${params.character_id}/calendar`
    const queryParams = { from_event: params.from_event }
    return this.request<
      Types.GetCharacterCalendarResponse,
      Types.GetCharacterCalendarResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get all the information for a specific event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventId
   */
  async getCharacterCalendarEventId(
    params: Types.GetCharacterCalendarEventIdParams
  ) {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    return this.request<
      Types.GetCharacterCalendarEventIdResponse,
      Types.GetCharacterCalendarEventIdResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Set your response status to an event

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdCalendarEventId
   */
  async putCharacterCalendarEventId(
    params: Types.PutCharacterCalendarEventIdParams
  ) {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    const body = { response: params.response }
    return this.request<
      Types.PutCharacterCalendarEventIdResponse,
      Types.PutCharacterCalendarEventIdResponseHeaders
    >('PUT', path, undefined, body)
  }

  /**
   * Get all invited attendees for a given event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventIdAttendees
   */
  async getCharacterCalendarEventAttendees(
    params: Types.GetCharacterCalendarEventAttendeesParams
  ) {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}/attendees`
    return this.request<
      Types.GetCharacterCalendarEventAttendeesResponse,
      Types.GetCharacterCalendarEventAttendeesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * A list of the character's clones

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdClones
   */
  async getCharacterClones(params: Types.GetCharacterClonesParams) {
    const path = `/characters/${params.character_id}/clones`
    return this.request<
      Types.GetCharacterClonesResponse,
      Types.GetCharacterClonesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Bulk delete contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdContacts
   */
  async deleteCharacterContacts(params: Types.DeleteCharacterContactsParams) {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = { contact_ids: params.contact_ids }
    return this.request<
      Types.DeleteCharacterContactsResponse,
      Types.DeleteCharacterContactsResponseHeaders
    >('DELETE', path, queryParams, undefined)
  }

  /**
   * Return contacts of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContacts
   */
  async getCharacterContacts(params: Types.GetCharacterContactsParams) {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterContactsResponse,
      Types.GetCharacterContactsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Bulk add contacts with same settings

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdContacts
   */
  async postCharacterContacts(params: Types.PostCharacterContactsParams) {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = {
      label_ids: params.label_ids,
      standing: params.standing,
      watched: params.watched,
    }
    const body = params.body
    return this.request<
      Types.PostCharacterContactsResponse,
      Types.PostCharacterContactsResponseHeaders
    >('POST', path, queryParams, body)
  }

  /**
   * Bulk edit contacts with same settings

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdContacts
   */
  async putCharacterContacts(params: Types.PutCharacterContactsParams) {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = {
      label_ids: params.label_ids,
      standing: params.standing,
      watched: params.watched,
    }
    const body = params.body
    return this.request<
      Types.PutCharacterContactsResponse,
      Types.PutCharacterContactsResponseHeaders
    >('PUT', path, queryParams, body)
  }

  /**
   * Return custom labels for a character's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContactsLabels
   */
  async getCharacterContactsLabels(
    params: Types.GetCharacterContactsLabelsParams
  ) {
    const path = `/characters/${params.character_id}/contacts/labels`
    return this.request<
      Types.GetCharacterContactsLabelsResponse,
      Types.GetCharacterContactsLabelsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContracts
   */
  async getCharacterContracts(params: Types.GetCharacterContractsParams) {
    const path = `/characters/${params.character_id}/contracts`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterContractsResponse,
      Types.GetCharacterContractsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Lists bids on a particular auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdBids
   */
  async getCharacterContractBids(params: Types.GetCharacterContractBidsParams) {
    const path = `/characters/${params.character_id}/contracts/${params.contract_id}/bids`
    return this.request<
      Types.GetCharacterContractBidsResponse,
      Types.GetCharacterContractBidsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Lists items of a particular contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdItems
   */
  async getCharacterContractItems(
    params: Types.GetCharacterContractItemsParams
  ) {
    const path = `/characters/${params.character_id}/contracts/${params.contract_id}/items`
    return this.request<
      Types.GetCharacterContractItemsResponse,
      Types.GetCharacterContractItemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of all the corporations a character has been a member of

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCorporationhistory
   */
  async getCharacterCorporationhistory(
    params: Types.GetCharacterCorporationhistoryParams
  ) {
    const path = `/characters/${params.character_id}/corporationhistory`
    return this.request<
      Types.GetCharacterCorporationhistoryResponse,
      Types.GetCharacterCorporationhistoryResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Takes a source character ID in the url and a set of target character ID's in the body, returns a CSPA charge cost

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdCspa
   */
  async postCharacterCspa(params: Types.PostCharacterCspaParams) {
    const path = `/characters/${params.character_id}/cspa`
    const body = params.body
    return this.request<
      Types.PostCharacterCspaResponse,
      Types.PostCharacterCspaResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Return a character's jump activation and fatigue information

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFatigue
   */
  async getCharacterFatigue(params: Types.GetCharacterFatigueParams) {
    const path = `/characters/${params.character_id}/fatigue`
    return this.request<
      Types.GetCharacterFatigueResponse,
      Types.GetCharacterFatigueResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return fittings of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFittings
   */
  async getCharacterFittings(params: Types.GetCharacterFittingsParams) {
    const path = `/characters/${params.character_id}/fittings`
    return this.request<
      Types.GetCharacterFittingsResponse,
      Types.GetCharacterFittingsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Save a new fitting for a character

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdFittings
   */
  async postCharacterFittings(params: Types.PostCharacterFittingsParams) {
    const path = `/characters/${params.character_id}/fittings`
    const body = {
      description: params.description,
      items: params.items,
      name: params.name,
      ship_type_id: params.ship_type_id,
    }
    return this.request<
      Types.PostCharacterFittingsResponse,
      Types.PostCharacterFittingsResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Delete a fitting from a character

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdFittingsFittingId
   */
  async deleteCharacterFitting(params: Types.DeleteCharacterFittingParams) {
    const path = `/characters/${params.character_id}/fittings/${params.fitting_id}`
    return this.request<
      Types.DeleteCharacterFittingResponse,
      Types.DeleteCharacterFittingResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Return the fleet ID the character is in, if any.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFleet
   */
  async getCharacterFleet(params: Types.GetCharacterFleetParams) {
    const path = `/characters/${params.character_id}/fleet`
    return this.request<
      Types.GetCharacterFleetResponse,
      Types.GetCharacterFleetResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Statistical overview of a character involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFwStats
   */
  async getCharacterFwStats(params: Types.GetCharacterFwStatsParams) {
    const path = `/characters/${params.character_id}/fw/stats`
    return this.request<
      Types.GetCharacterFwStatsResponse,
      Types.GetCharacterFwStatsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return implants on the active clone of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdImplants
   */
  async getCharacterImplants(params: Types.GetCharacterImplantsParams) {
    const path = `/characters/${params.character_id}/implants`
    return this.request<
      Types.GetCharacterImplantsResponse,
      Types.GetCharacterImplantsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List industry jobs placed by a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdIndustryJobs
   */
  async getCharacterIndustryJobs(params: Types.GetCharacterIndustryJobsParams) {
    const path = `/characters/${params.character_id}/industry/jobs`
    const queryParams = { include_completed: params.include_completed }
    return this.request<
      Types.GetCharacterIndustryJobsResponse,
      Types.GetCharacterIndustryJobsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return a list of a character's kills and losses going back 90 days

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdKillmailsRecent
   */
  async getCharacterKillmailsRecent(
    params: Types.GetCharacterKillmailsRecentParams
  ) {
    const path = `/characters/${params.character_id}/killmails/recent`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterKillmailsRecentResponse,
      Types.GetCharacterKillmailsRecentResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLocation
   */
  async getCharacterLocation(params: Types.GetCharacterLocationParams) {
    const path = `/characters/${params.character_id}/location`
    return this.request<
      Types.GetCharacterLocationResponse,
      Types.GetCharacterLocationResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of loyalty points for all corporations the character has worked for

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLoyaltyPoints
   */
  async getCharacterLoyaltyPoints(
    params: Types.GetCharacterLoyaltyPointsParams
  ) {
    const path = `/characters/${params.character_id}/loyalty/points`
    return this.request<
      Types.GetCharacterLoyaltyPointsResponse,
      Types.GetCharacterLoyaltyPointsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMail
   */
  async getCharacterMail(params: Types.GetCharacterMailParams) {
    const path = `/characters/${params.character_id}/mail`
    const queryParams = {
      labels: params.labels,
      last_mail_id: params.last_mail_id,
    }
    return this.request<
      Types.GetCharacterMailResponse,
      Types.GetCharacterMailResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Create and send a new mail

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMail
   */
  async postCharacterMail(params: Types.PostCharacterMailParams) {
    const path = `/characters/${params.character_id}/mail`
    const body = {
      approved_cost: params.approved_cost,
      body: params.body,
      recipients: params.recipients,
      subject: params.subject,
    }
    return this.request<
      Types.PostCharacterMailResponse,
      Types.PostCharacterMailResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Return a list of the users mail labels, unread counts for each label and a total unread count.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLabels
   */
  async getCharacterMailLabels(params: Types.GetCharacterMailLabelsParams) {
    const path = `/characters/${params.character_id}/mail/labels`
    return this.request<
      Types.GetCharacterMailLabelsResponse,
      Types.GetCharacterMailLabelsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Create a mail label

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMailLabels
   */
  async postCharacterMailLabels(params: Types.PostCharacterMailLabelsParams) {
    const path = `/characters/${params.character_id}/mail/labels`
    const body = { color: params.color, name: params.name }
    return this.request<
      Types.PostCharacterMailLabelsResponse,
      Types.PostCharacterMailLabelsResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Delete a mail label

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailLabelsLabelId
   */
  async deleteCharacterMailLabel(params: Types.DeleteCharacterMailLabelParams) {
    const path = `/characters/${params.character_id}/mail/labels/${params.label_id}`
    return this.request<
      Types.DeleteCharacterMailLabelResponse,
      Types.DeleteCharacterMailLabelResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Return all mailing lists that the character is subscribed to

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLists
   */
  async getCharacterMailLists(params: Types.GetCharacterMailListsParams) {
    const path = `/characters/${params.character_id}/mail/lists`
    return this.request<
      Types.GetCharacterMailListsResponse,
      Types.GetCharacterMailListsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Delete a mail

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailMailId
   */
  async deleteCharacterMailMailId(
    params: Types.DeleteCharacterMailMailIdParams
  ) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<
      Types.DeleteCharacterMailMailIdResponse,
      Types.DeleteCharacterMailMailIdResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Return the contents of an EVE mail

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailMailId
   */
  async getCharacterMailMailId(params: Types.GetCharacterMailMailIdParams) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<
      Types.GetCharacterMailMailIdResponse,
      Types.GetCharacterMailMailIdResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Update metadata about a mail

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdMailMailId
   */
  async putCharacterMailMailId(params: Types.PutCharacterMailMailIdParams) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    const body = { labels: params.labels, read: params.read }
    return this.request<
      Types.PutCharacterMailMailIdResponse,
      Types.PutCharacterMailMailIdResponseHeaders
    >('PUT', path, undefined, body)
  }

  /**
   * Return a list of medals the character has

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMedals
   */
  async getCharacterMedals(params: Types.GetCharacterMedalsParams) {
    const path = `/characters/${params.character_id}/medals`
    return this.request<
      Types.GetCharacterMedalsResponse,
      Types.GetCharacterMedalsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Paginated record of all mining done by a character for the past 30 days

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMining
   */
  async getCharacterMining(params: Types.GetCharacterMiningParams) {
    const path = `/characters/${params.character_id}/mining`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterMiningResponse,
      Types.GetCharacterMiningResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return character notifications

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotifications
   */
  async getCharacterNotifications(
    params: Types.GetCharacterNotificationsParams
  ) {
    const path = `/characters/${params.character_id}/notifications`
    return this.request<
      Types.GetCharacterNotificationsResponse,
      Types.GetCharacterNotificationsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return notifications about having been added to someone's contact list

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotificationsContacts
   */
  async getCharacterNotificationsContacts(
    params: Types.GetCharacterNotificationsContactsParams
  ) {
    const path = `/characters/${params.character_id}/notifications/contacts`
    return this.request<
      Types.GetCharacterNotificationsContactsResponse,
      Types.GetCharacterNotificationsContactsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Checks if the character is currently online

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOnline
   */
  async getCharacterOnline(params: Types.GetCharacterOnlineParams) {
    const path = `/characters/${params.character_id}/online`
    return this.request<
      Types.GetCharacterOnlineResponse,
      Types.GetCharacterOnlineResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List open market orders placed by a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrders
   */
  async getCharacterOrders(params: Types.GetCharacterOrdersParams) {
    const path = `/characters/${params.character_id}/orders`
    return this.request<
      Types.GetCharacterOrdersResponse,
      Types.GetCharacterOrdersResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List cancelled and expired market orders placed by a character up to 90 days in the past.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrdersHistory
   */
  async getCharacterOrdersHistory(
    params: Types.GetCharacterOrdersHistoryParams
  ) {
    const path = `/characters/${params.character_id}/orders/history`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterOrdersHistoryResponse,
      Types.GetCharacterOrdersHistoryResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns a list of all planetary colonies owned by a character.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanets
   */
  async getCharacterPlanets(params: Types.GetCharacterPlanetsParams) {
    const path = `/characters/${params.character_id}/planets`
    return this.request<
      Types.GetCharacterPlanetsResponse,
      Types.GetCharacterPlanetsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanetsPlanetId
   */
  async getCharacterPlanet(params: Types.GetCharacterPlanetParams) {
    const path = `/characters/${params.character_id}/planets/${params.planet_id}`
    return this.request<
      Types.GetCharacterPlanetResponse,
      Types.GetCharacterPlanetResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get portrait urls for a character

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPortrait
   */
  async getCharacterPortrait(params: Types.GetCharacterPortraitParams) {
    const path = `/characters/${params.character_id}/portrait`
    return this.request<
      Types.GetCharacterPortraitResponse,
      Types.GetCharacterPortraitResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns a character's corporation roles

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdRoles
   */
  async getCharacterRoles(params: Types.GetCharacterRolesParams) {
    const path = `/characters/${params.character_id}/roles`
    return this.request<
      Types.GetCharacterRolesResponse,
      Types.GetCharacterRolesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Search for entities that match a given sub-string.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSearch
   */
  async getCharacterSearch(params: Types.GetCharacterSearchParams) {
    const path = `/characters/${params.character_id}/search`
    const queryParams = {
      categories: params.categories,
      search: params.search,
      strict: params.strict,
    }
    return this.request<
      Types.GetCharacterSearchResponse,
      Types.GetCharacterSearchResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get the current ship type, name and id

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdShip
   */
  async getCharacterShip(params: Types.GetCharacterShipParams) {
    const path = `/characters/${params.character_id}/ship`
    return this.request<
      Types.GetCharacterShipResponse,
      Types.GetCharacterShipResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List the configured skill queue for the given character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkillqueue
   */
  async getCharacterSkillqueue(params: Types.GetCharacterSkillqueueParams) {
    const path = `/characters/${params.character_id}/skillqueue`
    return this.request<
      Types.GetCharacterSkillqueueResponse,
      Types.GetCharacterSkillqueueResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List all trained skills for the given character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkills
   */
  async getCharacterSkills(params: Types.GetCharacterSkillsParams) {
    const path = `/characters/${params.character_id}/skills`
    return this.request<
      Types.GetCharacterSkillsResponse,
      Types.GetCharacterSkillsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return character standings from agents, NPC corporations, and factions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdStandings
   */
  async getCharacterStandings(params: Types.GetCharacterStandingsParams) {
    const path = `/characters/${params.character_id}/standings`
    return this.request<
      Types.GetCharacterStandingsResponse,
      Types.GetCharacterStandingsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns a character's titles

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdTitles
   */
  async getCharacterTitles(params: Types.GetCharacterTitlesParams) {
    const path = `/characters/${params.character_id}/titles`
    return this.request<
      Types.GetCharacterTitlesResponse,
      Types.GetCharacterTitlesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns a character's wallet balance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWallet
   */
  async getCharacterWallet(params: Types.GetCharacterWalletParams) {
    const path = `/characters/${params.character_id}/wallet`
    return this.request<
      Types.GetCharacterWalletResponse,
      Types.GetCharacterWalletResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Retrieve the given character's wallet journal going 30 days back

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletJournal
   */
  async getCharacterWalletJournal(
    params: Types.GetCharacterWalletJournalParams
  ) {
    const path = `/characters/${params.character_id}/wallet/journal`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCharacterWalletJournalResponse,
      Types.GetCharacterWalletJournalResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get wallet transactions of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletTransactions
   */
  async getCharacterWalletTransactions(
    params: Types.GetCharacterWalletTransactionsParams
  ) {
    const path = `/characters/${params.character_id}/wallet/transactions`
    const queryParams = { from_id: params.from_id }
    return this.request<
      Types.GetCharacterWalletTransactionsResponse,
      Types.GetCharacterWalletTransactionsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Lists bids on a public auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicBidsContractId
   */
  async getContractsPublicBids(params: Types.GetContractsPublicBidsParams) {
    const path = `/contracts/public/bids/${params.contract_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetContractsPublicBidsResponse,
      Types.GetContractsPublicBidsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Lists items of a public contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicItemsContractId
   */
  async getContractsPublicItems(params: Types.GetContractsPublicItemsParams) {
    const path = `/contracts/public/items/${params.contract_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetContractsPublicItemsResponse,
      Types.GetContractsPublicItemsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns a paginated list of all public contracts in the given region

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicRegionId
   */
  async getContractsPublicRegionId(
    params: Types.GetContractsPublicRegionIdParams
  ) {
    const path = `/contracts/public/${params.region_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetContractsPublicRegionIdResponse,
      Types.GetContractsPublicRegionIdResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.

   * Requires one of the following EVE corporation role(s): Station_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningExtractions
   */
  async getCorporationCorporationMiningExtractions(
    params: Types.GetCorporationCorporationMiningExtractionsParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/extractions`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationCorporationMiningExtractionsResponse,
      Types.GetCorporationCorporationMiningExtractionsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Paginated list of all entities capable of observing and recording mining for a corporation

   * Requires one of the following EVE corporation role(s): Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObservers
   */
  async getCorporationCorporationMiningObservers(
    params: Types.GetCorporationCorporationMiningObserversParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/observers`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationCorporationMiningObserversResponse,
      Types.GetCorporationCorporationMiningObserversResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Paginated record of all mining seen by an observer

   * Requires one of the following EVE corporation role(s): Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObserversObserverId
   */
  async getCorporationCorporationMiningObserver(
    params: Types.GetCorporationCorporationMiningObserverParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/observers/${params.observer_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationCorporationMiningObserverResponse,
      Types.GetCorporationCorporationMiningObserverResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get a list of npc corporations

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsNpccorps
   */
  async getCorporationsNpccorps() {
    const path = `/corporations/npccorps`
    return this.request<
      Types.GetCorporationsNpccorpsResponse,
      Types.GetCorporationsNpccorpsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Public information about a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationId
   */
  async getCorporation(params: Types.GetCorporationParams) {
    const path = `/corporations/${params.corporation_id}`
    return this.request<
      Types.GetCorporationResponse,
      Types.GetCorporationResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of all the alliances a corporation has been a member of

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAlliancehistory
   */
  async getCorporationAlliancehistory(
    params: Types.GetCorporationAlliancehistoryParams
  ) {
    const path = `/corporations/${params.corporation_id}/alliancehistory`
    return this.request<
      Types.GetCorporationAlliancehistoryResponse,
      Types.GetCorporationAlliancehistoryResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of the corporation assets

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAssets
   */
  async getCorporationAssets(params: Types.GetCorporationAssetsParams) {
    const path = `/corporations/${params.corporation_id}/assets`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationAssetsResponse,
      Types.GetCorporationAssetsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsLocations
   */
  async postCorporationAssetsLocations(
    params: Types.PostCorporationAssetsLocationsParams
  ) {
    const path = `/corporations/${params.corporation_id}/assets/locations`
    const body = params.body
    return this.request<
      Types.PostCorporationAssetsLocationsResponse,
      Types.PostCorporationAssetsLocationsResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsNames
   */
  async postCorporationAssetsNames(
    params: Types.PostCorporationAssetsNamesParams
  ) {
    const path = `/corporations/${params.corporation_id}/assets/names`
    const body = params.body
    return this.request<
      Types.PostCorporationAssetsNamesResponse,
      Types.PostCorporationAssetsNamesResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Returns a list of blueprints the corporation owns

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdBlueprints
   */
  async getCorporationBlueprints(params: Types.GetCorporationBlueprintsParams) {
    const path = `/corporations/${params.corporation_id}/blueprints`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationBlueprintsResponse,
      Types.GetCorporationBlueprintsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return contacts of a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContacts
   */
  async getCorporationContacts(params: Types.GetCorporationContactsParams) {
    const path = `/corporations/${params.corporation_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationContactsResponse,
      Types.GetCorporationContactsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return custom labels for a corporation's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContactsLabels
   */
  async getCorporationContactsLabels(
    params: Types.GetCorporationContactsLabelsParams
  ) {
    const path = `/corporations/${params.corporation_id}/contacts/labels`
    return this.request<
      Types.GetCorporationContactsLabelsResponse,
      Types.GetCorporationContactsLabelsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContainersLogs
   */
  async getCorporationContainersLogs(
    params: Types.GetCorporationContainersLogsParams
  ) {
    const path = `/corporations/${params.corporation_id}/containers/logs`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationContainersLogsResponse,
      Types.GetCorporationContainersLogsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContracts
   */
  async getCorporationContracts(params: Types.GetCorporationContractsParams) {
    const path = `/corporations/${params.corporation_id}/contracts`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationContractsResponse,
      Types.GetCorporationContractsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Lists bids on a particular auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdBids
   */
  async getCorporationContractBids(
    params: Types.GetCorporationContractBidsParams
  ) {
    const path = `/corporations/${params.corporation_id}/contracts/${params.contract_id}/bids`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationContractBidsResponse,
      Types.GetCorporationContractBidsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Lists items of a particular contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdItems
   */
  async getCorporationContractItems(
    params: Types.GetCorporationContractItemsParams
  ) {
    const path = `/corporations/${params.corporation_id}/contracts/${params.contract_id}/items`
    return this.request<
      Types.GetCorporationContractItemsResponse,
      Types.GetCorporationContractItemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List customs offices owned by a corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdCustomsOffices
   */
  async getCorporationCustomsOffices(
    params: Types.GetCorporationCustomsOfficesParams
  ) {
    const path = `/corporations/${params.corporation_id}/customs_offices`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationCustomsOfficesResponse,
      Types.GetCorporationCustomsOfficesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return corporation hangar and wallet division names, only show if a division is not using the default name

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdDivisions
   */
  async getCorporationDivisions(params: Types.GetCorporationDivisionsParams) {
    const path = `/corporations/${params.corporation_id}/divisions`
    return this.request<
      Types.GetCorporationDivisionsResponse,
      Types.GetCorporationDivisionsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a corporation's facilities

   * Requires one of the following EVE corporation role(s): Factory_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFacilities
   */
  async getCorporationFacilities(params: Types.GetCorporationFacilitiesParams) {
    const path = `/corporations/${params.corporation_id}/facilities`
    return this.request<
      Types.GetCorporationFacilitiesResponse,
      Types.GetCorporationFacilitiesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Statistics about a corporation involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFwStats
   */
  async getCorporationFwStats(params: Types.GetCorporationFwStatsParams) {
    const path = `/corporations/${params.corporation_id}/fw/stats`
    return this.request<
      Types.GetCorporationFwStatsResponse,
      Types.GetCorporationFwStatsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the icon urls for a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIcons
   */
  async getCorporationIcons(params: Types.GetCorporationIconsParams) {
    const path = `/corporations/${params.corporation_id}/icons`
    return this.request<
      Types.GetCorporationIconsResponse,
      Types.GetCorporationIconsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List industry jobs run by a corporation

   * Requires one of the following EVE corporation role(s): Factory_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIndustryJobs
   */
  async getCorporationIndustryJobs(
    params: Types.GetCorporationIndustryJobsParams
  ) {
    const path = `/corporations/${params.corporation_id}/industry/jobs`
    const queryParams = {
      include_completed: params.include_completed,
      page: params.page,
    }
    return this.request<
      Types.GetCorporationIndustryJobsResponse,
      Types.GetCorporationIndustryJobsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get a list of a corporation's kills and losses going back 90 days

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdKillmailsRecent
   */
  async getCorporationKillmailsRecent(
    params: Types.GetCorporationKillmailsRecentParams
  ) {
    const path = `/corporations/${params.corporation_id}/killmails/recent`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationKillmailsRecentResponse,
      Types.GetCorporationKillmailsRecentResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns a corporation's medals

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedals
   */
  async getCorporationMedals(params: Types.GetCorporationMedalsParams) {
    const path = `/corporations/${params.corporation_id}/medals`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationMedalsResponse,
      Types.GetCorporationMedalsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns medals issued by a corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedalsIssued
   */
  async getCorporationMedalsIssued(
    params: Types.GetCorporationMedalsIssuedParams
  ) {
    const path = `/corporations/${params.corporation_id}/medals/issued`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationMedalsIssuedResponse,
      Types.GetCorporationMedalsIssuedResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return the current member list of a corporation, the token's character need to be a member of the corporation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembers
   */
  async getCorporationMembers(params: Types.GetCorporationMembersParams) {
    const path = `/corporations/${params.corporation_id}/members`
    return this.request<
      Types.GetCorporationMembersResponse,
      Types.GetCorporationMembersResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a corporation's member limit, not including CEO himself

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersLimit
   */
  async getCorporationMembersLimit(
    params: Types.GetCorporationMembersLimitParams
  ) {
    const path = `/corporations/${params.corporation_id}/members/limit`
    return this.request<
      Types.GetCorporationMembersLimitResponse,
      Types.GetCorporationMembersLimitResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns a corporation's members' titles

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersTitles
   */
  async getCorporationMembersTitles(
    params: Types.GetCorporationMembersTitlesParams
  ) {
    const path = `/corporations/${params.corporation_id}/members/titles`
    return this.request<
      Types.GetCorporationMembersTitlesResponse,
      Types.GetCorporationMembersTitlesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns additional information about a corporation's members which helps tracking their activities

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembertracking
   */
  async getCorporationMembertracking(
    params: Types.GetCorporationMembertrackingParams
  ) {
    const path = `/corporations/${params.corporation_id}/membertracking`
    return this.request<
      Types.GetCorporationMembertrackingResponse,
      Types.GetCorporationMembertrackingResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List open market orders placed on behalf of a corporation

   * Requires one of the following EVE corporation role(s): Accountant, Trader

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrders
   */
  async getCorporationOrders(params: Types.GetCorporationOrdersParams) {
    const path = `/corporations/${params.corporation_id}/orders`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationOrdersResponse,
      Types.GetCorporationOrdersResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * List cancelled and expired market orders placed on behalf of a corporation up to 90 days in the past.

   * Requires one of the following EVE corporation role(s): Accountant, Trader

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrdersHistory
   */
  async getCorporationOrdersHistory(
    params: Types.GetCorporationOrdersHistoryParams
  ) {
    const path = `/corporations/${params.corporation_id}/orders/history`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationOrdersHistoryResponse,
      Types.GetCorporationOrdersHistoryResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return the roles of all members if the character has the personnel manager role or any grantable role.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRoles
   */
  async getCorporationRoles(params: Types.GetCorporationRolesParams) {
    const path = `/corporations/${params.corporation_id}/roles`
    return this.request<
      Types.GetCorporationRolesResponse,
      Types.GetCorporationRolesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return how roles have changed for a coporation's members, up to a month

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRolesHistory
   */
  async getCorporationRolesHistory(
    params: Types.GetCorporationRolesHistoryParams
  ) {
    const path = `/corporations/${params.corporation_id}/roles/history`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationRolesHistoryResponse,
      Types.GetCorporationRolesHistoryResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return the current shareholders of a corporation.

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdShareholders
   */
  async getCorporationShareholders(
    params: Types.GetCorporationShareholdersParams
  ) {
    const path = `/corporations/${params.corporation_id}/shareholders`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationShareholdersResponse,
      Types.GetCorporationShareholdersResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return corporation standings from agents, NPC corporations, and factions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStandings
   */
  async getCorporationStandings(params: Types.GetCorporationStandingsParams) {
    const path = `/corporations/${params.corporation_id}/standings`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationStandingsResponse,
      Types.GetCorporationStandingsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns list of corporation starbases (POSes)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbases
   */
  async getCorporationStarbases(params: Types.GetCorporationStarbasesParams) {
    const path = `/corporations/${params.corporation_id}/starbases`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationStarbasesResponse,
      Types.GetCorporationStarbasesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns various settings and fuels of a starbase (POS)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbasesStarbaseId
   */
  async getCorporationStarbase(params: Types.GetCorporationStarbaseParams) {
    const path = `/corporations/${params.corporation_id}/starbases/${params.starbase_id}`
    const queryParams = { system_id: params.system_id }
    return this.request<
      Types.GetCorporationStarbaseResponse,
      Types.GetCorporationStarbaseResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-2.0-structures-changes-coming-on-february-13th

   * Requires one of the following EVE corporation role(s): Station_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStructures
   */
  async getCorporationStructures(params: Types.GetCorporationStructuresParams) {
    const path = `/corporations/${params.corporation_id}/structures`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationStructuresResponse,
      Types.GetCorporationStructuresResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns a corporation's titles

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdTitles
   */
  async getCorporationTitles(params: Types.GetCorporationTitlesParams) {
    const path = `/corporations/${params.corporation_id}/titles`
    return this.request<
      Types.GetCorporationTitlesResponse,
      Types.GetCorporationTitlesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a corporation's wallets

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWallets
   */
  async getCorporationWallets(params: Types.GetCorporationWalletsParams) {
    const path = `/corporations/${params.corporation_id}/wallets`
    return this.request<
      Types.GetCorporationWalletsResponse,
      Types.GetCorporationWalletsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Retrieve the given corporation's wallet journal for the given division going 30 days back

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionJournal
   */
  async getCorporationWalletsDivisionJournal(
    params: Types.GetCorporationWalletsDivisionJournalParams
  ) {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/journal`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationWalletsDivisionJournalResponse,
      Types.GetCorporationWalletsDivisionJournalResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get wallet transactions of a corporation

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionTransactions
   */
  async getCorporationWalletsDivisionTransactions(
    params: Types.GetCorporationWalletsDivisionTransactionsParams
  ) {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/transactions`
    const queryParams = { from_id: params.from_id }
    return this.request<
      Types.GetCorporationWalletsDivisionTransactionsResponse,
      Types.GetCorporationWalletsDivisionTransactionsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get a list of dogma attribute ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributes
   */
  async getDogmaAttributes() {
    const path = `/dogma/attributes`
    return this.request<
      Types.GetDogmaAttributesResponse,
      Types.GetDogmaAttributesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a dogma attribute

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributesAttributeId
   */
  async getDogmaAttribute(params: Types.GetDogmaAttributeParams) {
    const path = `/dogma/attributes/${params.attribute_id}`
    return this.request<
      Types.GetDogmaAttributeResponse,
      Types.GetDogmaAttributeResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns info about a dynamic item resulting from mutation with a mutaplasmid.

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaDynamicItemsTypeIdItemId
   */
  async getDogmaDynamicTypeItemId(
    params: Types.GetDogmaDynamicTypeItemIdParams
  ) {
    const path = `/dogma/dynamic/items/${params.type_id}/${params.item_id}`
    return this.request<
      Types.GetDogmaDynamicTypeItemIdResponse,
      Types.GetDogmaDynamicTypeItemIdResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of dogma effect ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffects
   */
  async getDogmaEffects() {
    const path = `/dogma/effects`
    return this.request<
      Types.GetDogmaEffectsResponse,
      Types.GetDogmaEffectsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a dogma effect

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffectsEffectId
   */
  async getDogmaEffect(params: Types.GetDogmaEffectParams) {
    const path = `/dogma/effects/${params.effect_id}`
    return this.request<
      Types.GetDogmaEffectResponse,
      Types.GetDogmaEffectResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return details about a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetId
   */
  async getFleet(params: Types.GetFleetParams) {
    const path = `/fleets/${params.fleet_id}`
    return this.request<Types.GetFleetResponse, Types.GetFleetResponseHeaders>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Update settings about a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetId
   */
  async putFleet(params: Types.PutFleetParams) {
    const path = `/fleets/${params.fleet_id}`
    const body = { is_free_move: params.is_free_move, motd: params.motd }
    return this.request<Types.PutFleetResponse, Types.PutFleetResponseHeaders>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Return information about fleet members

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdMembers
   */
  async getFleetMembers(params: Types.GetFleetMembersParams) {
    const path = `/fleets/${params.fleet_id}/members`
    return this.request<
      Types.GetFleetMembersResponse,
      Types.GetFleetMembersResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Invite a character into the fleet. If a character has a CSPA charge set it is not possible to invite them to the fleet using ESI

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdMembers
   */
  async postFleetMembers(params: Types.PostFleetMembersParams) {
    const path = `/fleets/${params.fleet_id}/members`
    const body = {
      character_id: params.character_id,
      role: params.role,
      squad_id: params.squad_id,
      wing_id: params.wing_id,
    }
    return this.request<
      Types.PostFleetMembersResponse,
      Types.PostFleetMembersResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Kick a fleet member

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdMembersMemberId
   */
  async deleteFleetMember(params: Types.DeleteFleetMemberParams) {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    return this.request<
      Types.DeleteFleetMemberResponse,
      Types.DeleteFleetMemberResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Move a fleet member around

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdMembersMemberId
   */
  async putFleetMember(params: Types.PutFleetMemberParams) {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    const body = {
      role: params.role,
      squad_id: params.squad_id,
      wing_id: params.wing_id,
    }
    return this.request<
      Types.PutFleetMemberResponse,
      Types.PutFleetMemberResponseHeaders
    >('PUT', path, undefined, body)
  }

  /**
   * Delete a fleet squad, only empty squads can be deleted

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdSquadsSquadId
   */
  async deleteFleetSquad(params: Types.DeleteFleetSquadParams) {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    return this.request<
      Types.DeleteFleetSquadResponse,
      Types.DeleteFleetSquadResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Rename a fleet squad

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdSquadsSquadId
   */
  async putFleetSquad(params: Types.PutFleetSquadParams) {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    const body = { name: params.name }
    return this.request<
      Types.PutFleetSquadResponse,
      Types.PutFleetSquadResponseHeaders
    >('PUT', path, undefined, body)
  }

  /**
   * Return information about wings in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdWings
   */
  async getFleetWings(params: Types.GetFleetWingsParams) {
    const path = `/fleets/${params.fleet_id}/wings`
    return this.request<
      Types.GetFleetWingsResponse,
      Types.GetFleetWingsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Create a new wing in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWings
   */
  async postFleetWings(params: Types.PostFleetWingsParams) {
    const path = `/fleets/${params.fleet_id}/wings`
    return this.request<
      Types.PostFleetWingsResponse,
      Types.PostFleetWingsResponseHeaders
    >('POST', path, undefined, undefined)
  }

  /**
   * Delete a fleet wing, only empty wings can be deleted. The wing may contain squads, but the squads must be empty

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdWingsWingId
   */
  async deleteFleetWing(params: Types.DeleteFleetWingParams) {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}`
    return this.request<
      Types.DeleteFleetWingResponse,
      Types.DeleteFleetWingResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Rename a fleet wing

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdWingsWingId
   */
  async putFleetWing(params: Types.PutFleetWingParams) {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}`
    const body = { name: params.name }
    return this.request<
      Types.PutFleetWingResponse,
      Types.PutFleetWingResponseHeaders
    >('PUT', path, undefined, body)
  }

  /**
   * Create a new squad in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWingsWingIdSquads
   */
  async postFleetWingSquads(params: Types.PostFleetWingSquadsParams) {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}/squads`
    return this.request<
      Types.PostFleetWingSquadsResponse,
      Types.PostFleetWingSquadsResponseHeaders
    >('POST', path, undefined, undefined)
  }

  /**
   * Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboards
   */
  async getFwLeaderboards() {
    const path = `/fw/leaderboards`
    return this.request<
      Types.GetFwLeaderboardsResponse,
      Types.GetFwLeaderboardsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCharacters
   */
  async getFwLeaderboardsCharacters() {
    const path = `/fw/leaderboards/characters`
    return this.request<
      Types.GetFwLeaderboardsCharactersResponse,
      Types.GetFwLeaderboardsCharactersResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Top 10 leaderboard of corporations for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCorporations
   */
  async getFwLeaderboardsCorporations() {
    const path = `/fw/leaderboards/corporations`
    return this.request<
      Types.GetFwLeaderboardsCorporationsResponse,
      Types.GetFwLeaderboardsCorporationsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Statistical overviews of factions involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwStats
   */
  async getFwStats() {
    const path = `/fw/stats`
    return this.request<
      Types.GetFwStatsResponse,
      Types.GetFwStatsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * An overview of the current ownership of faction warfare solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwSystems
   */
  async getFwSystems() {
    const path = `/fw/systems`
    return this.request<
      Types.GetFwSystemsResponse,
      Types.GetFwSystemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Data about which NPC factions are at war

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwWars
   */
  async getFwWars() {
    const path = `/fw/wars`
    return this.request<
      Types.GetFwWarsResponse,
      Types.GetFwWarsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of current incursions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIncursions
   */
  async getIncursions() {
    const path = `/incursions`
    return this.request<
      Types.GetIncursionsResponse,
      Types.GetIncursionsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of industry facilities

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIndustryFacilities
   */
  async getIndustryFacilities() {
    const path = `/industry/facilities`
    return this.request<
      Types.GetIndustryFacilitiesResponse,
      Types.GetIndustryFacilitiesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return cost indices for solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIndustrySystems
   */
  async getIndustrySystems() {
    const path = `/industry/systems`
    return this.request<
      Types.GetIndustrySystemsResponse,
      Types.GetIndustrySystemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return available insurance levels for all ship types

   * @see https://developers.eveonline.com/api-explorer#/operations/GetInsurancePrices
   */
  async getInsurancePrices() {
    const path = `/insurance/prices`
    return this.request<
      Types.GetInsurancePricesResponse,
      Types.GetInsurancePricesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a single killmail from its ID and hash

   * @see https://developers.eveonline.com/api-explorer#/operations/GetKillmailsKillmailIdKillmailHash
   */
  async getKillmailKillmailHash(params: Types.GetKillmailKillmailHashParams) {
    const path = `/killmails/${params.killmail_id}/${params.killmail_hash}`
    return this.request<
      Types.GetKillmailKillmailHashResponse,
      Types.GetKillmailKillmailHashResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of offers from a specific corporation's loyalty store

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetLoyaltyStoresCorporationIdOffers
   */
  async getLoyaltyCorporationOffers(
    params: Types.GetLoyaltyCorporationOffersParams
  ) {
    const path = `/loyalty/stores/${params.corporation_id}/offers`
    return this.request<
      Types.GetLoyaltyCorporationOffersResponse,
      Types.GetLoyaltyCorporationOffersResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of item groups

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroups
   */
  async getMarketsGroups() {
    const path = `/markets/groups`
    return this.request<
      Types.GetMarketsGroupsResponse,
      Types.GetMarketsGroupsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on an item group

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroupsMarketGroupId
   */
  async getMarketsGroupsMarketGroupId(
    params: Types.GetMarketsGroupsMarketGroupIdParams
  ) {
    const path = `/markets/groups/${params.market_group_id}`
    return this.request<
      Types.GetMarketsGroupsMarketGroupIdResponse,
      Types.GetMarketsGroupsMarketGroupIdResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of prices

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsPrices
   */
  async getMarketsPrices() {
    const path = `/markets/prices`
    return this.request<
      Types.GetMarketsPricesResponse,
      Types.GetMarketsPricesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return all orders in a structure

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsStructuresStructureId
   */
  async getMarketsStructure(params: Types.GetMarketsStructureParams) {
    const path = `/markets/structures/${params.structure_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetMarketsStructureResponse,
      Types.GetMarketsStructureResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return a list of historical market statistics for the specified type in a region

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdHistory
   */
  async getRegionHistory(params: Types.GetRegionHistoryParams) {
    const path = `/markets/${params.region_id}/history`
    const queryParams = { type_id: params.type_id }
    return this.request<
      Types.GetRegionHistoryResponse,
      Types.GetRegionHistoryResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return a list of orders in a region

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdOrders
   */
  async getRegionOrders(params: Types.GetRegionOrdersParams) {
    const path = `/markets/${params.region_id}/orders`
    const queryParams = {
      order_type: params.order_type,
      page: params.page,
      type_id: params.type_id,
    }
    return this.request<
      Types.GetRegionOrdersResponse,
      Types.GetRegionOrdersResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Return a list of type IDs that have active orders in the region, for efficient market indexing.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdTypes
   */
  async getRegionTypes(params: Types.GetRegionTypesParams) {
    const path = `/markets/${params.region_id}/types`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetRegionTypesResponse,
      Types.GetRegionTypesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get the systems between origin and destination

   * @see https://developers.eveonline.com/api-explorer#/operations/GetRouteOriginDestination
   */
  async getRouteOriginDestination(
    params: Types.GetRouteOriginDestinationParams
  ) {
    const path = `/route/${params.origin}/${params.destination}`
    const queryParams = {
      avoid: params.avoid,
      connections: params.connections,
      flag: params.flag,
    }
    return this.request<
      Types.GetRouteOriginDestinationResponse,
      Types.GetRouteOriginDestinationResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Shows sovereignty data for campaigns.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyCampaigns
   */
  async getSovereigntyCampaigns() {
    const path = `/sovereignty/campaigns`
    return this.request<
      Types.GetSovereigntyCampaignsResponse,
      Types.GetSovereigntyCampaignsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Shows sovereignty information for solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyMap
   */
  async getSovereigntyMap() {
    const path = `/sovereignty/map`
    return this.request<
      Types.GetSovereigntyMapResponse,
      Types.GetSovereigntyMapResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Shows sovereignty data for structures.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyStructures
   */
  async getSovereigntyStructures() {
    const path = `/sovereignty/structures`
    return this.request<
      Types.GetSovereigntyStructuresResponse,
      Types.GetSovereigntyStructuresResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * EVE Server status

   * @see https://developers.eveonline.com/api-explorer#/operations/GetStatus
   */
  async getStatus() {
    const path = `/status`
    return this.request<
      Types.GetStatusResponse,
      Types.GetStatusResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Set a solar system as autopilot waypoint

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiAutopilotWaypoint
   */
  async postUiAutopilotWaypoint(params?: Types.PostUiAutopilotWaypointParams) {
    const path = `/ui/autopilot/waypoint`
    const queryParams = params
      ? {
          add_to_beginning: params.add_to_beginning,
          clear_other_waypoints: params.clear_other_waypoints,
          destination_id: params.destination_id,
        }
      : undefined
    return this.request<
      Types.PostUiAutopilotWaypointResponse,
      Types.PostUiAutopilotWaypointResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the contract window inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowContract
   */
  async postUiOpenwindowContract(
    params?: Types.PostUiOpenwindowContractParams
  ) {
    const path = `/ui/openwindow/contract`
    const queryParams = params ? { contract_id: params.contract_id } : undefined
    return this.request<
      Types.PostUiOpenwindowContractResponse,
      Types.PostUiOpenwindowContractResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the information window for a character, corporation or alliance inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowInformation
   */
  async postUiOpenwindowInformation(
    params?: Types.PostUiOpenwindowInformationParams
  ) {
    const path = `/ui/openwindow/information`
    const queryParams = params ? { target_id: params.target_id } : undefined
    return this.request<
      Types.PostUiOpenwindowInformationResponse,
      Types.PostUiOpenwindowInformationResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the market details window for a specific typeID inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowMarketdetails
   */
  async postUiOpenwindowMarketdetails(
    params?: Types.PostUiOpenwindowMarketdetailsParams
  ) {
    const path = `/ui/openwindow/marketdetails`
    const queryParams = params ? { type_id: params.type_id } : undefined
    return this.request<
      Types.PostUiOpenwindowMarketdetailsResponse,
      Types.PostUiOpenwindowMarketdetailsResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the New Mail window, according to settings from the request if applicable

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowNewmail
   */
  async postUiOpenwindowNewmail(params: Types.PostUiOpenwindowNewmailParams) {
    const path = `/ui/openwindow/newmail`
    const body = {
      body: params.body,
      recipients: params.recipients,
      subject: params.subject,
      to_corp_or_alliance_id: params.to_corp_or_alliance_id,
      to_mailing_list_id: params.to_mailing_list_id,
    }
    return this.request<
      Types.PostUiOpenwindowNewmailResponse,
      Types.PostUiOpenwindowNewmailResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Get all character ancestries

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseAncestries
   */
  async getUniverseAncestries() {
    const path = `/universe/ancestries`
    return this.request<
      Types.GetUniverseAncestriesResponse,
      Types.GetUniverseAncestriesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on an asteroid belt

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseAsteroidBeltsAsteroidBeltId
   */
  async getUniverseAsteroidBeltsAsteroidBeltId(
    params: Types.GetUniverseAsteroidBeltsAsteroidBeltIdParams
  ) {
    const path = `/universe/asteroid_belts/${params.asteroid_belt_id}`
    return this.request<
      Types.GetUniverseAsteroidBeltsAsteroidBeltIdResponse,
      Types.GetUniverseAsteroidBeltsAsteroidBeltIdResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of bloodlines

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseBloodlines
   */
  async getUniverseBloodlines() {
    const path = `/universe/bloodlines`
    return this.request<
      Types.GetUniverseBloodlinesResponse,
      Types.GetUniverseBloodlinesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of item categories

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategories
   */
  async getUniverseCategories() {
    const path = `/universe/categories`
    return this.request<
      Types.GetUniverseCategoriesResponse,
      Types.GetUniverseCategoriesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information of an item category

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategoriesCategoryId
   */
  async getUniverseCategory(params: Types.GetUniverseCategoryParams) {
    const path = `/universe/categories/${params.category_id}`
    return this.request<
      Types.GetUniverseCategoryResponse,
      Types.GetUniverseCategoryResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of constellations

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellations
   */
  async getUniverseConstellations() {
    const path = `/universe/constellations`
    return this.request<
      Types.GetUniverseConstellationsResponse,
      Types.GetUniverseConstellationsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a constellation

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellationsConstellationId
   */
  async getUniverseConstellation(params: Types.GetUniverseConstellationParams) {
    const path = `/universe/constellations/${params.constellation_id}`
    return this.request<
      Types.GetUniverseConstellationResponse,
      Types.GetUniverseConstellationResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of factions

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseFactions
   */
  async getUniverseFactions() {
    const path = `/universe/factions`
    return this.request<
      Types.GetUniverseFactionsResponse,
      Types.GetUniverseFactionsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of graphics

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphics
   */
  async getUniverseGraphics() {
    const path = `/universe/graphics`
    return this.request<
      Types.GetUniverseGraphicsResponse,
      Types.GetUniverseGraphicsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a graphic

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphicsGraphicId
   */
  async getUniverseGraphic(params: Types.GetUniverseGraphicParams) {
    const path = `/universe/graphics/${params.graphic_id}`
    return this.request<
      Types.GetUniverseGraphicResponse,
      Types.GetUniverseGraphicResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of item groups

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroups
   */
  async getUniverseGroups(params?: Types.GetUniverseGroupsParams) {
    const path = `/universe/groups`
    const queryParams = params ? { page: params.page } : undefined
    return this.request<
      Types.GetUniverseGroupsResponse,
      Types.GetUniverseGroupsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get information on an item group

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroupsGroupId
   */
  async getUniverseGroup(params: Types.GetUniverseGroupParams) {
    const path = `/universe/groups/${params.group_id}`
    return this.request<
      Types.GetUniverseGroupResponse,
      Types.GetUniverseGroupResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 12 hours

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUniverseIds
   */
  async postUniverseIds(params: Types.PostUniverseIdsParams) {
    const path = `/universe/ids`
    const body = params.body
    return this.request<
      Types.PostUniverseIdsResponse,
      Types.PostUniverseIdsResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Get information on a moon

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseMoonsMoonId
   */
  async getUniverseMoon(params: Types.GetUniverseMoonParams) {
    const path = `/universe/moons/${params.moon_id}`
    return this.request<
      Types.GetUniverseMoonResponse,
      Types.GetUniverseMoonResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUniverseNames
   */
  async postUniverseNames(params: Types.PostUniverseNamesParams) {
    const path = `/universe/names`
    const body = params.body
    return this.request<
      Types.PostUniverseNamesResponse,
      Types.PostUniverseNamesResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Get information on a planet

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniversePlanetsPlanetId
   */
  async getUniversePlanet(params: Types.GetUniversePlanetParams) {
    const path = `/universe/planets/${params.planet_id}`
    return this.request<
      Types.GetUniversePlanetResponse,
      Types.GetUniversePlanetResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of character races

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRaces
   */
  async getUniverseRaces() {
    const path = `/universe/races`
    return this.request<
      Types.GetUniverseRacesResponse,
      Types.GetUniverseRacesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of regions

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegions
   */
  async getUniverseRegions() {
    const path = `/universe/regions`
    return this.request<
      Types.GetUniverseRegionsResponse,
      Types.GetUniverseRegionsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a region

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegionsRegionId
   */
  async getUniverseRegion(params: Types.GetUniverseRegionParams) {
    const path = `/universe/regions/${params.region_id}`
    return this.request<
      Types.GetUniverseRegionResponse,
      Types.GetUniverseRegionResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a planetary factory schematic

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSchematicsSchematicId
   */
  async getUniverseSchematic(params: Types.GetUniverseSchematicParams) {
    const path = `/universe/schematics/${params.schematic_id}`
    return this.request<
      Types.GetUniverseSchematicResponse,
      Types.GetUniverseSchematicResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a stargate

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStargatesStargateId
   */
  async getUniverseStargate(params: Types.GetUniverseStargateParams) {
    const path = `/universe/stargates/${params.stargate_id}`
    return this.request<
      Types.GetUniverseStargateResponse,
      Types.GetUniverseStargateResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a star

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStarsStarId
   */
  async getUniverseStar(params: Types.GetUniverseStarParams) {
    const path = `/universe/stars/${params.star_id}`
    return this.request<
      Types.GetUniverseStarResponse,
      Types.GetUniverseStarResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a station

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStationsStationId
   */
  async getUniverseStation(params: Types.GetUniverseStationParams) {
    const path = `/universe/stations/${params.station_id}`
    return this.request<
      Types.GetUniverseStationResponse,
      Types.GetUniverseStationResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * List all public structures

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructures
   */
  async getUniverseStructures(params?: Types.GetUniverseStructuresParams) {
    const path = `/universe/structures`
    const queryParams = params ? { filter: params.filter } : undefined
    return this.request<
      Types.GetUniverseStructuresResponse,
      Types.GetUniverseStructuresResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructuresStructureId
   */
  async getUniverseStructure(params: Types.GetUniverseStructureParams) {
    const path = `/universe/structures/${params.structure_id}`
    return this.request<
      Types.GetUniverseStructureResponse,
      Types.GetUniverseStructureResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemJumps
   */
  async getUniverseSystemJumps() {
    const path = `/universe/system_jumps`
    return this.request<
      Types.GetUniverseSystemJumpsResponse,
      Types.GetUniverseSystemJumpsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemKills
   */
  async getUniverseSystemKills() {
    const path = `/universe/system_kills`
    return this.request<
      Types.GetUniverseSystemKillsResponse,
      Types.GetUniverseSystemKillsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of solar systems

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystems
   */
  async getUniverseSystems() {
    const path = `/universe/systems`
    return this.request<
      Types.GetUniverseSystemsResponse,
      Types.GetUniverseSystemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get information on a solar system.

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemsSystemId
   */
  async getUniverseSystem(params: Types.GetUniverseSystemParams) {
    const path = `/universe/systems/${params.system_id}`
    return this.request<
      Types.GetUniverseSystemResponse,
      Types.GetUniverseSystemResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of type ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypes
   */
  async getUniverseTypes(params?: Types.GetUniverseTypesParams) {
    const path = `/universe/types`
    const queryParams = params ? { page: params.page } : undefined
    return this.request<
      Types.GetUniverseTypesResponse,
      Types.GetUniverseTypesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get information on a type

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypesTypeId
   */
  async getUniverseType(params: Types.GetUniverseTypeParams) {
    const path = `/universe/types/${params.type_id}`
    return this.request<
      Types.GetUniverseTypeResponse,
      Types.GetUniverseTypeResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Return a list of wars

   * @see https://developers.eveonline.com/api-explorer#/operations/GetWars
   */
  async getWars(params?: Types.GetWarsParams) {
    const path = `/wars`
    const queryParams = params ? { max_war_id: params.max_war_id } : undefined
    return this.request<Types.GetWarsResponse, Types.GetWarsResponseHeaders>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return details about a war

   * @see https://developers.eveonline.com/api-explorer#/operations/GetWarsWarId
   */
  async getWar(params: Types.GetWarParams) {
    const path = `/wars/${params.war_id}`
    return this.request<Types.GetWarResponse, Types.GetWarResponseHeaders>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of kills related to a war

   * @see https://developers.eveonline.com/api-explorer#/operations/GetWarsWarIdKillmails
   */
  async getWarKillmails(params: Types.GetWarKillmailsParams) {
    const path = `/wars/${params.war_id}/killmails`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetWarKillmailsResponse,
      Types.GetWarKillmailsResponseHeaders
    >('GET', path, queryParams, undefined)
  }
}

export default EsiClient
