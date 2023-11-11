import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Info() {
    return (
        <Box
            sx={{
                marginTop: 4,
            }}
        >
            <Typography
                component="h1"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Портрет типичного вагона, который часто ремонтируется
            </Typography>
            <List sx={{ listStyle: "decimal", px: 6 }}>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary="Остаточный пробег такого поезда сверхмалый - не превышает 5 тыс. км, либо же, наоборот, сверхвысокий - от 100 до 150 тыс. км. " />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary="Пробег в груженном состоянии составляет либо менее 25 тыс. км, либо от 75 тыс. км и более" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary="Вагоны, переданные в аренду, приходят в неисправность в 1.5 раза чаще" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary="Вагоны с типом РПС, имеющим значение 0, в 2.3 раза реже отправляются в ремонт, нежели со значением типа РПС, равным 1" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary='У 10% или более вагонов моделей "12-295", "12-296-01", "12-9788-01", "12-1301-01", "12-600-05", "12-1704-04" и "12-9780" найдены неисправности, в то время как у остальных моделей обнаружены неисправности около у 5% вагонов' />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                    <ListItemText primary="Заводы 16, 19 и 6 выпускают наивысший среди всех процент вагонов, отправленных в ремонт - 15%, 13% и 11% соответственно." />
                </ListItem>
            </List>
        </Box>
    );
}
