import { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Header from "./../components/common/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/sales');  
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();  
        if (validate()) {
            fetchUser(email)  
                .then((resp) => {
                    if (!resp || resp.length === 0) {
                        toast.error('Please enter a valid email');
                    } else {
                        const user = resp[0];
                        if (user.password === password) {
                            toast.success('Login successful');
                            setIsLoggedIn(true);  
                            onLogin(); 
                        } else {
                            toast.error('Invalid credentials, please try again');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login failed due to: ' + err.message);
                });
        }
    };

    const fetchUser = async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/users`, {
                params: { email: email } // Use params for query parameters
            });
            return response.data; // Return the response data
        } catch (error) {
            throw new Error('Network response was not ok');
        }
    };

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please enter your email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please enter your password');
        }
        return result;  
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Login' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                            borderRadius: 2,
                            padding: 3,
                            boxShadow: 3,
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#6366F1', '&:hover': { backgroundColor: '#4F46E5' } }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            New User?{" "}
                            <Link to="/signup" style={{ color: '#6366F1', textDecoration: 'none' }}>
                                Signup here
                            </Link>
                        </Typography>
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default LoginPage;
