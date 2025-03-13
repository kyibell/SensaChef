import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home';
import SignUp from './Pages/Sign-up';
import CookingMode from './Pages/CookingMode';
import Login from './Pages/Login';
import LoginUI from './components/LoginUI/LoginUI';


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" replace />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/cookingmode" element={<CookingMode />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
