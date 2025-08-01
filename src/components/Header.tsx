import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../routes';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ПРИЛОЖЕНИЕ
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {routes.map((route) => (
                        <Button
                            key={route.path}
                            component={RouterLink}
                            to={route.path}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            {route.title}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 