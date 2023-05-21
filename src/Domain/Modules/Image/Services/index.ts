import { CreateImageDTO, UpdateImageDTO } from "../Types";
import ImageMutationsServices from "./imageMutations.services";

export default class ImageServices {
	public static async createImage(data: CreateImageDTO) {
		return await ImageMutationsServices.createImage(data);
	}

	public static async updateImage(data: UpdateImageDTO) {
		return await ImageMutationsServices.updateImage(data);
	}
}
