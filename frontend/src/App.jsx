import { useState } from "react";
import Layout from "./Layout";
import Table from "./Table";
import Info from "./Info";
import { randomId } from "@mui/x-data-grid-generator";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ruRU } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";
import { read, utils, writeFile } from "xlsx";
import axios from "axios";

const initialRows = [
    {
        id: randomId(),
        wagnum: 33361,
        date: new Date("2023-03-01"),
        statusMonth: "Неизвестно",
        statusDays: "Неизвестно",
    },
    {
        id: randomId(),
        wagnum: 33364,
        date: new Date("2023-03-01"),
        statusMonth: "Ремонт",
        statusDays: "Неизвестно",
    },
    {
        id: randomId(),
        wagnum: 33366,
        date: new Date("2023-03-01"),
        statusMonth: "В порядке",
        statusDays: "Неизвестно",
    },
];

function App() {
    const [data, setData] = useState(initialRows);
    const [activePage, setActivePage] = useState("table");
    async function predict() {
        // Send request, get response, update data
        try {
            console.log(import.meta.env);
            const response = await axios.post(
                `api/predict`,
                data.map((row) => ({
                    wagnum: row.wagnum,
                    month: row.date.toISOString().split("T")[0],
                }))
            );
            console.log(response);
        } catch (error) {
            console.log("Connection error: ", error);
        }

        return;
    }

    function readFromCSV(event) {
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    let rows = utils.sheet_to_json(wb.Sheets[sheets[0]], { raw: false });
                    rows = rows.map((row) => ({
                        id: randomId(),
                        wagnum: row.wagnum,
                        date: new Date(row.month),
                        statusMonth: "Неизвестно",
                        statusDays: "Неизвестно",
                    }));
                    setData(rows);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    }

    function exportToCSV() {
        const headings = [["wagnum", "month", "target_month", "target_day"]];
        const exportedData = data.map((row) => ({
            wagnum: row.wagnum,
            month: row.date.toISOString().split("T")[0],
            target_month: row.statusMonth === "Ремонт" ? 1 : 0,
            target_day: row.statusDays === "Ремонт" ? 1 : 0,
        }));
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, exportedData, { origin: "A2", skipHeader: true });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "result.csv", { type: "csv" });
    }

    const theme = createTheme(
        {
            palette: {
                primary: { main: "#7036BD" },
            },
        },
        ruRU // x-data-grid translations
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout setActivePage={setActivePage}>
                <Container maxWidth="lg">
                    {activePage == "table" && (
                        <Table
                            rows={data}
                            setRows={setData}
                            predict={predict}
                            readFromCSV={readFromCSV}
                            exportToCSV={exportToCSV}
                        />
                    )}
                    {activePage == "info" && <Info />}
                </Container>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
