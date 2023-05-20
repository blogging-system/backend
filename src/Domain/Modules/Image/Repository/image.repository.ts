import imageModel from "../Model/image.model";
import { BaseRepository } from "../../../Repository";

class ImageRepository extends BaseRepository<any> {
	constructor() {
		super(imageModel);
	}
}

export default new ImageRepository();
