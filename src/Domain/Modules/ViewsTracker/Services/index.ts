import { IncrementDTO } from "../Types/viewsTrackerMutations.dtos";
import ViewsTrackerMutationsServices from "./viewsTrackerMutations.services";

export default class ViewsTrackerServices {
	public static async increment(data: IncrementDTO) {
		return await ViewsTrackerMutationsServices.increment(data);
	}
}
