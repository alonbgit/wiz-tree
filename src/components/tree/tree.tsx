import React, { useState, } from 'react';
import classNames from 'classnames';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
                isOpen,
            } = treeNode;
            return (
                <TreeNode
                    key={id}
                    title={title}
                    description={description}
                    avatarUrl={avatarUrl}
                    nodes={nodes}
                    isOpen={isOpen}
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
    isOpen?: boolean;
    level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
    className = '',
    title,
    description,
    avatarUrl,
    nodes,
    isOpen = false,
    level,
}) => {
    const padding = level === 1 ? 15 : 30;

    const [isNodeOpen, setIsNodeOpen] = useState<boolean>(isOpen);

    const onNodeClick = () => {
        if (nodes) {
            setIsNodeOpen(!isNodeOpen);
        }
    }

    return (
        <li className={classNames('tree-node', className)}>
            <div
                className='tree-node__inner'
                style={{
                    paddingLeft: `${(level * padding)}px`
                }}
                onClick={onNodeClick}
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
                {nodes && (
                    <ArrowDownwardIcon className={classNames('tree-node__arrow', {
                        'tree-node__arrow--open': isNodeOpen
                    })}/>
                )}
            </div>
            {nodes && (
                <Tree
                    nodes={nodes}
                    level={level}
                    className={classNames({ 'tree--hidden': !isNodeOpen })}
                />
            )}
        </li>
    )
}

export default Tree;