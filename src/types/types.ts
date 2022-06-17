export interface TreeNodeType {
    id: string;
    title: string;
    description: string;
    avatarUrl?: string;
    nodes?: TreeNodeType[];
    isOpen?: boolean;
}

export type Files = File[];

export interface File {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type?: MIMEFileType;
    isDirectory: boolean;
    uId?: string;
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
]

export type MIMEFileType =
    'image/png' |
    'application/msword' |
    'text/css' |
    'image/gif' |
    'text/html' |
    'audio/mpeg' |
    'application/pdf' |
    'application/zip';