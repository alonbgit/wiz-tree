import React, { useState, } from 'react';
import classNames from 'classnames';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Collapse from '@mui/material/Collapse';
import { TreeNodeType } from '../../types/types';

import './tree.scss';
import './tree-node/tree-node.scss';

const DEFAULT_AVATAR = 'https://i.stack.imgur.com/l60Hf.png';

interface Props {
    className?: string;
    nodes: TreeNodeType[];
    onSelect?: (id: string) => void;
    level?: number;
}

const Tree: React.FC<Props> = ({
    className = '',
    nodes = [],
    onSelect,
    level = 0,
}) => {
    const onNodeSelect = (id: string) => {
        debugger;
        if (onSelect) {
            onSelect(id);
        }
    }

    return (
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
                    hasNodes,
                    isOpen,
                } = treeNode;
                return (
                    <TreeNode
                        key={id}
                        title={title}
                        description={description}
                        avatarUrl={avatarUrl}
                        nodes={nodes}
                        hasNodes={hasNodes}
                        isOpen={isOpen}
                        onSelect={() => onNodeSelect(id)}
                        className='tree__node'
                        level={level + 1}
                    />
                )
            })}
        </ul>
    )
}

interface TreeNodeProps {
    className?: string;
    title: string;
    description: string;
    avatarUrl?: string;
    nodes?: TreeNodeType[];
    hasNodes?: boolean;
    isOpen?: boolean;
    onSelect?: () => void;
    level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
    className = '',
    title,
    description,
    avatarUrl = DEFAULT_AVATAR,
    nodes,
    hasNodes = false,
    isOpen = false,
    onSelect,
    level,
}) => {
    const padding = level === 1 ? 15 : 30;

    const [isNodeOpen, setIsNodeOpen] = useState<boolean>(isOpen);

    const hasChildren = hasNodes || nodes;

    const onNodeClick = async () => {
        if (onSelect) {
            await onSelect();
        }
        if (hasChildren) {
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
                {hasChildren && (
                    <ArrowDownwardIcon className={classNames('tree-node__arrow', {
                        'tree-node__arrow--open': isNodeOpen
                    })}/>
                )}
            </div>
            {nodes && (
                <Collapse in={isNodeOpen}>
                    <Tree
                        nodes={nodes}
                        onSelect={onSelect}
                        level={level}
                    />
                </Collapse>
            )}
        </li>
    )
}

export default Tree;