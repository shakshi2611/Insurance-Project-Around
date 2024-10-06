import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Header from "./../components/common/Header";

const LoginPage = ({ setIsAuthenticated }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		// Add authentication logic here
		// If successful:
		setIsAuthenticated(true);
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
							backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light background
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
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
					</Box>
				</Container>
			</main>
		</div>
	);
};

export default LoginPage;

