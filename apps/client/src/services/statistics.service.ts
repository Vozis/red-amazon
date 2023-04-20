import { getContentType } from '@/api/api.helper';
import { instance } from '@/api/api.interceptor';

import { IStatisticsResponse } from '@/services/interfaces/statistics-response.interface';

const STATISTICS = 'statistics';

export const TypeData = {};
export const StatisticsService = {
  async getMain() {
    return instance<IStatisticsResponse[]>({
      method: 'GET',
      url: `${STATISTICS}/main`,
    });
  },
};
