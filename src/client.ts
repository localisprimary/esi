// Auto-generated API client for EVE ESI API
/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as Types from './types.js'
import {
  createCacheEntry,
  createCacheKey,
  esiMemoryCache,
  isFresh,
  refreshCacheEntry,
} from './cache.js'

const COMPATIBILITY_DATE = '2026-11-19'

export class EsiClient {
  private readonly baseUrl: string = 'https://esi.evetech.net'
  private readonly userAgent: string = 'localisprimary/esi'
  private readonly token?: string
  private readonly useRequestHeaders: boolean
  private readonly cacheEnabled: boolean

  constructor(options: {
    userAgent: string
    token?: string
    useRequestHeaders?: boolean
    cache?: boolean
  }) {
    this.token = options.token
    this.useRequestHeaders = options.useRequestHeaders ?? true
    this.cacheEnabled = options.cache ?? true

    if (options.userAgent?.length) {
      this.userAgent += ` ${options.userAgent}`
    } else {
      throw new Error(
        '@localisprimary/esi: No user agent provided to constructor'
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

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          const values = Array.isArray(value) ? value : [value]
          values.forEach(item => url.searchParams.append(key, String(item)))
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

    const getResponse = async (etag?: string) => {
      const requestHeaders = etag
        ? { ...headers, 'If-None-Match': etag }
        : headers
      const response = await fetch(url.toString(), {
        method,
        headers: this.useRequestHeaders ? requestHeaders : undefined,
        body: body === undefined ? undefined : JSON.stringify(body),
      })
      const responseText = await response.text()
      const responseHeaders = Object.fromEntries(
        response.headers.entries()
      ) as Record<string, string>

      if (response.status === 304) {
        return { response, responseText, headers: responseHeaders }
      }

      if (!response.ok) {
        let error = 'Request failed'
        if (responseText) {
          try {
            const errorData = JSON.parse(responseText)
            error = errorData.error || error
          } catch {}
        }
        throw {
          error,
          status: response.status,
        } as Types.EsiError
      }

      return { response, responseText, headers: responseHeaders }
    }

    if (method === 'GET' && this.cacheEnabled) {
      const key = await createCacheKey(
        url.toString(),
        COMPATIBILITY_DATE,
        this.token
      )
      const cached = esiMemoryCache.get(key)
      if (cached && isFresh(cached)) {
        return cached.response as Types.EsiResponse<TData, THeaders>
      }

      const result = await esiMemoryCache.getOrCreate(key, async () => {
        const existing = esiMemoryCache.get(key)
        if (existing && isFresh(existing)) return existing.response

        const fetched = await getResponse(existing?.etag)
        if (fetched.response.status === 304 && existing) {
          const refreshed = refreshCacheEntry(existing, fetched.headers)
          if (refreshed) {
            esiMemoryCache.set(key, refreshed)
            return refreshed.response
          }
          esiMemoryCache.delete(key)
          return existing.response
        }

        if (fetched.response.status === 304) {
          throw {
            error: 'Received 304 Not Modified without a cached response',
            status: 304,
          } as Types.EsiError
        }

        const response = {
          data: fetched.responseText
            ? JSON.parse(fetched.responseText)
            : undefined,
          status: fetched.response.status,
          headers: fetched.headers,
        }
        const entry = createCacheEntry(response)
        if (entry) esiMemoryCache.set(key, entry)
        return response
      })

      return result as Types.EsiResponse<TData, THeaders>
    }

    const fetched = await getResponse()
    const data = fetched.responseText
      ? JSON.parse(fetched.responseText)
      : undefined

    return {
      data: data as TData,
      status: fetched.response.status,
      headers: fetched.headers as THeaders,
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

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersDetail
   */
  async getCharacter(params: Types.GetCharacterParams) {
    const path = `/characters/${params.character_id}`
    return this.request<
      Types.GetCharacterResponse,
      Types.GetCharacterResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Lists all Access Lists the character is Manager or Admin of.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersAccessListsListing
   */
  async getCharacterAccessLists(params: Types.GetCharacterAccessListsParams) {
    const path = `/characters/${params.character_id}/access-lists`
    return this.request<
      Types.GetCharacterAccessListsResponse,
      Types.GetCharacterAccessListsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of an Access List.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersAccessListsDetail
   */
  async getCharacterAccessList(params: Types.GetCharacterAccessListParams) {
    const path = `/characters/${params.character_id}/access-lists/${params.access_list_id}`
    return this.request<
      Types.GetCharacterAccessListResponse,
      Types.GetCharacterAccessListResponseHeaders
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
  async getCharacterCalendarEvent(
    params: Types.GetCharacterCalendarEventParams
  ) {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    return this.request<
      Types.GetCharacterCalendarEventResponse,
      Types.GetCharacterCalendarEventResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Set your response status to an event

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdCalendarEventId
   */
  async putCharacterCalendarEvent(
    params: Types.PutCharacterCalendarEventParams
  ) {
    const path = `/characters/${params.character_id}/calendar/${params.event_id}`
    const body = { response: params.response }
    return this.request<
      undefined,
      Types.PutCharacterCalendarEventResponseHeaders
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
      undefined,
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
    return this.request<undefined, Types.PutCharacterContactsResponseHeaders>(
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
   * Listing of all SKINR licenses you own

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCosmeticsSkinr
   */
  async getCharacterCosmeticsSkinr(
    params: Types.GetCharacterCosmeticsSkinrParams
  ) {
    const path = `/characters/${params.character_id}/cosmetics/skinr`
    return this.request<
      Types.GetCharacterCosmeticsSkinrResponse,
      Types.GetCharacterCosmeticsSkinrResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all SKINR component licenses you own

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCosmeticsSkinrComponents
   */
  async getCharacterCosmeticsSkinrComponents(
    params: Types.GetCharacterCosmeticsSkinrComponentsParams
  ) {
    const path = `/characters/${params.character_id}/cosmetics/skinr/components`
    return this.request<
      Types.GetCharacterCosmeticsSkinrComponentsResponse,
      Types.GetCharacterCosmeticsSkinrComponentsResponseHeaders
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
    return this.request<undefined, Types.DeleteCharacterFittingResponseHeaders>(
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
  async getCharacterFleet(params: Types.GetCharacterFleetParams) {
    const path = `/characters/${params.character_id}/fleet`
    return this.request<
      Types.GetCharacterFleetResponse,
      Types.GetCharacterFleetResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all freelance jobs you are actively participating in.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersFreelanceJobsListing
   */
  async getCharacterFreelanceJobs(
    params: Types.GetCharacterFreelanceJobsParams
  ) {
    const path = `/characters/${params.character_id}/freelance-jobs`
    return this.request<
      Types.GetCharacterFreelanceJobsResponse,
      Types.GetCharacterFreelanceJobsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Show your participation in a freelance job.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersFreelanceJobsParticipation
   */
  async getCharacterFreelanceJobParticipation(
    params: Types.GetCharacterFreelanceJobParticipationParams
  ) {
    const path = `/characters/${params.character_id}/freelance-jobs/${params.job_id}/participation`
    return this.request<
      Types.GetCharacterFreelanceJobParticipationResponse,
      Types.GetCharacterFreelanceJobParticipationResponseHeaders
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
   * Get the current location of a character, including the station or structure it is docked in.

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
      undefined,
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
  async deleteCharacterMailMessage(
    params: Types.DeleteCharacterMailMessageParams
  ) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<
      undefined,
      Types.DeleteCharacterMailMessageResponseHeaders
    >('DELETE', path, undefined, undefined)
  }

  /**
   * Return the contents of an EVE mail

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersCharacterIdMailMailId
   */
  async getCharacterMailMessage(params: Types.GetCharacterMailMessageParams) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    return this.request<
      Types.GetCharacterMailMessageResponse,
      Types.GetCharacterMailMessageResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Update metadata about a mail

   * @see https://developers.eveonline.com/api-explorer#/operations/PutCharactersCharacterIdMailMailId
   */
  async putCharacterMailMessage(params: Types.PutCharacterMailMessageParams) {
    const path = `/characters/${params.character_id}/mail/${params.mail_id}`
    const body = { labels: params.labels, read: params.read }
    return this.request<
      undefined,
      Types.PutCharacterMailMessageResponseHeaders
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
   * Listing of all Mercenary Tactical Operations for the character.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersMercenaryTacticalOperationsListing
   */
  async getCharacterMercenaryTacticalOperations(
    params: Types.GetCharacterMercenaryTacticalOperationsParams
  ) {
    const path = `/characters/${params.character_id}/mercenary-tactical-operations`
    return this.request<
      Types.GetCharacterMercenaryTacticalOperationsResponse,
      Types.GetCharacterMercenaryTacticalOperationsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of a Mercenary Tactical Operation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersMercenaryTacticalOperationsDetail
   */
  async getCharacterMercenaryTacticalOperation(
    params: Types.GetCharacterMercenaryTacticalOperationParams
  ) {
    const path = `/characters/${params.character_id}/mercenary-tactical-operations/${params.operation_id}`
    return this.request<
      Types.GetCharacterMercenaryTacticalOperationResponse,
      Types.GetCharacterMercenaryTacticalOperationResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of the military campaign objectives the character has participated in.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersMilitaryCampaignsObjectivesListing
   */
  async getCharacterMilitaryCampaignsObjectives(
    params: Types.GetCharacterMilitaryCampaignsObjectivesParams
  ) {
    const path = `/characters/${params.character_id}/military-campaigns/objectives`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetCharacterMilitaryCampaignsObjectivesResponse,
      Types.GetCharacterMilitaryCampaignsObjectivesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Show your participation in a military campaign objective.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersMilitaryCampaignsObjectivesParticipation
   */
  async getCharacterMilitaryCampaignsObjectiveParticipation(
    params: Types.GetCharacterMilitaryCampaignsObjectiveParticipationParams
  ) {
    const path = `/characters/${params.character_id}/military-campaigns/objectives/${params.objective_id}`
    return this.request<
      Types.GetCharacterMilitaryCampaignsObjectiveParticipationResponse,
      Types.GetCharacterMilitaryCampaignsObjectiveParticipationResponseHeaders
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
   * Get whether a character is online, and its login statistics.

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
   * List the SKINR listings a character has posted on the Paragon Hub.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersParagonHubSkinr
   */
  async getCharacterParagonHubSkinr(
    params: Types.GetCharacterParagonHubSkinrParams
  ) {
    const path = `/characters/${params.character_id}/paragon-hub/skinr`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetCharacterParagonHubSkinrResponse,
      Types.GetCharacterParagonHubSkinrResponseHeaders
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
   * Get the ship a character is currently in.

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
   * List the configured skill queue for the given character.

   * Entries that have their finish time in the past are completed, but aren't updated in the "/skills" route
yet. This will happen the next time the character logs in.

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
   * List all trained skills for the given character.

   * Skills returned by this route can be out-of-date if the character hasn't logged in since one or more skills
completed training. Use the /skillqueue route to check for skills that completed training. Entries that are
in the past need to be applied on top of this list to get an accurate view of the character's current skills.

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
   * Listing of all Mercenary Dens.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersStructuresMercenaryDensListing
   */
  async getCharacterStructuresMercenaryDens(
    params: Types.GetCharacterStructuresMercenaryDensParams
  ) {
    const path = `/characters/${params.character_id}/structures/mercenary-dens`
    return this.request<
      Types.GetCharacterStructuresMercenaryDensResponse,
      Types.GetCharacterStructuresMercenaryDensResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of a Mercenary Den.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCharactersStructuresMercenaryDensDetail
   */
  async getCharacterStructuresMercenaryDen(
    params: Types.GetCharacterStructuresMercenaryDenParams
  ) {
    const path = `/characters/${params.character_id}/structures/mercenary-dens/${params.mercenary_den_id}`
    return this.request<
      Types.GetCharacterStructuresMercenaryDenResponse,
      Types.GetCharacterStructuresMercenaryDenResponseHeaders
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
  async getContractsPublicRegion(params: Types.GetContractsPublicRegionParams) {
    const path = `/contracts/public/${params.region_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetContractsPublicRegionResponse,
      Types.GetContractsPublicRegionResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningExtractions
   */
  async getCorporationMiningExtractions(
    params: Types.GetCorporationMiningExtractionsParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/extractions`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationMiningExtractionsResponse,
      Types.GetCorporationMiningExtractionsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Paginated list of all entities capable of observing and recording mining for a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObservers
   */
  async getCorporationMiningObservers(
    params: Types.GetCorporationMiningObserversParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/observers`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationMiningObserversResponse,
      Types.GetCorporationMiningObserversResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Paginated record of all mining seen by an observer

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationCorporationIdMiningObserversObserverId
   */
  async getCorporationMiningObserver(
    params: Types.GetCorporationMiningObserverParams
  ) {
    const path = `/corporation/${params.corporation_id}/mining/observers/${params.observer_id}`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationMiningObserverResponse,
      Types.GetCorporationMiningObserverResponseHeaders
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
   * Listing of all freelance jobs for your corporation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsFreelanceJobsListing
   */
  async getCorporationFreelanceJobs(
    params: Types.GetCorporationFreelanceJobsParams
  ) {
    const path = `/corporations/${params.corporation_id}/freelance-jobs`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetCorporationFreelanceJobsResponse,
      Types.GetCorporationFreelanceJobsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Listing of all participants of a freelance job.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsFreelanceJobsParticipants
   */
  async getCorporationFreelanceJobParticipants(
    params: Types.GetCorporationFreelanceJobParticipantsParams
  ) {
    const path = `/corporations/${params.corporation_id}/freelance-jobs/${params.job_id}/participants`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetCorporationFreelanceJobParticipantsResponse,
      Types.GetCorporationFreelanceJobParticipantsResponseHeaders
    >('GET', path, queryParams, undefined)
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
   * Listing of all (active) corporation projects.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsProjectsListing
   */
  async getCorporationProjects(params: Types.GetCorporationProjectsParams) {
    const path = `/corporations/${params.corporation_id}/projects`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
      state: params.state,
    }
    return this.request<
      Types.GetCorporationProjectsResponse,
      Types.GetCorporationProjectsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get the details of a corporation project.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsProjectsDetail
   */
  async getCorporationProject(params: Types.GetCorporationProjectParams) {
    const path = `/corporations/${params.corporation_id}/projects/${params.project_id}`
    return this.request<
      Types.GetCorporationProjectResponse,
      Types.GetCorporationProjectResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Show your contribution to a corporation project.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsProjectsContribution
   */
  async getCorporationProjectContribution(
    params: Types.GetCorporationProjectContributionParams
  ) {
    const path = `/corporations/${params.corporation_id}/projects/${params.project_id}/contribution/${params.character_id}`
    return this.request<
      Types.GetCorporationProjectContributionResponse,
      Types.GetCorporationProjectContributionResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all contributors to a corporation project.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsProjectsContributors
   */
  async getCorporationProjectContributors(
    params: Types.GetCorporationProjectContributorsParams
  ) {
    const path = `/corporations/${params.corporation_id}/projects/${params.project_id}/contributors`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetCorporationProjectContributorsResponse,
      Types.GetCorporationProjectContributorsResponseHeaders
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
   * Listing of all Skyhooks.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsStructuresSkyhooksListing
   */
  async getCorporationStructuresSkyhooks(
    params: Types.GetCorporationStructuresSkyhooksParams
  ) {
    const path = `/corporations/${params.corporation_id}/structures/skyhooks`
    return this.request<
      Types.GetCorporationStructuresSkyhooksResponse,
      Types.GetCorporationStructuresSkyhooksResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of a Skyhook.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsStructuresSkyhooksDetail
   */
  async getCorporationStructuresSkyhook(
    params: Types.GetCorporationStructuresSkyhookParams
  ) {
    const path = `/corporations/${params.corporation_id}/structures/skyhooks/${params.skyhook_id}`
    return this.request<
      Types.GetCorporationStructuresSkyhookResponse,
      Types.GetCorporationStructuresSkyhookResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all Sovereignty Hubs.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsStructuresSovereigntyHubsListing
   */
  async getCorporationStructuresSovereigntyHubs(
    params: Types.GetCorporationStructuresSovereigntyHubsParams
  ) {
    const path = `/corporations/${params.corporation_id}/structures/sovereignty-hubs`
    return this.request<
      Types.GetCorporationStructuresSovereigntyHubsResponse,
      Types.GetCorporationStructuresSovereigntyHubsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of a Sovereignty Hub.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsStructuresSovereigntyHubsDetail
   */
  async getCorporationStructuresSovereigntyHub(
    params: Types.GetCorporationStructuresSovereigntyHubParams
  ) {
    const path = `/corporations/${params.corporation_id}/structures/sovereignty-hubs/${params.sovereignty_hub_id}`
    return this.request<
      Types.GetCorporationStructuresSovereigntyHubResponse,
      Types.GetCorporationStructuresSovereigntyHubResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Returns a corporation's titles

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

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionJournal
   */
  async getCorporationWalletJournal(
    params: Types.GetCorporationWalletJournalParams
  ) {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/journal`
    const queryParams = { page: params.page }
    return this.request<
      Types.GetCorporationWalletJournalResponse,
      Types.GetCorporationWalletJournalResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get wallet transactions of a corporation

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCorporationsCorporationIdWalletsDivisionTransactions
   */
  async getCorporationWalletTransactions(
    params: Types.GetCorporationWalletTransactionsParams
  ) {
    const path = `/corporations/${params.corporation_id}/wallets/${params.division}/transactions`
    const queryParams = { from_id: params.from_id }
    return this.request<
      Types.GetCorporationWalletTransactionsResponse,
      Types.GetCorporationWalletTransactionsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * All attributes of a SKINR license

   * @see https://developers.eveonline.com/api-explorer#/operations/GetCosmeticsSkinr
   */
  async getCosmeticsSkinr(params: Types.GetCosmeticsSkinrParams) {
    const path = `/cosmetics/skinr/${params.skinr_id}`
    return this.request<
      Types.GetCosmeticsSkinrResponse,
      Types.GetCosmeticsSkinrResponseHeaders
    >('GET', path, undefined, undefined)
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
  async getDogmaDynamicItem(params: Types.GetDogmaDynamicItemParams) {
    const path = `/dogma/dynamic/items/${params.type_id}/${params.item_id}`
    return this.request<
      Types.GetDogmaDynamicItemResponse,
      Types.GetDogmaDynamicItemResponseHeaders
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
    return this.request<undefined, Types.PutFleetResponseHeaders>(
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
    return this.request<undefined, Types.PostFleetMembersResponseHeaders>(
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
  async deleteFleetMember(params: Types.DeleteFleetMemberParams) {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    return this.request<undefined, Types.DeleteFleetMemberResponseHeaders>(
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
  async putFleetMember(params: Types.PutFleetMemberParams) {
    const path = `/fleets/${params.fleet_id}/members/${params.member_id}`
    const body = {
      role: params.role,
      squad_id: params.squad_id,
      wing_id: params.wing_id,
    }
    return this.request<undefined, Types.PutFleetMemberResponseHeaders>(
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
  async deleteFleetSquad(params: Types.DeleteFleetSquadParams) {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    return this.request<undefined, Types.DeleteFleetSquadResponseHeaders>(
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
  async putFleetSquad(params: Types.PutFleetSquadParams) {
    const path = `/fleets/${params.fleet_id}/squads/${params.squad_id}`
    const body = { name: params.name }
    return this.request<undefined, Types.PutFleetSquadResponseHeaders>(
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
    return this.request<undefined, Types.DeleteFleetWingResponseHeaders>(
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
  async putFleetWing(params: Types.PutFleetWingParams) {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}`
    const body = { name: params.name }
    return this.request<undefined, Types.PutFleetWingResponseHeaders>(
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
  async postFleetWingSquads(params: Types.PostFleetWingSquadsParams) {
    const path = `/fleets/${params.fleet_id}/wings/${params.wing_id}/squads`
    return this.request<
      Types.PostFleetWingSquadsResponse,
      Types.PostFleetWingSquadsResponseHeaders
    >('POST', path, undefined, undefined)
  }

  /**
   * Listing of all public freelance jobs.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFreelanceJobsListing
   */
  async getFreelanceJobs(params?: Types.GetFreelanceJobsParams) {
    const path = `/freelance-jobs`
    const queryParams = params
      ? {
          after: params.after,
          before: params.before,
          limit: params.limit,
          corporation_id: params.corporation_id,
        }
      : undefined
    return this.request<
      Types.GetFreelanceJobsResponse,
      Types.GetFreelanceJobsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get the details of a freelance job.

   * Jobs without an ACL (public jobs) does not require authentication.

   * Jobs with an ACL requires authentication, and requires that the character is:
- An active participant of the job, or
- A freelance job manager for the corporation that owns the job.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetFreelanceJobsDetail
   */
  async getFreelanceJob(params: Types.GetFreelanceJobParams) {
    const path = `/freelance-jobs/${params.job_id}`
    return this.request<
      Types.GetFreelanceJobResponse,
      Types.GetFreelanceJobResponseHeaders
    >('GET', path, undefined, undefined)
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
  async getKillmail(params: Types.GetKillmailParams) {
    const path = `/killmails/${params.killmail_id}/${params.killmail_hash}`
    return this.request<
      Types.GetKillmailResponse,
      Types.GetKillmailResponseHeaders
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
  async getMarketsGroup(params: Types.GetMarketsGroupParams) {
    const path = `/markets/groups/${params.market_group_id}`
    return this.request<
      Types.GetMarketsGroupResponse,
      Types.GetMarketsGroupResponseHeaders
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
   * Get the changelog of this API.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMetaChangelog
   */
  async getMetaChangelog() {
    const path = `/meta/changelog`
    return this.request<
      Types.GetMetaChangelogResponse,
      Types.GetMetaChangelogResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get a list of compatibility dates.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMetaCompatibilityDates
   */
  async getMetaCompatibilityDates() {
    const path = `/meta/compatibility-dates`
    return this.request<
      Types.GetMetaCompatibilityDatesResponse,
      Types.GetMetaCompatibilityDatesResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the name ESI is currently going by, plus the full and glorious history of every name it has ever had. The three letters have never once meant the same thing twice.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMetaName
   */
  async getMetaName() {
    const path = `/meta/name`
    return this.request<
      Types.GetMetaNameResponse,
      Types.GetMetaNameResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the health status of each API route.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMetaStatus
   */
  async getMetaStatus() {
    const path = `/meta/status`
    return this.request<
      Types.GetMetaStatusResponse,
      Types.GetMetaStatusResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all active military campaigns.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMilitaryCampaignsListing
   */
  async getMilitaryCampaigns() {
    const path = `/military-campaigns`
    return this.request<
      Types.GetMilitaryCampaignsResponse,
      Types.GetMilitaryCampaignsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Get the details of a military campaign.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMilitaryCampaignsDetail
   */
  async getMilitaryCampaign(params: Types.GetMilitaryCampaignParams) {
    const path = `/military-campaigns/${params.campaign_id}`
    return this.request<
      Types.GetMilitaryCampaignResponse,
      Types.GetMilitaryCampaignResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Listing of all active, completed or expired objectives of a military campaign.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMilitaryCampaignsObjectivesListing
   */
  async getMilitaryCampaignObjectives(
    params: Types.GetMilitaryCampaignObjectivesParams
  ) {
    const path = `/military-campaigns/${params.campaign_id}/objectives`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetMilitaryCampaignObjectivesResponse,
      Types.GetMilitaryCampaignObjectivesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Get the details of an objective of a military campaign.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetMilitaryCampaignsObjectivesDetail
   */
  async getMilitaryCampaignObjective(
    params: Types.GetMilitaryCampaignObjectiveParams
  ) {
    const path = `/military-campaigns/${params.campaign_id}/objectives/${params.objective_id}`
    return this.request<
      Types.GetMilitaryCampaignObjectiveResponse,
      Types.GetMilitaryCampaignObjectiveResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Browse the SKINR listings publicly available on the Paragon Hub.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetParagonHubSkinr
   */
  async getParagonHubSkinr(params?: Types.GetParagonHubSkinrParams) {
    const path = `/paragon-hub/skinr`
    const queryParams = params
      ? { after: params.after, before: params.before, limit: params.limit }
      : undefined
    return this.request<
      Types.GetParagonHubSkinrResponse,
      Types.GetParagonHubSkinrResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Browse the SKINR listings on the Paragon Hub that are visible to the given alliance.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetParagonHubSkinrAlliances
   */
  async getParagonHubSkinrAlliances(
    params: Types.GetParagonHubSkinrAlliancesParams
  ) {
    const path = `/paragon-hub/skinr/alliances/${params.alliance_id}`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetParagonHubSkinrAlliancesResponse,
      Types.GetParagonHubSkinrAlliancesResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Browse the SKINR listings on the Paragon Hub that are visible to the given character.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetParagonHubSkinrCharacters
   */
  async getParagonHubSkinrCharacters(
    params: Types.GetParagonHubSkinrCharactersParams
  ) {
    const path = `/paragon-hub/skinr/characters/${params.character_id}`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetParagonHubSkinrCharactersResponse,
      Types.GetParagonHubSkinrCharactersResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Browse the SKINR listings on the Paragon Hub that are visible to the given corporation.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetParagonHubSkinrCorporations
   */
  async getParagonHubSkinrCorporations(
    params: Types.GetParagonHubSkinrCorporationsParams
  ) {
    const path = `/paragon-hub/skinr/corporations/${params.corporation_id}`
    const queryParams = {
      after: params.after,
      before: params.before,
      limit: params.limit,
    }
    return this.request<
      Types.GetParagonHubSkinrCorporationsResponse,
      Types.GetParagonHubSkinrCorporationsResponseHeaders
    >('GET', path, queryParams, undefined)
  }

  /**
   * Calculate the systems between the given origin and destination.

   * @see https://developers.eveonline.com/api-explorer#/operations/PostRoute
   */
  async postRoute(params: Types.PostRouteParams) {
    const path = `/route/${params.origin_system_id}/${params.destination_system_id}`
    const body = {
      avoid_systems: params.avoid_systems,
      connections: params.connections,
      preference: params.preference,
      security_penalty: params.security_penalty,
    }
    return this.request<
      Types.PostRouteResponse,
      Types.PostRouteResponseHeaders
    >('POST', path, undefined, body)
  }

  /**
   * Listing of all Skyhooks that currently or will shortly be raidable.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSkyhooksRaidable
   */
  async getSkyhooksRaidable() {
    const path = `/skyhooks/raidable`
    return this.request<
      Types.GetSkyhooksRaidableResponse,
      Types.GetSkyhooksRaidableResponseHeaders
    >('GET', path, undefined, undefined)
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
   * Listing of sovereignty details for all K-space systems in New Eden.

   * @see https://developers.eveonline.com/api-explorer#/operations/GetSovereigntySystems
   */
  async getSovereigntySystems() {
    const path = `/sovereignty/systems`
    return this.request<
      Types.GetSovereigntySystemsResponse,
      Types.GetSovereigntySystemsResponseHeaders
    >('GET', path, undefined, undefined)
  }

  /**
   * Current status of the EVE Online cluster

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
  async postUiAutopilotWaypoint(params: Types.PostUiAutopilotWaypointParams) {
    const path = `/ui/autopilot/waypoint`
    const queryParams = {
      add_to_beginning: params.add_to_beginning,
      clear_other_waypoints: params.clear_other_waypoints,
      destination_id: params.destination_id,
    }
    return this.request<
      undefined,
      Types.PostUiAutopilotWaypointResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the contract window inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowContract
   */
  async postUiOpenwindowContract(params: Types.PostUiOpenwindowContractParams) {
    const path = `/ui/openwindow/contract`
    const queryParams = { contract_id: params.contract_id }
    return this.request<
      undefined,
      Types.PostUiOpenwindowContractResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the information window for a character, corporation or alliance inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowInformation
   */
  async postUiOpenwindowInformation(
    params: Types.PostUiOpenwindowInformationParams
  ) {
    const path = `/ui/openwindow/information`
    const queryParams = { target_id: params.target_id }
    return this.request<
      undefined,
      Types.PostUiOpenwindowInformationResponseHeaders
    >('POST', path, queryParams, undefined)
  }

  /**
   * Open the market details window for a specific typeID inside the client

   * @see https://developers.eveonline.com/api-explorer#/operations/PostUiOpenwindowMarketdetails
   */
  async postUiOpenwindowMarketdetails(
    params: Types.PostUiOpenwindowMarketdetailsParams
  ) {
    const path = `/ui/openwindow/marketdetails`
    const queryParams = { type_id: params.type_id }
    return this.request<
      undefined,
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
      undefined,
      Types.PostUiOpenwindowNewmailResponseHeaders
    >('POST', path, undefined, body)
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
