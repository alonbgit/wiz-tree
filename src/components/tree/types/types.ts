export interface TreeNodeType {
    id: string;
    title: string;
    description: string | React.ReactNode;
    avatar?: string | React.ReactNode;
    nodes?: TreeNodeType[];
    hasNodes?: boolean;
    isOpen?: boolean;
}