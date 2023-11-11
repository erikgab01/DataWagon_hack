import { useState } from "react";
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { randomId } from "@mui/x-data-grid-generator";
import { CircularProgress } from "@mui/material";

function EditToolbar({ setRows, setRowModesModel, predict, readFromCSV, exportToCSV, isLoading }) {
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                isNew: true,
                date: new Date("2023-03-01"),
                statusMonth: "Неизвестно",
                statusDays: "Неизвестно",
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Добавить запись
            </Button>
            <Button color="primary" startIcon={<FileUploadIcon />}>
                <input
                    type="file"
                    name="file"
                    id="inputGroupFile"
                    required
                    onChange={readFromCSV}
                    accept=".csv"
                    hidden
                />
                <label className="file-label" htmlFor="inputGroupFile">
                    Импорт из CSV
                </label>
            </Button>
            <Button color="primary" startIcon={<FileDownloadIcon />} onClick={exportToCSV}>
                Экспорт в CSV
            </Button>
            <Button
                color="primary"
                startIcon={isLoading ? <CircularProgress size={16} /> : <TroubleshootIcon />}
                onClick={predict}
            >
                Прогнозировать ремонт
            </Button>
        </GridToolbarContainer>
    );
}

export default function Table({ rows, setRows, predict, readFromCSV, exportToCSV, isLoading }) {
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {
            ...newRow,
            statusMonth: "Неизвестно",
            statusDays: "Неизвестно",
            isNew: false,
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: "wagnum",
            headerName: "Номер вагона",
            type: "number",
            width: 200,
            align: "center",
            headerAlign: "center",
            editable: true,
        },
        {
            field: "date",
            headerName: "Дата для прогноза",
            type: "date",
            width: 200,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "statusMonth",
            headerName: "Ремонт в течении месяца",
            description: "Ремонт в течении месяца",
            width: 260,
            align: "center",
            headerAlign: "center",
            cellClassName: (params) => {
                if (params.value == "Ремонт") {
                    return "cell--repair";
                } else if (params.value == "В порядке") {
                    return "cell--healthy";
                }
            },
        },
        {
            field: "statusDays",
            headerName: "Ремонт в течении 10 дней",
            description: "Ремонт в течении 10 дней",
            width: 260,
            align: "center",
            headerAlign: "center",
            cellClassName: (params) => {
                if (params.value == "Ремонт") {
                    return "cell--repair";
                } else if (params.value == "В порядке") {
                    return "cell--healthy";
                }
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Действия",
            width: 160,
            align: "center",
            headerAlign: "center",
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={2}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 800,
                width: "100%",
                marginTop: 4,
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel,
                        predict,
                        readFromCSV,
                        exportToCSV,
                        isLoading,
                    },
                }}
                /*getRowClassName={(params) =>
                    params.row.status ? `row--${params.row.status.toLowerCase()}` : ""
                } */
            />
        </Box>
    );
}
