import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, userId: string): Promise<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        images_url: string[];
        views: number;
    }>;
    findAll(): Promise<({
        author: {
            id: string;
            mobile: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            image: string | null;
        };
        comments: {
            id: string;
            text: string;
            userId: string;
            postId: string;
        }[];
        likes: {
            id: string;
            postId: string;
            likes_count: number;
        } | null;
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        images_url: string[];
        views: number;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        images_url: string[];
        views: number;
    } | null>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        images_url: string[];
        views: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        images_url: string[];
        views: number;
    }>;
    uploadPostImages(images: Array<Express.Multer.File>): Promise<void>;
}
