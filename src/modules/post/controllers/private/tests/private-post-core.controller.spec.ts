import { PrivatePostCoreController } from "../private-post-core.controller";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { PostService } from "../../../services/post.service";
import { CreatePostDto, DeletePostDto } from "../../../dtos";
import { Test, TestingModule } from "@nestjs/testing";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { Pagination } from "@src/shared/contracts/dtos";
import { Types } from "mongoose";

interface BlogPost {
  _id: DocumentIdType;
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  tags?: DocumentIdType[];
  keywords?: DocumentIdType[];
  series?: DocumentIdType[];
}

describe("🏠PrivatePostCoreController | Controller Layer", () => {
  let privatePostCoreController: PrivatePostCoreController;
  let postService: Partial<PostService>;

  beforeEach(async () => {
    postService = {
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      publishPost: jest.fn(),
      unPublishPost: jest.fn(),
      getLatestPosts: jest.fn(),
      getPublishedPosts: jest.fn(),
      getUnPublishedPosts: jest.fn(),
      getPopularPosts: jest.fn(),
      getUnPopularPosts: jest.fn(),
      getTrendingPosts: jest.fn(),
      getPostBySlug: jest.fn(),
      getAllPosts: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivatePostCoreController],
      providers: [
        {
          provide: PostService,
          useValue: postService,
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile();

    privatePostCoreController = module.get<PrivatePostCoreController>(PrivatePostCoreController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost method", () => {
    it("should create a new post successfully", async () => {
      const postData: Partial<CreatePostDto> = { title: "New Post", content: "Post content" };
      const createdPost = { _id: String(new Types.ObjectId()), ...postData };

      (postService.createPost as jest.Mock).mockResolvedValueOnce(createdPost);

      const result = await privatePostCoreController.createPost(postData as CreatePostDto);

      expect(postService.createPost).toHaveBeenCalledWith(postData);
      expect(result).toEqual(createdPost);
    });
  });

  describe("updatePost method", () => {
    it("should update an existing post successfully", async () => {
      const postId = new Types.ObjectId();
      const updateData: Partial<CreatePostDto> = { title: "Updated Post", content: "Updated content" };
      const updatedPost: Partial<BlogPost> = { _id: postId, ...updateData };

      (postService.updatePost as jest.Mock).mockResolvedValueOnce(updatedPost);

      const result = await privatePostCoreController.updatePost(postId, updateData as CreatePostDto);

      expect(postService.updatePost).toHaveBeenCalledWith(postId, updateData);
      expect(result).toEqual(updatedPost);
    });
  });

  describe("deletePost method", () => {
    it("should delete a post successfully", async () => {
      const deleteData: DeletePostDto = { postId: new Types.ObjectId() };
      const expectedResult: ResultMessage = { message: "Post deleted successfully" };

      (postService.deletePost as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.deletePost(deleteData);

      expect(postService.deletePost).toHaveBeenCalledWith(deleteData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("publishPost method", () => {
    it("should publish a post successfully", async () => {
      const postId = new Types.ObjectId();
      const publishedPost: Partial<BlogPost> = {
        _id: postId,
        title: "Published Post",
        content: "Published content",
      };

      (postService.publishPost as jest.Mock).mockResolvedValueOnce(publishedPost);

      const result = await privatePostCoreController.publishPost(postId);

      expect(postService.publishPost).toHaveBeenCalledWith(postId);
      expect(result).toEqual(publishedPost);
    });
  });

  describe("unPublishPost method", () => {
    it("should unpublish a post successfully", async () => {
      const postId = new Types.ObjectId();
      const unpublishedPost: Partial<BlogPost> = {
        _id: postId,
        title: "Unpublished Post",
        content: "Unpublished content",
      };

      (postService.unPublishPost as jest.Mock).mockResolvedValueOnce(unpublishedPost);

      const result = await privatePostCoreController.unPublishPost(postId);

      expect(postService.unPublishPost).toHaveBeenCalledWith(postId);
      expect(result).toEqual(unpublishedPost);
    });
  });

  describe("getLatestPosts method", () => {
    it("should get the latest posts successfully", async () => {
      const pagination: Pagination = {};
      const latestPosts: Partial<BlogPost>[] = [
        { _id: new Types.ObjectId(), title: "Latest Post", content: "Latest content" },
      ];

      (postService.getLatestPosts as jest.Mock).mockResolvedValueOnce(latestPosts);

      const result = await privatePostCoreController.getLatestPosts(pagination);

      expect(postService.getLatestPosts).toHaveBeenCalledWith({ pagination, sortValue: -1 });
      expect(result).toEqual(latestPosts);
    });
  });

  describe("getPublishedPosts method", () => {
    it("should return published posts", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getUnPublishedPosts method", () => {
    it("should return unpublished posts", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPopularPosts method", () => {
    it("should return popular posts", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getUnPopularPosts method", () => {
    it("should return unpopular posts", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getTrendingPosts method", () => {
    it("should return trending posts", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPostBySlug method", () => {
    it("should return a post by slug", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getAllPosts method", () => {
    it("should return all posts with pagination and filter", async () => {
      const pagination: Pagination = {};
      const expectedResult: BlogPost[] = [];

      (postService.getPublishedPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privatePostCoreController.getPublishedPosts(pagination);

      expect(postService.getPublishedPosts).toHaveBeenCalledWith({ pagination });
      expect(result).toEqual(expectedResult);
    });
  });
});
