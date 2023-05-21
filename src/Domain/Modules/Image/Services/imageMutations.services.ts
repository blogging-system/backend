import { InternalServerException } from "../../../../Shared/Exceptions";
import ImageRepository from "../Repository/image.repository";
import { CreateImageDTO } from "../Types";

export default class ImageMutationsServices {
	public static async createImage(data: CreateImageDTO) {
		const createdImage = await ImageRepository.createOne(data);

		if (!createdImage) throw new InternalServerException("the image creation failed!");

		return createdImage;
	}
}
