import Tree from './components/tree/tree';
import TreeNodes from './config/tree-nodes';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <div className='tree-container'>
        <Tree
          nodes={TreeNodes}
        />
      </div>
    </div>
  );
}

export default App;
