import Home from './routes/home.component';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const Shop = () => {
    return <h1>i am the shop page</h1>;
  };

  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
