import { existsSync, mkdirSync, renameSync } from 'fs';
import { join } from 'path';

export function moveImagesToActualPlace(images_url: string[], postId: string) {
  const new_images_url: string[] = [];

  for (const image of images_url) {
    const path = join(process.cwd(), 'src', 'public', 'post-images', postId);
    const oldPathFile = join(process.cwd(),'src', 'public', 'temp', image.split('/').pop() as string);
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    renameSync(oldPathFile, `${path}/${image.split('/').pop()}`);
    new_images_url.push(
      `http://localhost:3000/post-images/${postId}/${image.split('/').pop()}`,
    );
  }
  console.log(new_images_url);
  return new_images_url;
}
