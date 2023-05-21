import viewsTrackerModel from "../Model/viewsTracker.model";
import { BaseRepository } from "../../../Repository";

class ViewsTrackerRepository extends BaseRepository<any> {
	constructor() {
		super(viewsTrackerModel);
	}

	async updateOne(filter, setPayload) {
		return await this.model.findOneAndUpdate(filter, setPayload, { new: true, upsert: true });
	}
}

export default new ViewsTrackerRepository();
