export type Files = File[];

export interface File {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type?: MIMEFileType;
    isDirectory: boolean;
    uId: string;
    files?: Files;
    isRoot?: boolean;
}

export const MIMEFileTypesList = [
    'image/png',
    'application/msword',
    'text/css',
    'image/gif',
    'text/html',
    'audio/mpeg',
    'application/pdf',
    'application/zip',
    'video/mp4',
]

export type MIMEFileType =
    'image/png' |
    'application/msword' |
    'text/css' |
    'image/gif' |
    'text/html' |
    'audio/mpeg' |
    'application/pdf' |
    'application/zip' |
    'video/mp4'