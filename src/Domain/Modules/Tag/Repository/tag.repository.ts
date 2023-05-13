import tagModel from "../Model/tag.model";
import { BaseRepository } from "../../../Repository";

class TagRepository extends BaseRepository<any> {
	constructor() {
		super(tagModel);
	}
}

export default new TagRepository();
