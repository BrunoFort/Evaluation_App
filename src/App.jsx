import PublicEvaluation from "../Pages/PublicEvaluation";
import Layout from './components/Layout.jsx';
import Home from './Pages/Home.jsx';

<Route path="/PublicEvaluation" element={<PublicEvaluation />} />


function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
