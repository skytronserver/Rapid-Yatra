import { useEffect, useState } from "react";
import { useRequestEsimActivationMutation, useSendActivationRequestMutation } from "../../store/services/dealerService";
import MainCard from "../../ui-component/cards/MainCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Download, Print, ViewColumn } from "@mui/icons-material";
import toast from "react-hot-toast";

const RequestEsimActivition = () => {
  const [requestEsimActivation, { isLoading: isLoadingData }] = useRequestEsimActivationMutation();
  const [sendActivationRequest, { isLoading: isSending }] = useSendActivationRequestMutation();
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await requestEsimActivation({
        esim_status: "NotAssigned",
        stock_status: "Available_for_fitting"
      });
      
      if (response.data.data && Array.isArray(response.data.data)) {
        setTableData(response.data.data);
      } else {
        setTableData([]);
        console.warn("API response is not in expected format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching eSIM data:", error);
      setTableData([]);
      toast.error("Failed to fetch eSIM data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestEsimActivation]);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filter data based on search term
  const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  // Handle activation request
  const handleActivationRequest = async (row) => {
    try {
      const formData = new FormData();
      formData.append('device', row.id);
      formData.append('imei', row.imei);
      formData.append('iccid', row.iccid);
      formData.append('model_name', row.model?.model_name);
      formData.append('eSim_provider', row.esim_provider[0].id);

      await sendActivationRequest(formData).unwrap();
      toast.success("Activation request sent successfully");
      fetchData(); // Refresh the data after successful activation
    } catch (error) {
      console.error("Error sending activation request:", error);
      toast.error(error.data?.message || "Error sending activation request");
    }
  };

  return (
    <MainCard sx={{ boxShadow: 'none', border: 'none' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: '1.75rem', fontWeight: 600, color: 'primary.main' }}>
          Request eSIM Activation
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Manage and request eSIM activations for available devices
        </Typography>
      </Box>

      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        border: 'none'
      }}>
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Box>
            <IconButton title="Download">
              <Download />
            </IconButton>
            <IconButton title="Print">
              <Print />
            </IconButton>
            <IconButton title="Columns">
              <ViewColumn />
            </IconButton>
          </Box>
        </Box>

        <TableContainer>
          {isLoadingData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>Device ESN</TableCell>
                  <TableCell>IMEI No.</TableCell>
                  <TableCell>ICCID</TableCell>
                  <TableCell>Model Name</TableCell>
                  <TableCell>Telecom Provider 1</TableCell>
                  <TableCell>Telecom Provider 2</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        key={row.id || index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.device_esn}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.imei} 
                            size="small" 
                            variant="outlined" 
                            sx={{ fontFamily: 'monospace' }}
                          />
                        </TableCell>
                        <TableCell>{row.iccid}</TableCell>
                        <TableCell>{row.model?.model_name}</TableCell>
                        <TableCell>{row.telecom_provider1}</TableCell>
                        <TableCell>{row.telecom_provider2}</TableCell>
                        <TableCell>
                          {row.created ? new Date(row.created).toLocaleDateString() : ''}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleActivationRequest(row)}
                            disabled={isSending}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              minWidth: 140,
                              '&:disabled': {
                                backgroundColor: 'action.disabledBackground',
                              }
                            }}
                          >
                            {isSending ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              'Request Activation'
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" color="text.secondary">
                        No matching records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainCard>
  );
};

export default RequestEsimActivition;