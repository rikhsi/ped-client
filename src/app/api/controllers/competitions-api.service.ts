import { Injectable } from '@angular/core';
import {
  BaseResult,
  VotingParticipantResult,
  VotingParticipantResults,
  VotingVideoSourcePayload,
  VotingVideoSourceResult,
} from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Competitions API Service
 *
 * Сервис для работы с конкурсами:
 * - получение участников голосования
 * - работа с видео источниками участников
 */
@Injectable({
  providedIn: 'root',
})
export class CompetitionsApiService {
  /** Базовый endpoint для конкурсов */
  private readonly endpoint = 'competitions';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение информации об участнике голосования
   *
   * @returns Observable с данными участника голосования
   */
  public getVotingParticipant$(): Observable<VotingParticipantResult> {
    return this.baseApi.getQuery$(`${this.endpoint}/voting/participant`);
  }

  /**
   * Получение списка участников голосования
   *
   * @returns Observable со списком участников голосования
   */
  public getVotingParticipants$(): Observable<VotingParticipantResults> {
    return this.baseApi.getQuery$(`${this.endpoint}/voting/participants`);
  }

  /**
   * Получение информации о видео источнике участника
   *
   * @param videoSourceId ID видео источника
   * @returns Observable с данными видео источника
   */
  public getVotingVideoSource$(
    videoSourceId: number,
  ): Observable<VotingVideoSourceResult> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/voting/video-source/${videoSourceId}`,
    );
  }

  /**
   * Загрузка видео источника участника
   *
   * @param payload Данные для загрузки видео
   * @returns Observable с ID созданного видео источника
   */
  public uploadVotingVideoSource$(
    payload: VotingVideoSourcePayload,
  ): Observable<BaseResult<number>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/voting/video-source`,
      payload,
    );
  }
}
