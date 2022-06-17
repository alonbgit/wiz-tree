import { useEffect, useState, useMemo, useRef } from 'react';
import Tree from './components/tree/tree';
import TreeNodes from './config/tree-nodes';
import filesService from './services/files-service';
import { TreeNodeType, Files, File } from './types/types';

import './App.scss';

function App() {
  const [filesMap, setFilesMap] = useState<Files>([]);

  useEffect(() => {
    const initRoots = async () => {
      const rootFiles = await filesService.fetchRootFiles();
      updateFilesMap(rootFiles);
    }
    initRoots();
  }, []);

  const updateFilesMap = (files: Files) => {
    const newFilesMap: Files = {...filesMap};
    files.forEach((file) => {
      const { uId } = file;
      newFilesMap[uId] = file;
    });
    console.log('---newFilesMap-------', newFilesMap);
    setFilesMap(newFilesMap);
  }

  const getDescription = (file: File): string => {
    const { lastModifiedDate, size, type, isDirectory } = file;
    let description = `Last Modified: ${lastModifiedDate.toLocaleDateString('en-US')}, size: ${size}`;
    if (!isDirectory) {
      description = `${description}, MIME: ${type}`;
    }
    return description;
  }

  const fillNode = (treeNode: TreeNodeType, file: File, treeNodes: TreeNodeType[]) => {
    if (file.files) {
      treeNode.nodes = [];
      file.files.forEach((file) => {
        const newTreeNode = createTreeNodeFromFile(file);
        treeNode.nodes.push(newTreeNode);
        fillNode(newTreeNode, file, treeNodes);
      });
    }
  }

  const createTreeNodeFromFile = (file: File) => {
    const { uId, name, isDirectory } = file;
    const treeNode: TreeNodeType = {
      id: uId,
      title: name,
      description: getDescription(file),
      hasNodes: isDirectory,
    }
    return treeNode;
  }

  const fileNodes = useMemo((): TreeNodeType[] => {
    const treeNodes = [];
    const rootNodes = Object.values(filesMap).filter(c => c.isRoot);
    rootNodes.forEach((rootNode) => {
      const treeNode = createTreeNodeFromFile(rootNode);
      treeNodes.push(treeNode);
      fillNode(treeNode, rootNode, treeNodes);
    });
    return treeNodes;
  }, [filesMap]);

  const onFileSelect = async (fileId: string) => {
    const newFileMap = {...filesMap};
    const file = newFileMap[fileId];
    const { isDirectory, files } = file;
    if (isDirectory && !files) {
      const directoryFiles = await filesService.fetchFiles();
      file.files = directoryFiles;
      updateFilesMap(directoryFiles);
    }
  }

  return (
    <div className='App'>
      <div className='tree-container'>
        <h2>
          Files directory with remote fetching from fake server
        </h2>
        <Tree
          nodes={fileNodes}
          onSelect={onFileSelect}
        />
        <h2>
          Simple tree without remote fetching with hardcoded data
        </h2>
        <Tree
          nodes={TreeNodes}
        />
      </div>
    </div>
  );
}

export default App;
