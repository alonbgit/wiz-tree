export interface TreeNodeType {
    id: string;
    title: string;
    description: string;
    avatarUrl?: string;
    nodes?: TreeNodeType[];
}