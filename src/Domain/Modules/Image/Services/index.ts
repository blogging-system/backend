import { CreateImageDTO, DeleteImageDTO, GetImageByIdDTO, UpdateImageDTO } from "../Types";
import ImageMutationsServices from "./imageMutations.services";
import ImageQueriesServices from "./imageQueries.services";

export default class ImageServices {
	public static async createImage(data: CreateImageDTO) {
		return await ImageMutationsServices.createImage(data);
	}

	public static async updateImage(data: UpdateImageDTO) {
		return await ImageMutationsServices.updateImage(data);
	}

	public static async deleteImage(data: DeleteImageDTO) {
		return await ImageMutationsServices.deleteImage(data);
	}

	public static async getImageById(data: GetImageByIdDTO) {
		return await ImageQueriesServices.getImageById(data);
	}
}
