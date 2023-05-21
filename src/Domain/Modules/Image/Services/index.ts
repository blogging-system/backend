import { CreateImageDTO } from "../Types";
import ImageMutationsServices from "./imageMutations.services";

export default class ImageServices {
	public static async createImage(data: CreateImageDTO) {
		return await ImageMutationsServices.createImage(data);
	}
}
