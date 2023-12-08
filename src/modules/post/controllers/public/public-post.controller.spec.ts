import { PublicPostController } from "./public-post.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { PostsFilter } from "../../interfaces";
import { Pagination } from "@src/shared/contracts/dtos";
import { PostService } from "../../services";
import { Post } from "../../schemas";

describe("🏠PublicPostController | Controller Layer", () => {
  let publicPostController: PublicPostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicPostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            getPostBySlug: jest.fn(),
            getAllPosts: jest.fn(),
          },
        },
      ],
    }).compile();

    publicPostController = module.get<PublicPostController>(PublicPostController);
    postService = module.get<PostService>(PostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPostBySlug method", () => {
    it("should return a post by slug", async () => {
      const slug = "sample-post";
      const expectedResult: Partial<Post> = {
        title: "Sample Post",
        slug: "sample-post",
        content: "This is a sample post content.",
      };

      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await publicPostController.getPostBySlug({ slug });

      expect(postService.getPostBySlug).toHaveBeenCalledWith({ slug, isPublished: true });
      expect(result).toEqual(expectedResult);
    });

    it("should handle scenario where slug is not found", async () => {
      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(null);

      try {
        await publicPostController.getPostBySlug({} as any);

        expect(postService.getPostBySlug).toHaveBeenCalledWith({ isPublished: true });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should handle scenario where slug is an empty string", async () => {
      const slug = "";

      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(null);

      try {
        await publicPostController.getPostBySlug({ slug });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should handle scenario where slug is not of type string", async () => {
      const slug = 123;

      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(null);

      try {
        await publicPostController.getPostBySlug({ slug: slug as any });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should handle scenario where slug is too short", async () => {
      const slug = "abc";

      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(null);

      try {
        await publicPostController.getPostBySlug({ slug });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should handle scenario where slug is too long", async () => {
      const slug = "a".repeat(300);

      (postService.getPostBySlug as jest.Mock).mockResolvedValueOnce(null);
      try {
        await publicPostController.getPostBySlug({ slug });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("getAllPosts method", () => {
    it("should return all published posts with pagination and filters", async () => {
      const pagination: Pagination = {};
      const tagId = "tag123";
      const seriesId = "series123";
      const expectedResult: Partial<Post>[] = [
        {
          _id: "1",
          title: "Post 1",
          content: "Content for Post 1",
        },
        {
          _id: "2",
          title: "Post 2",
          content: "Content for Post 2",
        },
      ];

      (postService.getAllPosts as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await publicPostController.getAllPosts({
        tagId,
        seriesId,
        ...pagination,
      });

      const expectedFilter = { tagId, seriesId } as PostsFilter;

      expect(postService.getAllPosts).toHaveBeenCalledWith({
        filter: expectedFilter,
        pagination,
        isPublished: true,
      });
      expect(result).toEqual(expectedResult);
    });
  });
});
