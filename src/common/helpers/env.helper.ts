import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/dev.env`);
  let filename: string = 'development.env';

  if (env !== undefined) {
    filename = `${env}.env`;
  }

  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
