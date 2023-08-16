import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Store } from './Flux'
import { Provider } from 'react-redux';
import { RegisterPage } from './View/Page/RegisterPage/RegisterPage';
import { LoginPage } from 'View/Page/LoginPage/LoginPage';
import { HomePage } from 'View/Page/HomePage/HomePage';





function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
          <Route path={'/home'} element={<HomePage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
