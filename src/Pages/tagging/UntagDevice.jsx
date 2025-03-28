import { useEffect, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Download, Print, ViewColumn } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useGetDevicesMutation, useUntagDeviceMutation } from "../../store/services/taggingService";

const UntagDevice = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [untagDevice, { isLoading: isLoadingUntag }] = useUntagDeviceMutation();
  const [getDevicesToUntag, {isLoading: isLoadingDevices}] = useGetDevicesMutation();

   const fetchData = async () => {
    try {
        const response = await getDevicesToUntag({
        is_tagged: "True"
      });
      setTableData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleUntag = async (row) => {
    try {
      const response = await untagDevice({device_id: row.id});
      console.log(response,"response")
      toast.success("Device untagged successfully");
    } catch (error) {
      toast.error("Failed to untag device");
    }
  };

  const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <MainCard sx={{ boxShadow: 'none', border: 'none' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: '1.75rem', fontWeight: 600, color: 'primary.main' }}>
          Tagged Devices
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Manage and untag devices from the system
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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ESN</TableCell>
                  <TableCell>IMEI</TableCell>
                  <TableCell>ESIM Provider</TableCell>
                  <TableCell>ESIM Validity</TableCell>
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
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.device_esn}</TableCell>
                        <TableCell>{row.imei}</TableCell>
                        <TableCell>{row.esim_provider[0].company_name}</TableCell>
                        <TableCell>
                          {new Date(row.esim_validity).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleUntag(row)}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              minWidth: 100
                            }}
                          >
                            Untag
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
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

export default UntagDevice;

