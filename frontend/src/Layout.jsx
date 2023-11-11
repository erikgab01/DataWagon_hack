import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Layout({ children, setActivePage }) {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <OnlinePredictionIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Прогнозирование отправления вагонов в ремонт
                    </Typography>
                    <Box
                        sx={{
                            marginLeft: "auto",
                        }}
                    >
                        <Button onClick={() => setActivePage("table")} sx={{ color: "white" }}>
                            Прогнозирование
                        </Button>
                        <Button onClick={() => setActivePage("plot")} sx={{ color: "white" }}>
                            Графики
                        </Button>
                        <Button onClick={() => setActivePage("info")} sx={{ color: "white" }}>
                            Дополнительная информация
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <main className="main">{children}</main>
        </>
    );
}
