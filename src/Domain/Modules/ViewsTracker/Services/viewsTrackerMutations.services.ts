import { IncrementDTO } from "../Types/viewsTrackerMutations.dtos";
import ViewsTrackerRepository from "../Repository/viewsTracker.repository";
import viewsTrackerRepository from "../Repository/viewsTracker.repository";

export default class ViewsTrackerMutationsServices {
	public static async increment(data: IncrementDTO) {
		return await viewsTrackerRepository.updateOne(data, { $inc: { viewsCount: 1 } });
	}
}
