import { NotFoundException } from "../../../../Shared/Exceptions";
import ImageRepository from "../Repository/image.repository";
import { GetImageByIdDTO } from "../Types";

export default class ImageQueriesServices {
	public static async getImageById(data: GetImageByIdDTO) {
		const foundImage = await ImageRepository.findOne({ _id: data._id });

		if (!foundImage) throw new NotFoundException("The image is not found!");

		return foundImage;
	}
}
