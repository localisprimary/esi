// Auto-generated API client for EVE ESI API
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from './types'

export class EsiClient {
  private readonly baseUrl: string = 'https://esi.evetech.net'
  private readonly token?: string

  constructor(options: { token?: string } = {}) {
    this.token = options.token
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, any>,
    body?: any
  ): Promise<Types.EsiResponse<T>> {
    const url = new URL(path, this.baseUrl)

    if (params && method === 'GET') {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
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
      headers: Object.fromEntries(response.headers.entries()),
    }
  }

  /**
   * List all active player alliances

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliances
   */
  async getAlliances(): Promise<Types.EsiResponse<Types.GetAlliancesResponse>> {
    const path = `/alliances`
    return this.request<Types.GetAlliancesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Public information about an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceId
   */
  async getAlliance(
    params: Types.GetAllianceParams
  ): Promise<Types.EsiResponse<Types.GetAllianceResponse>> {
    const path = `/alliances/${params.alliance_id}`
    return this.request<Types.GetAllianceResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return contacts of an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContacts
   */
  async getAllianceContacts(
    params: Types.GetAllianceContactsParams
  ): Promise<Types.EsiResponse<Types.GetAllianceContactsResponse>> {
    const path = `/alliances/${params.alliance_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<Types.GetAllianceContactsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return custom labels for an alliance's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdContactsLabels
   */
  async getAllianceContactsLabels(
    params: Types.GetAllianceContactsLabelsParams
  ): Promise<Types.EsiResponse<Types.GetAllianceContactsLabelsResponse>> {
    const path = `/alliances/${params.alliance_id}/contacts/labels`
    return this.request<Types.GetAllianceContactsLabelsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List all current member corporations of an alliance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdCorporations
   */
  async getAllianceCorporations(
    params: Types.GetAllianceCorporationsParams
  ): Promise<Types.EsiResponse<Types.GetAllianceCorporationsResponse>> {
    const path = `/alliances/${params.alliance_id}/corporations`
    return this.request<Types.GetAllianceCorporationsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get the icon urls for a alliance

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetAlliancesAllianceIdIcons
   */
  async getAllianceIcons(
    params: Types.GetAllianceIconsParams
  ): Promise<Types.EsiResponse<Types.GetAllianceIconsResponse>> {
    const path = `/alliances/${params.alliance_id}/icons`
    return this.request<Types.GetAllianceIconsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Bulk lookup of character IDs to corporation, alliance and faction

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersAffiliation
   */
  async postCharactersAffiliation(
    params: Types.PostCharactersAffiliationParams
  ): Promise<Types.EsiResponse<Types.PostCharactersAffiliationResponse>> {
    const path = `/characters/affiliation`
    const body = params.body
    return this.request<Types.PostCharactersAffiliationResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Public information about a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterId
   */
  async getCharacter(
    params: Types.GetCharacterParams
  ): Promise<Types.EsiResponse<Types.GetCharacterResponse>> {
    const path = `/characters/${params.character_id}`
    return this.request<Types.GetCharacterResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate)

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAgentsResearch
   */
  async getCharacterAgentsResearch(
    params: Types.GetCharacterAgentsResearchParams
  ): Promise<Types.EsiResponse<Types.GetCharacterAgentsResearchResponse>> {
    const path = `/characters/${params.character_id}/agents_research`
    return this.request<Types.GetCharacterAgentsResearchResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of the characters assets

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAssets
   */
  async getCharacterAssets(
    params: Types.GetCharacterAssetsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterAssetsResponse>> {
    const path = `/characters/${params.character_id}/assets`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterAssetsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsLocations
   */
  async postCharacterAssetsLocations(
    params: Types.PostCharacterAssetsLocationsParams
  ): Promise<Types.EsiResponse<Types.PostCharacterAssetsLocationsResponse>> {
    const path = `/characters/${params.character_id}/assets/locations`
    const body = params.body
    return this.request<Types.PostCharacterAssetsLocationsResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships.

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdAssetsNames
   */
  async postCharacterAssetsNames(
    params: Types.PostCharacterAssetsNamesParams
  ): Promise<Types.EsiResponse<Types.PostCharacterAssetsNamesResponse>> {
    const path = `/characters/${params.character_id}/assets/names`
    const body = params.body
    return this.request<Types.PostCharacterAssetsNamesResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Return attributes of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdAttributes
   */
  async getCharacterAttributes(
    params: Types.GetCharacterAttributesParams
  ): Promise<Types.EsiResponse<Types.GetCharacterAttributesResponse>> {
    const path = `/characters/${params.character_id}/attributes`
    return this.request<Types.GetCharacterAttributesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of blueprints the character owns

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdBlueprints
   */
  async getCharacterBlueprints(
    params: Types.GetCharacterBlueprintsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterBlueprintsResponse>> {
    const path = `/characters/${params.character_id}/blueprints`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterBlueprintsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get 50 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendar
   */
  async getCharacterCalendar(
    params: Types.GetCharacterCalendarParams
  ): Promise<Types.EsiResponse<Types.GetCharacterCalendarResponse>> {
    const path = `/characters/${params.character_id}/calendar`
    const queryParams = { from_event: params.from_event }
    return this.request<Types.GetCharacterCalendarResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get all the information for a specific event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventId
   */
  async getCharacterCalendarEventId(
    params: Types.GetCharacterCalendarEventIdParams
  ): Promise<Types.EsiResponse<Types.GetCharacterCalendarEventIdResponse>> {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    return this.request<Types.GetCharacterCalendarEventIdResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Set your response status to an event

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdCalendarEventId
   */
  async putCharacterCalendarEventId(
    params: Types.PutCharacterCalendarEventIdParams
  ): Promise<Types.EsiResponse<Types.PutCharacterCalendarEventIdResponse>> {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    const body = { response: params.response }
    return this.request<Types.PutCharacterCalendarEventIdResponse>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Get all invited attendees for a given event

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCalendarEventIdAttendees
   */
  async getCharacterCalendarEventAttendees(
    params: Types.GetCharacterCalendarEventAttendeesParams
  ): Promise<
    Types.EsiResponse<Types.GetCharacterCalendarEventAttendeesResponse>
  > {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}/attendees`
    return this.request<Types.GetCharacterCalendarEventAttendeesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * A list of the character's clones

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdClones
   */
  async getCharacterClones(
    params: Types.GetCharacterClonesParams
  ): Promise<Types.EsiResponse<Types.GetCharacterClonesResponse>> {
    const path = `/characters/${params.character_id}/clones`
    return this.request<Types.GetCharacterClonesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Bulk delete contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdContacts
   */
  async deleteCharacterContacts(
    params: Types.DeleteCharacterContactsParams
  ): Promise<Types.EsiResponse<Types.DeleteCharacterContactsResponse>> {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = { contact_ids: params.contact_ids }
    return this.request<Types.DeleteCharacterContactsResponse>(
      'DELETE',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return contacts of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContacts
   */
  async getCharacterContacts(
    params: Types.GetCharacterContactsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterContactsResponse>> {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterContactsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Bulk add contacts with same settings

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdContacts
   */
  async postCharacterContacts(
    params: Types.PostCharacterContactsParams
  ): Promise<Types.EsiResponse<Types.PostCharacterContactsResponse>> {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = {
      label_ids: params.label_ids,
      standing: params.standing,
      watched: params.watched,
    }
    const body = params.body
    return this.request<Types.PostCharacterContactsResponse>(
      'POST',
      path,
      queryParams,
      body
    )
  }

  /**
   * Bulk edit contacts with same settings

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdContacts
   */
  async putCharacterContacts(
    params: Types.PutCharacterContactsParams
  ): Promise<Types.EsiResponse<Types.PutCharacterContactsResponse>> {
    const path = `/characters/${params.character_id}/contacts`
    const queryParams = {
      label_ids: params.label_ids,
      standing: params.standing,
      watched: params.watched,
    }
    const body = params.body
    return this.request<Types.PutCharacterContactsResponse>(
      'PUT',
      path,
      queryParams,
      body
    )
  }

  /**
   * Return custom labels for a character's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContactsLabels
   */
  async getCharacterContactsLabels(
    params: Types.GetCharacterContactsLabelsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterContactsLabelsResponse>> {
    const path = `/characters/${params.character_id}/contacts/labels`
    return this.request<Types.GetCharacterContactsLabelsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContracts
   */
  async getCharacterContracts(
    params: Types.GetCharacterContractsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterContractsResponse>> {
    const path = `/characters/${params.character_id}/contracts`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterContractsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Lists bids on a particular auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdBids
   */
  async getCharacterContractBids(
    params: Types.GetCharacterContractBidsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterContractBidsResponse>> {
    const path = `/characters/${params.character_id}/contracts/${params.contract_id}/bids`
    return this.request<Types.GetCharacterContractBidsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Lists items of a particular contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdContractsContractIdItems
   */
  async getCharacterContractItems(
    params: Types.GetCharacterContractItemsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterContractItemsResponse>> {
    const path = `/characters/${params.character_id}/contracts/${params.contract_id}/items`
    return this.request<Types.GetCharacterContractItemsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of all the corporations a character has been a member of

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdCorporationhistory
   */
  async getCharacterCorporationhistory(
    params: Types.GetCharacterCorporationhistoryParams
  ): Promise<Types.EsiResponse<Types.GetCharacterCorporationhistoryResponse>> {
    const path = `/characters/${params.character_id}/corporationhistory`
    return this.request<Types.GetCharacterCorporationhistoryResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Takes a source character ID in the url and a set of target character ID's in the body, returns a CSPA charge cost

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdCspa
   */
  async postCharacterCspa(
    params: Types.PostCharacterCspaParams
  ): Promise<Types.EsiResponse<Types.PostCharacterCspaResponse>> {
    const path = `/characters/${params.character_id}/cspa`
    const body = params.body
    return this.request<Types.PostCharacterCspaResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Return a character's jump activation and fatigue information

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFatigue
   */
  async getCharacterFatigue(
    params: Types.GetCharacterFatigueParams
  ): Promise<Types.EsiResponse<Types.GetCharacterFatigueResponse>> {
    const path = `/characters/${params.character_id}/fatigue`
    return this.request<Types.GetCharacterFatigueResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return fittings of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFittings
   */
  async getCharacterFittings(
    params: Types.GetCharacterFittingsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterFittingsResponse>> {
    const path = `/characters/${params.character_id}/fittings`
    return this.request<Types.GetCharacterFittingsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Save a new fitting for a character

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdFittings
   */
  async postCharacterFittings(
    params: Types.PostCharacterFittingsParams
  ): Promise<Types.EsiResponse<Types.PostCharacterFittingsResponse>> {
    const path = `/characters/${params.character_id}/fittings`
    const body = {
      description: params.description,
      items: params.items,
      name: params.name,
      ship_type_id: params.ship_type_id,
    }
    return this.request<Types.PostCharacterFittingsResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Delete a fitting from a character

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdFittingsFittingId
   */
  async deleteCharacterFitting(
    params: Types.DeleteCharacterFittingParams
  ): Promise<Types.EsiResponse<Types.DeleteCharacterFittingResponse>> {
    const path = `/characters/${params.character_id}/fittings/${params.fitting_id}`
    return this.request<Types.DeleteCharacterFittingResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return the fleet ID the character is in, if any.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFleet
   */
  async getCharacterFleet(
    params: Types.GetCharacterFleetParams
  ): Promise<Types.EsiResponse<Types.GetCharacterFleetResponse>> {
    const path = `/characters/${params.character_id}/fleet`
    return this.request<Types.GetCharacterFleetResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Statistical overview of a character involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdFwStats
   */
  async getCharacterFwStats(
    params: Types.GetCharacterFwStatsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterFwStatsResponse>> {
    const path = `/characters/${params.character_id}/fw/stats`
    return this.request<Types.GetCharacterFwStatsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return implants on the active clone of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdImplants
   */
  async getCharacterImplants(
    params: Types.GetCharacterImplantsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterImplantsResponse>> {
    const path = `/characters/${params.character_id}/implants`
    return this.request<Types.GetCharacterImplantsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List industry jobs placed by a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdIndustryJobs
   */
  async getCharacterIndustryJobs(
    params: Types.GetCharacterIndustryJobsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterIndustryJobsResponse>> {
    const path = `/characters/${params.character_id}/industry/jobs`
    const queryParams = { include_completed: params.include_completed }
    return this.request<Types.GetCharacterIndustryJobsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return a list of a character's kills and losses going back 90 days

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdKillmailsRecent
   */
  async getCharacterKillmailsRecent(
    params: Types.GetCharacterKillmailsRecentParams
  ): Promise<Types.EsiResponse<Types.GetCharacterKillmailsRecentResponse>> {
    const path = `/characters/${params.character_id}/killmails/recent`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterKillmailsRecentResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLocation
   */
  async getCharacterLocation(
    params: Types.GetCharacterLocationParams
  ): Promise<Types.EsiResponse<Types.GetCharacterLocationResponse>> {
    const path = `/characters/${params.character_id}/location`
    return this.request<Types.GetCharacterLocationResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of loyalty points for all corporations the character has worked for

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdLoyaltyPoints
   */
  async getCharacterLoyaltyPoints(
    params: Types.GetCharacterLoyaltyPointsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterLoyaltyPointsResponse>> {
    const path = `/characters/${params.character_id}/loyalty/points`
    return this.request<Types.GetCharacterLoyaltyPointsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMail
   */
  async getCharacterMail(
    params: Types.GetCharacterMailParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMailResponse>> {
    const path = `/characters/${params.character_id}/mail`
    const queryParams = {
      labels: params.labels,
      last_mail_id: params.last_mail_id,
    }
    return this.request<Types.GetCharacterMailResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Create and send a new mail

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMail
   */
  async postCharacterMail(
    params: Types.PostCharacterMailParams
  ): Promise<Types.EsiResponse<Types.PostCharacterMailResponse>> {
    const path = `/characters/${params.character_id}/mail`
    const body = {
      approved_cost: params.approved_cost,
      body: params.body,
      recipients: params.recipients,
      subject: params.subject,
    }
    return this.request<Types.PostCharacterMailResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Return a list of the users mail labels, unread counts for each label and a total unread count.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLabels
   */
  async getCharacterMailLabels(
    params: Types.GetCharacterMailLabelsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMailLabelsResponse>> {
    const path = `/characters/${params.character_id}/mail/labels`
    return this.request<Types.GetCharacterMailLabelsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Create a mail label

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCharactersCharacterIdMailLabels
   */
  async postCharacterMailLabels(
    params: Types.PostCharacterMailLabelsParams
  ): Promise<Types.EsiResponse<Types.PostCharacterMailLabelsResponse>> {
    const path = `/characters/${params.character_id}/mail/labels`
    const body = { color: params.color, name: params.name }
    return this.request<Types.PostCharacterMailLabelsResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Delete a mail label

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailLabelsLabelId
   */
  async deleteCharacterMailLabel(
    params: Types.DeleteCharacterMailLabelParams
  ): Promise<Types.EsiResponse<Types.DeleteCharacterMailLabelResponse>> {
    const path = `/characters/${params.character_id}/mail/labels/${params.label_id}`
    return this.request<Types.DeleteCharacterMailLabelResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return all mailing lists that the character is subscribed to

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailLists
   */
  async getCharacterMailLists(
    params: Types.GetCharacterMailListsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMailListsResponse>> {
    const path = `/characters/${params.character_id}/mail/lists`
    return this.request<Types.GetCharacterMailListsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Delete a mail

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteCharactersCharacterIdMailMailId
   */
  async deleteCharacterMailMailId(
    params: Types.DeleteCharacterMailMailIdParams
  ): Promise<Types.EsiResponse<Types.DeleteCharacterMailMailIdResponse>> {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<Types.DeleteCharacterMailMailIdResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return the contents of an EVE mail

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailMailId
   */
  async getCharacterMailMailId(
    params: Types.GetCharacterMailMailIdParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMailMailIdResponse>> {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<Types.GetCharacterMailMailIdResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Update metadata about a mail

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdMailMailId
   */
  async putCharacterMailMailId(
    params: Types.PutCharacterMailMailIdParams
  ): Promise<Types.EsiResponse<Types.PutCharacterMailMailIdResponse>> {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    const body = { labels: params.labels, read: params.read }
    return this.request<Types.PutCharacterMailMailIdResponse>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Return a list of medals the character has

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMedals
   */
  async getCharacterMedals(
    params: Types.GetCharacterMedalsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMedalsResponse>> {
    const path = `/characters/${params.character_id}/medals`
    return this.request<Types.GetCharacterMedalsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Paginated record of all mining done by a character for the past 30 days

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMining
   */
  async getCharacterMining(
    params: Types.GetCharacterMiningParams
  ): Promise<Types.EsiResponse<Types.GetCharacterMiningResponse>> {
    const path = `/characters/${params.character_id}/mining`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterMiningResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return character notifications

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotifications
   */
  async getCharacterNotifications(
    params: Types.GetCharacterNotificationsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterNotificationsResponse>> {
    const path = `/characters/${params.character_id}/notifications`
    return this.request<Types.GetCharacterNotificationsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return notifications about having been added to someone's contact list

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdNotificationsContacts
   */
  async getCharacterNotificationsContacts(
    params: Types.GetCharacterNotificationsContactsParams
  ): Promise<
    Types.EsiResponse<Types.GetCharacterNotificationsContactsResponse>
  > {
    const path = `/characters/${params.character_id}/notifications/contacts`
    return this.request<Types.GetCharacterNotificationsContactsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Checks if the character is currently online

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOnline
   */
  async getCharacterOnline(
    params: Types.GetCharacterOnlineParams
  ): Promise<Types.EsiResponse<Types.GetCharacterOnlineResponse>> {
    const path = `/characters/${params.character_id}/online`
    return this.request<Types.GetCharacterOnlineResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List open market orders placed by a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrders
   */
  async getCharacterOrders(
    params: Types.GetCharacterOrdersParams
  ): Promise<Types.EsiResponse<Types.GetCharacterOrdersResponse>> {
    const path = `/characters/${params.character_id}/orders`
    return this.request<Types.GetCharacterOrdersResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List cancelled and expired market orders placed by a character up to 90 days in the past.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdOrdersHistory
   */
  async getCharacterOrdersHistory(
    params: Types.GetCharacterOrdersHistoryParams
  ): Promise<Types.EsiResponse<Types.GetCharacterOrdersHistoryResponse>> {
    const path = `/characters/${params.character_id}/orders/history`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterOrdersHistoryResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns a list of all planetary colonies owned by a character.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanets
   */
  async getCharacterPlanets(
    params: Types.GetCharacterPlanetsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterPlanetsResponse>> {
    const path = `/characters/${params.character_id}/planets`
    return this.request<Types.GetCharacterPlanetsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPlanetsPlanetId
   */
  async getCharacterPlanet(
    params: Types.GetCharacterPlanetParams
  ): Promise<Types.EsiResponse<Types.GetCharacterPlanetResponse>> {
    const path = `/characters/${params.character_id}/planets/${params.planet_id}`
    return this.request<Types.GetCharacterPlanetResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get portrait urls for a character

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdPortrait
   */
  async getCharacterPortrait(
    params: Types.GetCharacterPortraitParams
  ): Promise<Types.EsiResponse<Types.GetCharacterPortraitResponse>> {
    const path = `/characters/${params.character_id}/portrait`
    return this.request<Types.GetCharacterPortraitResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns a character's corporation roles

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdRoles
   */
  async getCharacterRoles(
    params: Types.GetCharacterRolesParams
  ): Promise<Types.EsiResponse<Types.GetCharacterRolesResponse>> {
    const path = `/characters/${params.character_id}/roles`
    return this.request<Types.GetCharacterRolesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Search for entities that match a given sub-string.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSearch
   */
  async getCharacterSearch(
    params: Types.GetCharacterSearchParams
  ): Promise<Types.EsiResponse<Types.GetCharacterSearchResponse>> {
    const path = `/characters/${params.character_id}/search`
    const queryParams = {
      categories: params.categories,
      search: params.search,
      strict: params.strict,
    }
    return this.request<Types.GetCharacterSearchResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get the current ship type, name and id

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdShip
   */
  async getCharacterShip(
    params: Types.GetCharacterShipParams
  ): Promise<Types.EsiResponse<Types.GetCharacterShipResponse>> {
    const path = `/characters/${params.character_id}/ship`
    return this.request<Types.GetCharacterShipResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List the configured skill queue for the given character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkillqueue
   */
  async getCharacterSkillqueue(
    params: Types.GetCharacterSkillqueueParams
  ): Promise<Types.EsiResponse<Types.GetCharacterSkillqueueResponse>> {
    const path = `/characters/${params.character_id}/skillqueue`
    return this.request<Types.GetCharacterSkillqueueResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List all trained skills for the given character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdSkills
   */
  async getCharacterSkills(
    params: Types.GetCharacterSkillsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterSkillsResponse>> {
    const path = `/characters/${params.character_id}/skills`
    return this.request<Types.GetCharacterSkillsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return character standings from agents, NPC corporations, and factions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdStandings
   */
  async getCharacterStandings(
    params: Types.GetCharacterStandingsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterStandingsResponse>> {
    const path = `/characters/${params.character_id}/standings`
    return this.request<Types.GetCharacterStandingsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns a character's titles

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdTitles
   */
  async getCharacterTitles(
    params: Types.GetCharacterTitlesParams
  ): Promise<Types.EsiResponse<Types.GetCharacterTitlesResponse>> {
    const path = `/characters/${params.character_id}/titles`
    return this.request<Types.GetCharacterTitlesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns a character's wallet balance

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWallet
   */
  async getCharacterWallet(
    params: Types.GetCharacterWalletParams
  ): Promise<Types.EsiResponse<Types.GetCharacterWalletResponse>> {
    const path = `/characters/${params.character_id}/wallet`
    return this.request<Types.GetCharacterWalletResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Retrieve the given character's wallet journal going 30 days back

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletJournal
   */
  async getCharacterWalletJournal(
    params: Types.GetCharacterWalletJournalParams
  ): Promise<Types.EsiResponse<Types.GetCharacterWalletJournalResponse>> {
    const path = `/characters/${params.character_id}/wallet/journal`
    const queryParams = { page: params.page }
    return this.request<Types.GetCharacterWalletJournalResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get wallet transactions of a character

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdWalletTransactions
   */
  async getCharacterWalletTransactions(
    params: Types.GetCharacterWalletTransactionsParams
  ): Promise<Types.EsiResponse<Types.GetCharacterWalletTransactionsResponse>> {
    const path = `/characters/${params.character_id}/wallet/transactions`
    const queryParams = { from_id: params.from_id }
    return this.request<Types.GetCharacterWalletTransactionsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Lists bids on a public auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicBidsContractId
   */
  async getContractsPublicBids(
    params: Types.GetContractsPublicBidsParams
  ): Promise<Types.EsiResponse<Types.GetContractsPublicBidsResponse>> {
    const path = `/contracts/public/bids/${params.contract_id}`
    const queryParams = { page: params.page }
    return this.request<Types.GetContractsPublicBidsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Lists items of a public contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicItemsContractId
   */
  async getContractsPublicItems(
    params: Types.GetContractsPublicItemsParams
  ): Promise<Types.EsiResponse<Types.GetContractsPublicItemsResponse>> {
    const path = `/contracts/public/items/${params.contract_id}`
    const queryParams = { page: params.page }
    return this.request<Types.GetContractsPublicItemsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns a paginated list of all public contracts in the given region

   * @see https://developers.eveonline.com/api-explorer#/operations/GetContractsPublicRegionId
   */
  async getContractsPublicRegionId(
    params: Types.GetContractsPublicRegionIdParams
  ): Promise<Types.EsiResponse<Types.GetContractsPublicRegionIdResponse>> {
    const path = `/contracts/public/${params.region_id}`
    const queryParams = { page: params.page }
    return this.request<Types.GetContractsPublicRegionIdResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.

   * Requires one of the following EVE corporation role(s): Station_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningExtractions
   */
  async getCorporationCorporationMiningExtractions(
    params: Types.GetCorporationCorporationMiningExtractionsParams
  ): Promise<
    Types.EsiResponse<Types.GetCorporationCorporationMiningExtractionsResponse>
  > {
    const path = `/corporation/${params.corporation_id}/mining/extractions`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationCorporationMiningExtractionsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Paginated list of all entities capable of observing and recording mining for a corporation

   * Requires one of the following EVE corporation role(s): Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObservers
   */
  async getCorporationCorporationMiningObservers(
    params: Types.GetCorporationCorporationMiningObserversParams
  ): Promise<
    Types.EsiResponse<Types.GetCorporationCorporationMiningObserversResponse>
  > {
    const path = `/corporation/${params.corporation_id}/mining/observers`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationCorporationMiningObserversResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Paginated record of all mining seen by an observer

   * Requires one of the following EVE corporation role(s): Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObserversObserverId
   */
  async getCorporationCorporationMiningObserver(
    params: Types.GetCorporationCorporationMiningObserverParams
  ): Promise<
    Types.EsiResponse<Types.GetCorporationCorporationMiningObserverResponse>
  > {
    const path = `/corporation/${params.corporation_id}/mining/observers/${params.observer_id}`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationCorporationMiningObserverResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get a list of npc corporations

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsNpccorps
   */
  async getCorporationsNpccorps(): Promise<
    Types.EsiResponse<Types.GetCorporationsNpccorpsResponse>
  > {
    const path = `/corporations/npccorps`
    return this.request<Types.GetCorporationsNpccorpsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Public information about a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationId
   */
  async getCorporation(
    params: Types.GetCorporationParams
  ): Promise<Types.EsiResponse<Types.GetCorporationResponse>> {
    const path = `/corporations/${params.corporation_id}`
    return this.request<Types.GetCorporationResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of all the alliances a corporation has been a member of

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAlliancehistory
   */
  async getCorporationAlliancehistory(
    params: Types.GetCorporationAlliancehistoryParams
  ): Promise<Types.EsiResponse<Types.GetCorporationAlliancehistoryResponse>> {
    const path = `/corporations/${params.corporation_id}/alliancehistory`
    return this.request<Types.GetCorporationAlliancehistoryResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of the corporation assets

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdAssets
   */
  async getCorporationAssets(
    params: Types.GetCorporationAssetsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationAssetsResponse>> {
    const path = `/corporations/${params.corporation_id}/assets`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationAssetsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsLocations
   */
  async postCorporationAssetsLocations(
    params: Types.PostCorporationAssetsLocationsParams
  ): Promise<Types.EsiResponse<Types.PostCorporationAssetsLocationsResponse>> {
    const path = `/corporations/${params.corporation_id}/assets/locations`
    const body = params.body
    return this.request<Types.PostCorporationAssetsLocationsResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/PostCorporationsCorporationIdAssetsNames
   */
  async postCorporationAssetsNames(
    params: Types.PostCorporationAssetsNamesParams
  ): Promise<Types.EsiResponse<Types.PostCorporationAssetsNamesResponse>> {
    const path = `/corporations/${params.corporation_id}/assets/names`
    const body = params.body
    return this.request<Types.PostCorporationAssetsNamesResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Returns a list of blueprints the corporation owns

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdBlueprints
   */
  async getCorporationBlueprints(
    params: Types.GetCorporationBlueprintsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationBlueprintsResponse>> {
    const path = `/corporations/${params.corporation_id}/blueprints`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationBlueprintsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return contacts of a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContacts
   */
  async getCorporationContacts(
    params: Types.GetCorporationContactsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContactsResponse>> {
    const path = `/corporations/${params.corporation_id}/contacts`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationContactsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return custom labels for a corporation's contacts

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContactsLabels
   */
  async getCorporationContactsLabels(
    params: Types.GetCorporationContactsLabelsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContactsLabelsResponse>> {
    const path = `/corporations/${params.corporation_id}/contacts/labels`
    return this.request<Types.GetCorporationContactsLabelsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContainersLogs
   */
  async getCorporationContainersLogs(
    params: Types.GetCorporationContainersLogsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContainersLogsResponse>> {
    const path = `/corporations/${params.corporation_id}/containers/logs`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationContainersLogsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContracts
   */
  async getCorporationContracts(
    params: Types.GetCorporationContractsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContractsResponse>> {
    const path = `/corporations/${params.corporation_id}/contracts`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationContractsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Lists bids on a particular auction contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdBids
   */
  async getCorporationContractBids(
    params: Types.GetCorporationContractBidsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContractBidsResponse>> {
    const path = `/corporations/${params.corporation_id}/contracts/${params.contract_id}/bids`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationContractBidsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Lists items of a particular contract

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdContractsContractIdItems
   */
  async getCorporationContractItems(
    params: Types.GetCorporationContractItemsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationContractItemsResponse>> {
    const path = `/corporations/${params.corporation_id}/contracts/${params.contract_id}/items`
    return this.request<Types.GetCorporationContractItemsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List customs offices owned by a corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdCustomsOffices
   */
  async getCorporationCustomsOffices(
    params: Types.GetCorporationCustomsOfficesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationCustomsOfficesResponse>> {
    const path = `/corporations/${params.corporation_id}/customs_offices`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationCustomsOfficesResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return corporation hangar and wallet division names, only show if a division is not using the default name

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdDivisions
   */
  async getCorporationDivisions(
    params: Types.GetCorporationDivisionsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationDivisionsResponse>> {
    const path = `/corporations/${params.corporation_id}/divisions`
    return this.request<Types.GetCorporationDivisionsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a corporation's facilities

   * Requires one of the following EVE corporation role(s): Factory_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFacilities
   */
  async getCorporationFacilities(
    params: Types.GetCorporationFacilitiesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationFacilitiesResponse>> {
    const path = `/corporations/${params.corporation_id}/facilities`
    return this.request<Types.GetCorporationFacilitiesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Statistics about a corporation involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdFwStats
   */
  async getCorporationFwStats(
    params: Types.GetCorporationFwStatsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationFwStatsResponse>> {
    const path = `/corporations/${params.corporation_id}/fw/stats`
    return this.request<Types.GetCorporationFwStatsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get the icon urls for a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIcons
   */
  async getCorporationIcons(
    params: Types.GetCorporationIconsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationIconsResponse>> {
    const path = `/corporations/${params.corporation_id}/icons`
    return this.request<Types.GetCorporationIconsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List industry jobs run by a corporation

   * Requires one of the following EVE corporation role(s): Factory_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdIndustryJobs
   */
  async getCorporationIndustryJobs(
    params: Types.GetCorporationIndustryJobsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationIndustryJobsResponse>> {
    const path = `/corporations/${params.corporation_id}/industry/jobs`
    const queryParams = {
      include_completed: params.include_completed,
      page: params.page,
    }
    return this.request<Types.GetCorporationIndustryJobsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get a list of a corporation's kills and losses going back 90 days

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdKillmailsRecent
   */
  async getCorporationKillmailsRecent(
    params: Types.GetCorporationKillmailsRecentParams
  ): Promise<Types.EsiResponse<Types.GetCorporationKillmailsRecentResponse>> {
    const path = `/corporations/${params.corporation_id}/killmails/recent`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationKillmailsRecentResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns a corporation's medals

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedals
   */
  async getCorporationMedals(
    params: Types.GetCorporationMedalsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMedalsResponse>> {
    const path = `/corporations/${params.corporation_id}/medals`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationMedalsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns medals issued by a corporation

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMedalsIssued
   */
  async getCorporationMedalsIssued(
    params: Types.GetCorporationMedalsIssuedParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMedalsIssuedResponse>> {
    const path = `/corporations/${params.corporation_id}/medals/issued`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationMedalsIssuedResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return the current member list of a corporation, the token's character need to be a member of the corporation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembers
   */
  async getCorporationMembers(
    params: Types.GetCorporationMembersParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMembersResponse>> {
    const path = `/corporations/${params.corporation_id}/members`
    return this.request<Types.GetCorporationMembersResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a corporation's member limit, not including CEO himself

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersLimit
   */
  async getCorporationMembersLimit(
    params: Types.GetCorporationMembersLimitParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMembersLimitResponse>> {
    const path = `/corporations/${params.corporation_id}/members/limit`
    return this.request<Types.GetCorporationMembersLimitResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns a corporation's members' titles

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembersTitles
   */
  async getCorporationMembersTitles(
    params: Types.GetCorporationMembersTitlesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMembersTitlesResponse>> {
    const path = `/corporations/${params.corporation_id}/members/titles`
    return this.request<Types.GetCorporationMembersTitlesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns additional information about a corporation's members which helps tracking their activities

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdMembertracking
   */
  async getCorporationMembertracking(
    params: Types.GetCorporationMembertrackingParams
  ): Promise<Types.EsiResponse<Types.GetCorporationMembertrackingResponse>> {
    const path = `/corporations/${params.corporation_id}/membertracking`
    return this.request<Types.GetCorporationMembertrackingResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List open market orders placed on behalf of a corporation

   * Requires one of the following EVE corporation role(s): Accountant, Trader

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrders
   */
  async getCorporationOrders(
    params: Types.GetCorporationOrdersParams
  ): Promise<Types.EsiResponse<Types.GetCorporationOrdersResponse>> {
    const path = `/corporations/${params.corporation_id}/orders`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationOrdersResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * List cancelled and expired market orders placed on behalf of a corporation up to 90 days in the past.

   * Requires one of the following EVE corporation role(s): Accountant, Trader

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdOrdersHistory
   */
  async getCorporationOrdersHistory(
    params: Types.GetCorporationOrdersHistoryParams
  ): Promise<Types.EsiResponse<Types.GetCorporationOrdersHistoryResponse>> {
    const path = `/corporations/${params.corporation_id}/orders/history`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationOrdersHistoryResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return the roles of all members if the character has the personnel manager role or any grantable role.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRoles
   */
  async getCorporationRoles(
    params: Types.GetCorporationRolesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationRolesResponse>> {
    const path = `/corporations/${params.corporation_id}/roles`
    return this.request<Types.GetCorporationRolesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return how roles have changed for a coporation's members, up to a month

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdRolesHistory
   */
  async getCorporationRolesHistory(
    params: Types.GetCorporationRolesHistoryParams
  ): Promise<Types.EsiResponse<Types.GetCorporationRolesHistoryResponse>> {
    const path = `/corporations/${params.corporation_id}/roles/history`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationRolesHistoryResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return the current shareholders of a corporation.

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdShareholders
   */
  async getCorporationShareholders(
    params: Types.GetCorporationShareholdersParams
  ): Promise<Types.EsiResponse<Types.GetCorporationShareholdersResponse>> {
    const path = `/corporations/${params.corporation_id}/shareholders`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationShareholdersResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return corporation standings from agents, NPC corporations, and factions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStandings
   */
  async getCorporationStandings(
    params: Types.GetCorporationStandingsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationStandingsResponse>> {
    const path = `/corporations/${params.corporation_id}/standings`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationStandingsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns list of corporation starbases (POSes)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbases
   */
  async getCorporationStarbases(
    params: Types.GetCorporationStarbasesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationStarbasesResponse>> {
    const path = `/corporations/${params.corporation_id}/starbases`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationStarbasesResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns various settings and fuels of a starbase (POS)

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStarbasesStarbaseId
   */
  async getCorporationStarbase(
    params: Types.GetCorporationStarbaseParams
  ): Promise<Types.EsiResponse<Types.GetCorporationStarbaseResponse>> {
    const path = `/corporations/${params.corporation_id}/starbases/${params.starbase_id}`
    const queryParams = { system_id: params.system_id }
    return this.request<Types.GetCorporationStarbaseResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-2.0-structures-changes-coming-on-february-13th

   * Requires one of the following EVE corporation role(s): Station_Manager

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdStructures
   */
  async getCorporationStructures(
    params: Types.GetCorporationStructuresParams
  ): Promise<Types.EsiResponse<Types.GetCorporationStructuresResponse>> {
    const path = `/corporations/${params.corporation_id}/structures`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationStructuresResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns a corporation's titles

   * Requires one of the following EVE corporation role(s): Director

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdTitles
   */
  async getCorporationTitles(
    params: Types.GetCorporationTitlesParams
  ): Promise<Types.EsiResponse<Types.GetCorporationTitlesResponse>> {
    const path = `/corporations/${params.corporation_id}/titles`
    return this.request<Types.GetCorporationTitlesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a corporation's wallets

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWallets
   */
  async getCorporationWallets(
    params: Types.GetCorporationWalletsParams
  ): Promise<Types.EsiResponse<Types.GetCorporationWalletsResponse>> {
    const path = `/corporations/${params.corporation_id}/wallets`
    return this.request<Types.GetCorporationWalletsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Retrieve the given corporation's wallet journal for the given division going 30 days back

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionJournal
   */
  async getCorporationWalletsDivisionJournal(
    params: Types.GetCorporationWalletsDivisionJournalParams
  ): Promise<
    Types.EsiResponse<Types.GetCorporationWalletsDivisionJournalResponse>
  > {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/journal`
    const queryParams = { page: params.page }
    return this.request<Types.GetCorporationWalletsDivisionJournalResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get wallet transactions of a corporation

   * Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionTransactions
   */
  async getCorporationWalletsDivisionTransactions(
    params: Types.GetCorporationWalletsDivisionTransactionsParams
  ): Promise<
    Types.EsiResponse<Types.GetCorporationWalletsDivisionTransactionsResponse>
  > {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/transactions`
    const queryParams = { from_id: params.from_id }
    return this.request<Types.GetCorporationWalletsDivisionTransactionsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get a list of dogma attribute ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributes
   */
  async getDogmaAttributes(): Promise<
    Types.EsiResponse<Types.GetDogmaAttributesResponse>
  > {
    const path = `/dogma/attributes`
    return this.request<Types.GetDogmaAttributesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a dogma attribute

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaAttributesAttributeId
   */
  async getDogmaAttribute(
    params: Types.GetDogmaAttributeParams
  ): Promise<Types.EsiResponse<Types.GetDogmaAttributeResponse>> {
    const path = `/dogma/attributes/${params.attribute_id}`
    return this.request<Types.GetDogmaAttributeResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Returns info about a dynamic item resulting from mutation with a mutaplasmid.

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaDynamicItemsTypeIdItemId
   */
  async getDogmaDynamicTypeItemId(
    params: Types.GetDogmaDynamicTypeItemIdParams
  ): Promise<Types.EsiResponse<Types.GetDogmaDynamicTypeItemIdResponse>> {
    const path = `/dogma/dynamic/items/${params.type_id}/${params.item_id}`
    return this.request<Types.GetDogmaDynamicTypeItemIdResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of dogma effect ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffects
   */
  async getDogmaEffects(): Promise<
    Types.EsiResponse<Types.GetDogmaEffectsResponse>
  > {
    const path = `/dogma/effects`
    return this.request<Types.GetDogmaEffectsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a dogma effect

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetDogmaEffectsEffectId
   */
  async getDogmaEffect(
    params: Types.GetDogmaEffectParams
  ): Promise<Types.EsiResponse<Types.GetDogmaEffectResponse>> {
    const path = `/dogma/effects/${params.effect_id}`
    return this.request<Types.GetDogmaEffectResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return details about a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetId
   */
  async getFleet(
    params: Types.GetFleetParams
  ): Promise<Types.EsiResponse<Types.GetFleetResponse>> {
    const path = `/fleets/${params.fleet_id}`
    return this.request<Types.GetFleetResponse>(
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
  async putFleet(
    params: Types.PutFleetParams
  ): Promise<Types.EsiResponse<Types.PutFleetResponse>> {
    const path = `/fleets/${params.fleet_id}`
    const body = { is_free_move: params.is_free_move, motd: params.motd }
    return this.request<Types.PutFleetResponse>('PUT', path, undefined, body)
  }

  /**
   * Return information about fleet members

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdMembers
   */
  async getFleetMembers(
    params: Types.GetFleetMembersParams
  ): Promise<Types.EsiResponse<Types.GetFleetMembersResponse>> {
    const path = `/fleets/${params.fleet_id}/members`
    return this.request<Types.GetFleetMembersResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Invite a character into the fleet. If a character has a CSPA charge set it is not possible to invite them to the fleet using ESI

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdMembers
   */
  async postFleetMembers(
    params: Types.PostFleetMembersParams
  ): Promise<Types.EsiResponse<Types.PostFleetMembersResponse>> {
    const path = `/fleets/${params.fleet_id}/members`
    const body = {
      character_id: params.character_id,
      role: params.role,
      squad_id: params.squad_id,
      wing_id: params.wing_id,
    }
    return this.request<Types.PostFleetMembersResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Kick a fleet member

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdMembersMemberId
   */
  async deleteFleetMember(
    params: Types.DeleteFleetMemberParams
  ): Promise<Types.EsiResponse<Types.DeleteFleetMemberResponse>> {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    return this.request<Types.DeleteFleetMemberResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Move a fleet member around

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdMembersMemberId
   */
  async putFleetMember(
    params: Types.PutFleetMemberParams
  ): Promise<Types.EsiResponse<Types.PutFleetMemberResponse>> {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    const body = {
      role: params.role,
      squad_id: params.squad_id,
      wing_id: params.wing_id,
    }
    return this.request<Types.PutFleetMemberResponse>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Delete a fleet squad, only empty squads can be deleted

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdSquadsSquadId
   */
  async deleteFleetSquad(
    params: Types.DeleteFleetSquadParams
  ): Promise<Types.EsiResponse<Types.DeleteFleetSquadResponse>> {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    return this.request<Types.DeleteFleetSquadResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Rename a fleet squad

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdSquadsSquadId
   */
  async putFleetSquad(
    params: Types.PutFleetSquadParams
  ): Promise<Types.EsiResponse<Types.PutFleetSquadResponse>> {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    const body = { name: params.name }
    return this.request<Types.PutFleetSquadResponse>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Return information about wings in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFleetsFleetIdWings
   */
  async getFleetWings(
    params: Types.GetFleetWingsParams
  ): Promise<Types.EsiResponse<Types.GetFleetWingsResponse>> {
    const path = `/fleets/${params.fleet_id}/wings`
    return this.request<Types.GetFleetWingsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Create a new wing in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWings
   */
  async postFleetWings(
    params: Types.PostFleetWingsParams
  ): Promise<Types.EsiResponse<Types.PostFleetWingsResponse>> {
    const path = `/fleets/${params.fleet_id}/wings`
    return this.request<Types.PostFleetWingsResponse>(
      'POST',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Delete a fleet wing, only empty wings can be deleted. The wing may contain squads, but the squads must be empty

   * @see https://developers.eveonline.com/api-explorer#/operations/DeleteFleetsFleetIdWingsWingId
   */
  async deleteFleetWing(
    params: Types.DeleteFleetWingParams
  ): Promise<Types.EsiResponse<Types.DeleteFleetWingResponse>> {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}`
    return this.request<Types.DeleteFleetWingResponse>(
      'DELETE',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Rename a fleet wing

   * @see https://developers.eveonline.com/api-explorer#/operations/PutFleetsFleetIdWingsWingId
   */
  async putFleetWing(
    params: Types.PutFleetWingParams
  ): Promise<Types.EsiResponse<Types.PutFleetWingResponse>> {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}`
    const body = { name: params.name }
    return this.request<Types.PutFleetWingResponse>(
      'PUT',
      path,
      undefined,
      body
    )
  }

  /**
   * Create a new squad in a fleet

   * @see https://developers.eveonline.com/api-explorer#/operations/PostFleetsFleetIdWingsWingIdSquads
   */
  async postFleetWingSquads(
    params: Types.PostFleetWingSquadsParams
  ): Promise<Types.EsiResponse<Types.PostFleetWingSquadsResponse>> {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}/squads`
    return this.request<Types.PostFleetWingSquadsResponse>(
      'POST',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboards
   */
  async getFwLeaderboards(): Promise<
    Types.EsiResponse<Types.GetFwLeaderboardsResponse>
  > {
    const path = `/fw/leaderboards`
    return this.request<Types.GetFwLeaderboardsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCharacters
   */
  async getFwLeaderboardsCharacters(): Promise<
    Types.EsiResponse<Types.GetFwLeaderboardsCharactersResponse>
  > {
    const path = `/fw/leaderboards/characters`
    return this.request<Types.GetFwLeaderboardsCharactersResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Top 10 leaderboard of corporations for kills and victory points separated by total, last week and yesterday

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwLeaderboardsCorporations
   */
  async getFwLeaderboardsCorporations(): Promise<
    Types.EsiResponse<Types.GetFwLeaderboardsCorporationsResponse>
  > {
    const path = `/fw/leaderboards/corporations`
    return this.request<Types.GetFwLeaderboardsCorporationsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Statistical overviews of factions involved in faction warfare

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwStats
   */
  async getFwStats(): Promise<Types.EsiResponse<Types.GetFwStatsResponse>> {
    const path = `/fw/stats`
    return this.request<Types.GetFwStatsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * An overview of the current ownership of faction warfare solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwSystems
   */
  async getFwSystems(): Promise<Types.EsiResponse<Types.GetFwSystemsResponse>> {
    const path = `/fw/systems`
    return this.request<Types.GetFwSystemsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Data about which NPC factions are at war

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFwWars
   */
  async getFwWars(): Promise<Types.EsiResponse<Types.GetFwWarsResponse>> {
    const path = `/fw/wars`
    return this.request<Types.GetFwWarsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of current incursions

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIncursions
   */
  async getIncursions(): Promise<
    Types.EsiResponse<Types.GetIncursionsResponse>
  > {
    const path = `/incursions`
    return this.request<Types.GetIncursionsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of industry facilities

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIndustryFacilities
   */
  async getIndustryFacilities(): Promise<
    Types.EsiResponse<Types.GetIndustryFacilitiesResponse>
  > {
    const path = `/industry/facilities`
    return this.request<Types.GetIndustryFacilitiesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return cost indices for solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetIndustrySystems
   */
  async getIndustrySystems(): Promise<
    Types.EsiResponse<Types.GetIndustrySystemsResponse>
  > {
    const path = `/industry/systems`
    return this.request<Types.GetIndustrySystemsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return available insurance levels for all ship types

   * @see https://developers.eveonline.com/api-explorer#/operations/GetInsurancePrices
   */
  async getInsurancePrices(): Promise<
    Types.EsiResponse<Types.GetInsurancePricesResponse>
  > {
    const path = `/insurance/prices`
    return this.request<Types.GetInsurancePricesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a single killmail from its ID and hash

   * @see https://developers.eveonline.com/api-explorer#/operations/GetKillmailsKillmailIdKillmailHash
   */
  async getKillmailKillmailHash(
    params: Types.GetKillmailKillmailHashParams
  ): Promise<Types.EsiResponse<Types.GetKillmailKillmailHashResponse>> {
    const path = `/killmails/${params.killmail_id}/${params.killmail_hash}`
    return this.request<Types.GetKillmailKillmailHashResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of offers from a specific corporation's loyalty store

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetLoyaltyStoresCorporationIdOffers
   */
  async getLoyaltyCorporationOffers(
    params: Types.GetLoyaltyCorporationOffersParams
  ): Promise<Types.EsiResponse<Types.GetLoyaltyCorporationOffersResponse>> {
    const path = `/loyalty/stores/${params.corporation_id}/offers`
    return this.request<Types.GetLoyaltyCorporationOffersResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of item groups

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroups
   */
  async getMarketsGroups(): Promise<
    Types.EsiResponse<Types.GetMarketsGroupsResponse>
  > {
    const path = `/markets/groups`
    return this.request<Types.GetMarketsGroupsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on an item group

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsGroupsMarketGroupId
   */
  async getMarketsGroupsMarketGroupId(
    params: Types.GetMarketsGroupsMarketGroupIdParams
  ): Promise<Types.EsiResponse<Types.GetMarketsGroupsMarketGroupIdResponse>> {
    const path = `/markets/groups/${params.market_group_id}`
    return this.request<Types.GetMarketsGroupsMarketGroupIdResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of prices

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsPrices
   */
  async getMarketsPrices(): Promise<
    Types.EsiResponse<Types.GetMarketsPricesResponse>
  > {
    const path = `/markets/prices`
    return this.request<Types.GetMarketsPricesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return all orders in a structure

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsStructuresStructureId
   */
  async getMarketsStructure(
    params: Types.GetMarketsStructureParams
  ): Promise<Types.EsiResponse<Types.GetMarketsStructureResponse>> {
    const path = `/markets/structures/${params.structure_id}`
    const queryParams = { page: params.page }
    return this.request<Types.GetMarketsStructureResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return a list of historical market statistics for the specified type in a region

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdHistory
   */
  async getRegionHistory(
    params: Types.GetRegionHistoryParams
  ): Promise<Types.EsiResponse<Types.GetRegionHistoryResponse>> {
    const path = `/markets/${params.region_id}/history`
    const queryParams = { type_id: params.type_id }
    return this.request<Types.GetRegionHistoryResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return a list of orders in a region

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdOrders
   */
  async getRegionOrders(
    params: Types.GetRegionOrdersParams
  ): Promise<Types.EsiResponse<Types.GetRegionOrdersResponse>> {
    const path = `/markets/${params.region_id}/orders`
    const queryParams = {
      order_type: params.order_type,
      page: params.page,
      type_id: params.type_id,
    }
    return this.request<Types.GetRegionOrdersResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Return a list of type IDs that have active orders in the region, for efficient market indexing.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMarketsRegionIdTypes
   */
  async getRegionTypes(
    params: Types.GetRegionTypesParams
  ): Promise<Types.EsiResponse<Types.GetRegionTypesResponse>> {
    const path = `/markets/${params.region_id}/types`
    const queryParams = { page: params.page }
    return this.request<Types.GetRegionTypesResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get the systems between origin and destination

   * @see https://developers.eveonline.com/api-explorer#/operations/GetRouteOriginDestination
   */
  async getRouteOriginDestination(
    params: Types.GetRouteOriginDestinationParams
  ): Promise<Types.EsiResponse<Types.GetRouteOriginDestinationResponse>> {
    const path = `/route/${params.origin}/${params.destination}`
    const queryParams = {
      avoid: params.avoid,
      connections: params.connections,
      flag: params.flag,
    }
    return this.request<Types.GetRouteOriginDestinationResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Shows sovereignty data for campaigns.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyCampaigns
   */
  async getSovereigntyCampaigns(): Promise<
    Types.EsiResponse<Types.GetSovereigntyCampaignsResponse>
  > {
    const path = `/sovereignty/campaigns`
    return this.request<Types.GetSovereigntyCampaignsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Shows sovereignty information for solar systems

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyMap
   */
  async getSovereigntyMap(): Promise<
    Types.EsiResponse<Types.GetSovereigntyMapResponse>
  > {
    const path = `/sovereignty/map`
    return this.request<Types.GetSovereigntyMapResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Shows sovereignty data for structures.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntyStructures
   */
  async getSovereigntyStructures(): Promise<
    Types.EsiResponse<Types.GetSovereigntyStructuresResponse>
  > {
    const path = `/sovereignty/structures`
    return this.request<Types.GetSovereigntyStructuresResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * EVE Server status

   * @see https://developers.eveonline.com/api-explorer#/operations/GetStatus
   */
  async getStatus(): Promise<Types.EsiResponse<Types.GetStatusResponse>> {
    const path = `/status`
    return this.request<Types.GetStatusResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Set a solar system as autopilot waypoint

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiAutopilotWaypoint
   */
  async postUiAutopilotWaypoint(
    params?: Types.PostUiAutopilotWaypointParams
  ): Promise<Types.EsiResponse<Types.PostUiAutopilotWaypointResponse>> {
    const path = `/ui/autopilot/waypoint`
    const queryParams = params
      ? {
          add_to_beginning: params.add_to_beginning,
          clear_other_waypoints: params.clear_other_waypoints,
          destination_id: params.destination_id,
        }
      : undefined
    return this.request<Types.PostUiAutopilotWaypointResponse>(
      'POST',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Open the contract window inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowContract
   */
  async postUiOpenwindowContract(
    params?: Types.PostUiOpenwindowContractParams
  ): Promise<Types.EsiResponse<Types.PostUiOpenwindowContractResponse>> {
    const path = `/ui/openwindow/contract`
    const queryParams = params ? { contract_id: params.contract_id } : undefined
    return this.request<Types.PostUiOpenwindowContractResponse>(
      'POST',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Open the information window for a character, corporation or alliance inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowInformation
   */
  async postUiOpenwindowInformation(
    params?: Types.PostUiOpenwindowInformationParams
  ): Promise<Types.EsiResponse<Types.PostUiOpenwindowInformationResponse>> {
    const path = `/ui/openwindow/information`
    const queryParams = params ? { target_id: params.target_id } : undefined
    return this.request<Types.PostUiOpenwindowInformationResponse>(
      'POST',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Open the market details window for a specific typeID inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowMarketdetails
   */
  async postUiOpenwindowMarketdetails(
    params?: Types.PostUiOpenwindowMarketdetailsParams
  ): Promise<Types.EsiResponse<Types.PostUiOpenwindowMarketdetailsResponse>> {
    const path = `/ui/openwindow/marketdetails`
    const queryParams = params ? { type_id: params.type_id } : undefined
    return this.request<Types.PostUiOpenwindowMarketdetailsResponse>(
      'POST',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Open the New Mail window, according to settings from the request if applicable

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowNewmail
   */
  async postUiOpenwindowNewmail(
    params: Types.PostUiOpenwindowNewmailParams
  ): Promise<Types.EsiResponse<Types.PostUiOpenwindowNewmailResponse>> {
    const path = `/ui/openwindow/newmail`
    const body = {
      body: params.body,
      recipients: params.recipients,
      subject: params.subject,
      to_corp_or_alliance_id: params.to_corp_or_alliance_id,
      to_mailing_list_id: params.to_mailing_list_id,
    }
    return this.request<Types.PostUiOpenwindowNewmailResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Get all character ancestries

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseAncestries
   */
  async getUniverseAncestries(): Promise<
    Types.EsiResponse<Types.GetUniverseAncestriesResponse>
  > {
    const path = `/universe/ancestries`
    return this.request<Types.GetUniverseAncestriesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on an asteroid belt

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseAsteroidBeltsAsteroidBeltId
   */
  async getUniverseAsteroidBeltsAsteroidBeltId(
    params: Types.GetUniverseAsteroidBeltsAsteroidBeltIdParams
  ): Promise<
    Types.EsiResponse<Types.GetUniverseAsteroidBeltsAsteroidBeltIdResponse>
  > {
    const path = `/universe/asteroid_belts/${params.asteroid_belt_id}`
    return this.request<Types.GetUniverseAsteroidBeltsAsteroidBeltIdResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of bloodlines

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseBloodlines
   */
  async getUniverseBloodlines(): Promise<
    Types.EsiResponse<Types.GetUniverseBloodlinesResponse>
  > {
    const path = `/universe/bloodlines`
    return this.request<Types.GetUniverseBloodlinesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of item categories

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategories
   */
  async getUniverseCategories(): Promise<
    Types.EsiResponse<Types.GetUniverseCategoriesResponse>
  > {
    const path = `/universe/categories`
    return this.request<Types.GetUniverseCategoriesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information of an item category

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseCategoriesCategoryId
   */
  async getUniverseCategory(
    params: Types.GetUniverseCategoryParams
  ): Promise<Types.EsiResponse<Types.GetUniverseCategoryResponse>> {
    const path = `/universe/categories/${params.category_id}`
    return this.request<Types.GetUniverseCategoryResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of constellations

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellations
   */
  async getUniverseConstellations(): Promise<
    Types.EsiResponse<Types.GetUniverseConstellationsResponse>
  > {
    const path = `/universe/constellations`
    return this.request<Types.GetUniverseConstellationsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a constellation

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseConstellationsConstellationId
   */
  async getUniverseConstellation(
    params: Types.GetUniverseConstellationParams
  ): Promise<Types.EsiResponse<Types.GetUniverseConstellationResponse>> {
    const path = `/universe/constellations/${params.constellation_id}`
    return this.request<Types.GetUniverseConstellationResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of factions

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseFactions
   */
  async getUniverseFactions(): Promise<
    Types.EsiResponse<Types.GetUniverseFactionsResponse>
  > {
    const path = `/universe/factions`
    return this.request<Types.GetUniverseFactionsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of graphics

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphics
   */
  async getUniverseGraphics(): Promise<
    Types.EsiResponse<Types.GetUniverseGraphicsResponse>
  > {
    const path = `/universe/graphics`
    return this.request<Types.GetUniverseGraphicsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a graphic

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGraphicsGraphicId
   */
  async getUniverseGraphic(
    params: Types.GetUniverseGraphicParams
  ): Promise<Types.EsiResponse<Types.GetUniverseGraphicResponse>> {
    const path = `/universe/graphics/${params.graphic_id}`
    return this.request<Types.GetUniverseGraphicResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of item groups

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroups
   */
  async getUniverseGroups(
    params?: Types.GetUniverseGroupsParams
  ): Promise<Types.EsiResponse<Types.GetUniverseGroupsResponse>> {
    const path = `/universe/groups`
    const queryParams = params ? { page: params.page } : undefined
    return this.request<Types.GetUniverseGroupsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get information on an item group

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseGroupsGroupId
   */
  async getUniverseGroup(
    params: Types.GetUniverseGroupParams
  ): Promise<Types.EsiResponse<Types.GetUniverseGroupResponse>> {
    const path = `/universe/groups/${params.group_id}`
    return this.request<Types.GetUniverseGroupResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 12 hours

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUniverseIds
   */
  async postUniverseIds(
    params: Types.PostUniverseIdsParams
  ): Promise<Types.EsiResponse<Types.PostUniverseIdsResponse>> {
    const path = `/universe/ids`
    const body = params.body
    return this.request<Types.PostUniverseIdsResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Get information on a moon

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseMoonsMoonId
   */
  async getUniverseMoon(
    params: Types.GetUniverseMoonParams
  ): Promise<Types.EsiResponse<Types.GetUniverseMoonResponse>> {
    const path = `/universe/moons/${params.moon_id}`
    return this.request<Types.GetUniverseMoonResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUniverseNames
   */
  async postUniverseNames(
    params: Types.PostUniverseNamesParams
  ): Promise<Types.EsiResponse<Types.PostUniverseNamesResponse>> {
    const path = `/universe/names`
    const body = params.body
    return this.request<Types.PostUniverseNamesResponse>(
      'POST',
      path,
      undefined,
      body
    )
  }

  /**
   * Get information on a planet

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniversePlanetsPlanetId
   */
  async getUniversePlanet(
    params: Types.GetUniversePlanetParams
  ): Promise<Types.EsiResponse<Types.GetUniversePlanetResponse>> {
    const path = `/universe/planets/${params.planet_id}`
    return this.request<Types.GetUniversePlanetResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of character races

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRaces
   */
  async getUniverseRaces(): Promise<
    Types.EsiResponse<Types.GetUniverseRacesResponse>
  > {
    const path = `/universe/races`
    return this.request<Types.GetUniverseRacesResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of regions

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegions
   */
  async getUniverseRegions(): Promise<
    Types.EsiResponse<Types.GetUniverseRegionsResponse>
  > {
    const path = `/universe/regions`
    return this.request<Types.GetUniverseRegionsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a region

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseRegionsRegionId
   */
  async getUniverseRegion(
    params: Types.GetUniverseRegionParams
  ): Promise<Types.EsiResponse<Types.GetUniverseRegionResponse>> {
    const path = `/universe/regions/${params.region_id}`
    return this.request<Types.GetUniverseRegionResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a planetary factory schematic

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSchematicsSchematicId
   */
  async getUniverseSchematic(
    params: Types.GetUniverseSchematicParams
  ): Promise<Types.EsiResponse<Types.GetUniverseSchematicResponse>> {
    const path = `/universe/schematics/${params.schematic_id}`
    return this.request<Types.GetUniverseSchematicResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a stargate

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStargatesStargateId
   */
  async getUniverseStargate(
    params: Types.GetUniverseStargateParams
  ): Promise<Types.EsiResponse<Types.GetUniverseStargateResponse>> {
    const path = `/universe/stargates/${params.stargate_id}`
    return this.request<Types.GetUniverseStargateResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a star

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStarsStarId
   */
  async getUniverseStar(
    params: Types.GetUniverseStarParams
  ): Promise<Types.EsiResponse<Types.GetUniverseStarResponse>> {
    const path = `/universe/stars/${params.star_id}`
    return this.request<Types.GetUniverseStarResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a station

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStationsStationId
   */
  async getUniverseStation(
    params: Types.GetUniverseStationParams
  ): Promise<Types.EsiResponse<Types.GetUniverseStationResponse>> {
    const path = `/universe/stations/${params.station_id}`
    return this.request<Types.GetUniverseStationResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * List all public structures

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructures
   */
  async getUniverseStructures(
    params?: Types.GetUniverseStructuresParams
  ): Promise<Types.EsiResponse<Types.GetUniverseStructuresResponse>> {
    const path = `/universe/structures`
    const queryParams = params ? { filter: params.filter } : undefined
    return this.request<Types.GetUniverseStructuresResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseStructuresStructureId
   */
  async getUniverseStructure(
    params: Types.GetUniverseStructureParams
  ): Promise<Types.EsiResponse<Types.GetUniverseStructureResponse>> {
    const path = `/universe/structures/${params.structure_id}`
    return this.request<Types.GetUniverseStructureResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemJumps
   */
  async getUniverseSystemJumps(): Promise<
    Types.EsiResponse<Types.GetUniverseSystemJumpsResponse>
  > {
    const path = `/universe/system_jumps`
    return this.request<Types.GetUniverseSystemJumpsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemKills
   */
  async getUniverseSystemKills(): Promise<
    Types.EsiResponse<Types.GetUniverseSystemKillsResponse>
  > {
    const path = `/universe/system_kills`
    return this.request<Types.GetUniverseSystemKillsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of solar systems

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystems
   */
  async getUniverseSystems(): Promise<
    Types.EsiResponse<Types.GetUniverseSystemsResponse>
  > {
    const path = `/universe/systems`
    return this.request<Types.GetUniverseSystemsResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get information on a solar system.

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseSystemsSystemId
   */
  async getUniverseSystem(
    params: Types.GetUniverseSystemParams
  ): Promise<Types.EsiResponse<Types.GetUniverseSystemResponse>> {
    const path = `/universe/systems/${params.system_id}`
    return this.request<Types.GetUniverseSystemResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Get a list of type ids

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypes
   */
  async getUniverseTypes(
    params?: Types.GetUniverseTypesParams
  ): Promise<Types.EsiResponse<Types.GetUniverseTypesResponse>> {
    const path = `/universe/types`
    const queryParams = params ? { page: params.page } : undefined
    return this.request<Types.GetUniverseTypesResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }

  /**
   * Get information on a type

   * This route expires daily at 11:05

   * @see https://developers.eveonline.com/api-explorer#/operations/GetUniverseTypesTypeId
   */
  async getUniverseType(
    params: Types.GetUniverseTypeParams
  ): Promise<Types.EsiResponse<Types.GetUniverseTypeResponse>> {
    const path = `/universe/types/${params.type_id}`
    return this.request<Types.GetUniverseTypeResponse>(
      'GET',
      path,
      undefined,
      undefined
    )
  }

  /**
   * Return a list of wars

   * @see https://developers.eveonline.com/api-explorer#/operations/GetWars
   */
  async getWars(
    params?: Types.GetWarsParams
  ): Promise<Types.EsiResponse<Types.GetWarsResponse>> {
    const path = `/wars`
    const queryParams = params ? { max_war_id: params.max_war_id } : undefined
    return this.request<Types.GetWarsResponse>(
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
  async getWar(
    params: Types.GetWarParams
  ): Promise<Types.EsiResponse<Types.GetWarResponse>> {
    const path = `/wars/${params.war_id}`
    return this.request<Types.GetWarResponse>('GET', path, undefined, undefined)
  }

  /**
   * Return a list of kills related to a war

   * @see https://developers.eveonline.com/api-explorer#/operations/GetWarsWarIdKillmails
   */
  async getWarKillmails(
    params: Types.GetWarKillmailsParams
  ): Promise<Types.EsiResponse<Types.GetWarKillmailsResponse>> {
    const path = `/wars/${params.war_id}/killmails`
    const queryParams = { page: params.page }
    return this.request<Types.GetWarKillmailsResponse>(
      'GET',
      path,
      queryParams,
      undefined
    )
  }
}

export default EsiClient
