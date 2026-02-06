/**
 * File Repository Helpers
 *
 * Convention:
 * - Put ALL non-article downloadable/servable files under `public/files/`
 * - Reference them in code via absolute paths: `/files/<filename>`
 * - For nested app parity, mirror under `newtifi-web-builder/public/files/` if needed
 */

/** Returns the public URL for a file placed under public/files. */
export function fileUrl(name: string): string {
  if (!name || name.includes('..')) {
    throw new Error('Invalid file name');
  }
  return `/files/${name}`;
}

/** Returns the public URL for a file inside a subfolder of public/files. */
export function fileUrlIn(folder: string, name: string): string {
  if (!folder || folder.includes('..') || !name || name.includes('..')) {
    throw new Error('Invalid folder or file name');
  }
  const cleanedFolder = folder.replace(/^\/+|\/+$/g, '');
  return `/files/${cleanedFolder}/${name}`;
}


