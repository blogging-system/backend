import { CreatePostDto } from './create-post.dto'
import { PublishPostDto } from './publish-post.dto'
import { UnPublishPostDto } from './unpublish-post.dto'

export type PostManipulationDto = CreatePostDto | PublishPostDto | UnPublishPostDto
