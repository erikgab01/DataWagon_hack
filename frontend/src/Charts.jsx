import { Box } from "@mui/material";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Charts({ initialData }) {
    const isRepair = (status) => status == "Ремонт";
    const isHealthy = (status) => status == "В порядке";
    const noRepairCount = initialData.filter(
        (row) => isHealthy(row.statusMonth) && isHealthy(row.statusDays)
    ).length;
    const monthRepairCount = initialData.filter((row) => isRepair(row.statusMonth)).length;
    const daysRepairCount = initialData.filter((row) => isRepair(row.statusDays)).length;
    const data = [
        {
            name: "Не требующие ремонта",
            count: noRepairCount,
        },
        {
            name: "Требующие ремонт в течении месяца",
            count: monthRepairCount,
        },
        {
            name: "Требующие ремонт в течении 10 дней",
            count: daysRepairCount,
        },
    ];
    return (
        <Box
            sx={{
                height: 500,
                marginTop: 12,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, "Количество"]} />
                    <Legend formatter={() => "Количество"} />
                    <Bar
                        dataKey="count"
                        fill="#7036BD"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
