import postModel from "../Model/post.model";
import { BaseRepository } from "../../../Repository";

class PostRepository extends BaseRepository<any> {
	constructor() {
		super(postModel);
	}
}

export default new PostRepository();
