import keywordModel from "../Model/keyword.model";
import { BaseRepository } from "../../../Repository";

class KeywordRepository extends BaseRepository<any> {
	constructor() {
		super(keywordModel);
	}
}

export default new KeywordRepository();
