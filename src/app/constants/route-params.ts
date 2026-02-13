/**
 * Параметры маршрута (route parameters) используемые в приложении.
 * Каждое значение соответствует ключу в URL или в параметрах запроса.
 */
export enum RouteParam {
  /** Идентификатор места (Place) */
  PLACE_ID = 'placeId',

  /** Идентификатор FAQ */
  FAQ_ID = 'faqId',

  /** Идентификатор заявления (Application) */
  APP_ID = 'applicationId',

  /** Идентификатор типа */
  TYPE_ID = 'typeId',

  /** Идентификатор сезона */
  SEASON_ID = 'seasonId',

  /** Идентификатор обращения (Appeal) */
  APPEAL_ID = 'appealId',
}
