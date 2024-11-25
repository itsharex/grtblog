import { ConfigRes, UpdateConfigRequest } from '@/services/config/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

export const getAllConfig = async (): Promise<ApiResponse<ConfigRes>> => {
  return request('/api/websiteInfo', {
    method: 'GET',
  });
};

export const updateConfig = async (data: UpdateConfigRequest) => {
  return request('/api/admin/config', {
    method: 'PUT',
    params: {
      key: data.key,
      value: data.value,
    },
  });
};

export default {
  getAllConfig,
  updateConfig,
};
