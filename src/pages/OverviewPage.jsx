import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const OverviewPage = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [insuranceData, setInsuranceData] = useState([]);
  const [brokerData, setBrokerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBank, setSelectedBank] = useState(""); // State for selected bank

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const insuranceResponse = await axios.get(
          "http://localhost:5001/insuranceFiles"
        );
        const brokerResponse = await axios.get(
          "http://localhost:5001/brokerFiles"
        );

        const flattenedInsuranceData = insuranceResponse.data.flatMap(
          (file) => file.content
        );
        const flattenedBrokerData = brokerResponse.data.flatMap(
          (file) => file.content
        );

        setInsuranceData(flattenedInsuranceData);
        setBrokerData(flattenedBrokerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Match, Positive, and Negative Data filtering logic
  const matchData = insuranceData.filter((insurance) =>
    brokerData.some(
      (broker) => broker["Policy Number"] === insurance["Policy Number"]
    )
  );

  const positiveData = insuranceData.filter((insurance) => {
    const broker = brokerData.find(
      (broker) => broker["Policy Number"] === insurance["Policy Number"]
    );
    return broker && insurance.Percentage < broker.Percentage;
  });

  const negativeData = insuranceData.filter((insurance) => {
    const broker = brokerData.find(
      (broker) => broker["Policy Number"] === insurance["Policy Number"]
    );
    return broker && insurance.Percentage > broker.Percentage;
  });

  // Get unique bank names
  const bankNames = [
    ...new Set(
      [...insuranceData, ...brokerData].map((item) => item["Bank Name"])
    ),
  ];

  // Filter data based on the selected bank
  const filteredData = (data) =>
    selectedBank
      ? data.filter((item) => item["Bank Name"] === selectedBank)
      : data;

  // Function to render table with filtered data
  const renderTable = (data, title) => (
    <div style={{ marginTop: "30px" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1f2937",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#6366F1" }}>Bank Name</TableCell>
              <TableCell sx={{ color: "#6366F1" }}>Name</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Policy Number</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Vehicle Number</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item["Bank Name"]}
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item["Name"]}
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item["Policy Number"]}
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item["Vehicle Number"]}
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item.Percentage}%
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{ color: "#9ca3af", textAlign: "center" }}
                >
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-1 lg:px-6">
      <FormControl sx={{ minWidth: 200 }} className="w-full sm:w-auto">
  <InputLabel
    id="bank-select-label"
    className="text-gray-500 text-sm font-medium"
  >
    Filter by Bank
  </InputLabel>
  <Select
    labelId="bank-select-label"
    value={selectedBank}
    label="Filter by Bank"
    onChange={(e) => setSelectedBank(e.target.value)}
    className="bg-gray-400 text-white border border-gray-500 rounded-md mb-4 text-sm focus:border-white-500 focus:outline-none transition-all duration-300"
    MenuProps={{
      PaperProps: {
        className: "bg-gray-700 text-white shadow-lg",
      },
    }}
    sx={{ lineHeight: '1.2' }} // Optionally adjust line-height
  >
    <MenuItem value="">
      <span className="text-grey-400">All Banks</span>
    </MenuItem>
    {bankNames.map((bank, index) => (
      <MenuItem key={index} value={bank}>
        <span className="text-black-400">{bank}</span>
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="All Data"
            icon={Zap}
            value="$12,345"
            color="#6366F1"
            onViewClick={() => setActiveTable("allData")}
          />
          <StatCard
            name="Match Data"
            icon={Users}
            value={filteredData(matchData).length}
            color="#8B5CF6"
            onViewClick={() => setActiveTable("matchData")}
          />
          <StatCard
            name="+ Count Data"
            icon={ShoppingBag}
            value={filteredData(positiveData).length}
            color="#EC4899"
            onViewClick={() => setActiveTable("positiveData")}
          />
          <StatCard
            name="- Count Data"
            icon={BarChart2}
            value={filteredData(negativeData).length}
            color="#10B981"
            onViewClick={() => setActiveTable("negativeData")}
          />
        </motion.div>

        {activeTable === "allData" &&
          renderTable(
            filteredData(insuranceData.concat(brokerData)),
            "All Data"
          )}
        {activeTable === "matchData" &&
          renderTable(filteredData(matchData), "Match Data")}
        {activeTable === "positiveData" &&
          renderTable(filteredData(positiveData), "+ Count Data")}
        {activeTable === "negativeData" &&
          renderTable(filteredData(negativeData), "- Count Data")}
      </main>
    </div>
  );
};

export default OverviewPage;
