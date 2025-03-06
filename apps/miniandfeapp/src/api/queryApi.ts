import { http } from "./http";
import { instance } from "./instances";

class QueryApi {
  async getQuery(params?: Record<string, unknown>) {
    return await http.get(instance.queryInstance, '/query', params)
  }
}

export const queryApi = new QueryApi()
