import Home from './routes/home.component';
import { Routes, Route, Outlet } from 'react-router-dom';

const App = () => {
  const Naigation = () => {
    return (
      <div>
        <h1>i am the navigation page</h1>
        <Outlet />
      </div>
    );
  };

  const Shop = () => {
    return <h1>i am the shop page</h1>;
  };

  return (
    <Routes>
      <Route path="/" element={<Naigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
