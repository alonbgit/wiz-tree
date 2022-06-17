import { useState, useMemo } from 'react';
import Tree from './components/tree/tree';
import TreeNodes from './config/tree-nodes';
import filesService from './services/files-service';
import { TreeNodeType, Files, File } from './types/types';

import './App.scss';
import { useEffect } from 'react';


function App() {
  const [files, setFiles] = useState<Files>([]);

  useEffect(() => {
    const initRoots = async () => {
      const rootFiles = await filesService.fetchRootFiles();
      setFiles(rootFiles);
    }
    initRoots();
  }, []);

  const getDescription = (file: File): string => {
    const { lastModifiedDate, size, type, isDirectory } = file;
    let description = `Last Modified: ${lastModifiedDate.toLocaleDateString('en-US')}, size: ${size}`;
    if (!isDirectory) {
      description = `${description}, MIME: ${type}`;
    }
    return description;
  }

  const fileNodes = useMemo((): TreeNodeType[] => {
    const treeNodes = [];
    files.forEach((file) => {
      const { uId, name, isDirectory } = file;
      const treeNode: TreeNodeType = {
        id: uId,
        title: name,
        description: getDescription(file),
        hasNodes: isDirectory,
      }
      treeNodes.push(treeNode);
    });
    return treeNodes;
  }, [files]);

  const onFileSelect = (fileId: string) => {

  }

  return (
    <div className='App'>
      <div className='tree-container'>
        <h2>
          Files directory with remote fetching from fake server
        </h2>
        <Tree
          nodes={fileNodes}
          isRemoteFetch
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
