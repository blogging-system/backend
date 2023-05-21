import { InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import ImageRepository from "../Repository/image.repository";
import { CreateImageDTO, DeleteImageDTO, UpdateImageDTO } from "../Types";

export default class ImageMutationsServices {
	public static async createImage(data: CreateImageDTO) {
		const createdImage = await ImageRepository.createOne(data);

		if (!createdImage) throw new InternalServerException("the image creation failed!");

		return createdImage;
	}

	public static async updateImage(data: UpdateImageDTO) {
		const updatedImage = await ImageRepository.updateOne({ _id: data._id }, data.payload);

		if (updatedImage.matchedCount === 0) throw new NotFoundException("The image is not found!");
		if (updatedImage.modifiedCount === 0) throw new InternalServerException("The image update process failed!");

		return updatedImage;
	}

	public static async deleteImage(data: DeleteImageDTO) {
		const foundImage = await ImageRepository.findOne({ _id: data._id });

		if (!foundImage) throw new NotFoundException("The image is not found!");

		const { deletedCount } = await ImageRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new NotFoundException("The image delete process failed!");

		return "The image is deleted successfully!";
	}
}
