import { Button } from "@mui/material";
const Header = () => {
    return (
        <div style={{ width: '100%', height: '300px', backgroundColor: 'green' }}>
            <Button href="/profile">Профиль</Button>
            <Button href="/login">Login</Button>
        </div>
    );
};

export default Header; 