import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Layout({ children }) {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <OnlinePredictionIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Прогнозирование отправления вагонов в ремонт
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className="main">{children}</main>
        </>
    );
}
