import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Notfound from './components/Notfound/Notfound';
import MealDetail from './components/MealDetail/MealDetail';

function App() {
  const base_url = "https://www.themealdb.com/api/json/v1/1/";

  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home base_url={base_url} /> },
        { path: "mealdetail/:id", element: <MealDetail base_url={base_url} /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
