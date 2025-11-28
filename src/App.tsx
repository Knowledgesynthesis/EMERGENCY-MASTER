import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ACS from './pages/ACS';
import Stroke from './pages/Stroke';
import Sepsis from './pages/Sepsis';
import DKAHHS from './pages/DKAHHS';
import PE from './pages/PE';
import Pneumonia from './pages/Pneumonia';
import AcuteAbdomen from './pages/AcuteAbdomen';
import Ectopic from './pages/Ectopic';
import Preeclampsia from './pages/Preeclampsia';
import Cases from './pages/Cases';
import Assessment from './pages/Assessment';
import Glossary from './pages/Glossary';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acs" element={<ACS />} />
          <Route path="/stroke" element={<Stroke />} />
          <Route path="/sepsis" element={<Sepsis />} />
          <Route path="/dka-hhs" element={<DKAHHS />} />
          <Route path="/pe" element={<PE />} />
          <Route path="/pneumonia" element={<Pneumonia />} />
          <Route path="/acute-abdomen" element={<AcuteAbdomen />} />
          <Route path="/ectopic" element={<Ectopic />} />
          <Route path="/preeclampsia" element={<Preeclampsia />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
