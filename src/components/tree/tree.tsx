import React from 'react';
import classNames from 'classnames';
import { TreeNodeType } from '../../types/types';

import './tree.scss';
import './tree-node/tree-node.scss';

interface Props {
    className?: string;
    nodes: TreeNodeType[];
    level?: number;
}

const Tree: React.FC<Props> = ({
    className = '',
    nodes = [],
    level = 0,
}) => (
    <ul
        className={classNames('tree', className)}
    >
        {nodes.map((treeNode) => {
            const {
                id,
                title,
                description,
                avatarUrl,
                nodes,
            } = treeNode;
            return (
                <TreeNode
                    key={id}
                    title={title}
                    description={description}
                    avatarUrl={avatarUrl}
                    nodes={nodes}
                    className='tree__node'
                    level={level + 1}
                />
            )
        })}
    </ul>
)

interface TreeNodeProps {
    className?: string;
    title: string;
    description: string;
    avatarUrl?: string;
    nodes?: TreeNodeType[];
    level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
    className = '',
    title,
    description,
    avatarUrl,
    nodes,
    level,
}) => {
    const padding = level === 1 ? 15 : 30;

    return (
        <li className={classNames('tree-node', className)}>
            <div
                className='tree-node__inner'
                style={{
                    paddingLeft: `${(level * padding)}px`
                }}
            >
                <img
                    className='tree-node__avatar'
                    src={avatarUrl}
                />
                <div className='tree-node__content'>
                    <span className='tree-node__title'>
                        {title}
                    </span>
                    <span className='tree-node__description'>
                        {description}
                    </span>
                </div>
            </div>
            {nodes && (
                <Tree
                    nodes={nodes}
                    level={level}
                />
            )}
        </li>
    )
}

export default Tree;