import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class PostService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    create(createPostDto: CreatePostDto, userId: string): Promise<{
        id: string;
        title: string;
        content: string;
        images_url: string[];
        authorId: string;
        views: number;
    }>;
    findAll(): Promise<({
        likes: {
            id: string;
            likes_count: number;
            postId: string;
        } | null;
        comments: {
            id: string;
            userId: string;
            postId: string;
            text: string;
        }[];
        author: {
            mobile: string;
            name: string | null;
            image: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
        };
    } & {
        id: string;
        title: string;
        content: string;
        images_url: string[];
        authorId: string;
        views: number;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        images_url: string[];
        authorId: string;
        views: number;
    } | null>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        title: string;
        content: string;
        images_url: string[];
        authorId: string;
        views: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        images_url: string[];
        authorId: string;
        views: number;
    }>;
    uploadPostImages(files: Array<Express.Multer.File>): Promise<void>;
}
