import { useEffect, useState, useMemo } from 'react';
import Tree from './components/tree/tree';
import TreeNodes from './config/tree-nodes';
import filesService from './services/files-service';
import { Files, File } from './types/types';
import { TreeNodeType } from './components/tree/types/types';
import { getIconByFile } from './services/file-type-icons';
import FileDescription from './components/file-description/file-description';

import './App.scss';

function App() {
  const [filesMap, setFilesMap] = useState<Files>([]);

  const updateFilesMap = (files: Files) => {
    const newFilesMap: Files = {...filesMap};
    files.forEach((file) => {
      const { uId } = file;
      newFilesMap[uId] = file;
    });
    setFilesMap(newFilesMap);
  }

  useEffect(() => {
    const initRoots = async () => {
      const rootFiles = await filesService.fetchRootFiles();
      updateFilesMap(rootFiles);
    }
    initRoots();
  }, []);

  const getDescription = (file: File): React.ReactNode => {
    return (
      <FileDescription file={file} />
    );
  }

  const getIcon = (file: File) => {
    const Icon = getIconByFile(file);
    return <Icon color='primary' />;
  }

  const createTreeNodeFromFile = (file: File) => {
    const { uId, name, isDirectory } = file;
    const treeNode: TreeNodeType = {
      id: uId,
      title: name,
      description: getDescription(file),
      hasNodes: isDirectory,
      avatar: getIcon(file),
    }
    return treeNode;
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
        <div className='tree-section'>
          <h2>
            Files directory with remote fetching from fake server
          </h2>
          <Tree
            nodes={fileNodes}
            onSelect={onFileSelect}
            showLoading
          />
        </div>
        <div className='tree-section'>
          <h2>
            Simple tree without remote fetching with hardcoded data
          </h2>
          <Tree
            nodes={TreeNodes}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
