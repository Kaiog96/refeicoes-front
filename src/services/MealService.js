import BaseService from "./BaseService";

export default class MealService extends BaseService {

  async search(searchParam) {
    try {
      return await new BaseService().get(`/meal/?filter=${searchParam}`),
        
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("mealService -> search -> error", error);
      return new Promise((_, rej) => rej(error));
    }
  }

}
