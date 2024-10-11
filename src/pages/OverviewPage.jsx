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
} from "@mui/material";

const OverviewPage = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [insuranceData, setInsuranceData] = useState([]); 
  const [brokerData, setBrokerData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const insuranceResponse = await axios.get('http://localhost:5001/insuranceFiles');
        const brokerResponse = await axios.get('http://localhost:5001/brokerFiles');
        
        const flattenedInsuranceData = insuranceResponse.data.flatMap(file => file.content);
        const flattenedBrokerData = brokerResponse.data.flatMap(file => file.content);

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

   const matchData = insuranceData.filter(insurance =>
    brokerData.some(broker => broker["Policy Number"] === insurance["Policy Number"])
  );

  const positiveData = insuranceData.filter(insurance => {
    const broker = brokerData.find(broker => broker["Policy Number"] === insurance["Policy Number"]);
    return broker && insurance.Percentage < broker.Percentage;
  });

  const negativeData = insuranceData.filter(insurance => {
    const broker = brokerData.find(broker => broker["Policy Number"] === insurance["Policy Number"]);
    return broker && insurance.Percentage > broker.Percentage;
  });

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
                  <TableCell sx={{ color: "#9ca3af" }}>{item["Bank Name"]}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item["Name"]}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item["Policy Number"]}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item["Vehicle Number"]}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.Percentage}%</TableCell>
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

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
 
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
            value={matchData.length}
            color="#8B5CF6"
            onViewClick={() => setActiveTable("matchData")}
          />
          <StatCard
            name="+ Count Data"
            icon={ShoppingBag}
            value={positiveData.length} 
            color="#EC4899"
            onViewClick={() => setActiveTable("positiveData")}
          />
          <StatCard
            name="- Count Data"
            icon={BarChart2}
            value={negativeData.length} 
            color="#10B981"
            onViewClick={() => setActiveTable("negativeData")}
          />
        </motion.div>

        {activeTable === "allData" && renderTable(insuranceData.concat(brokerData), "All Data")}
        {activeTable === "matchData" && renderTable(matchData, "Match Data")}
        {activeTable === "positiveData" && renderTable(positiveData, "+ Count Data")}
        {activeTable === "negativeData" && renderTable(negativeData, "- Count Data")}
      </main>
    </div>
  );
};

export default OverviewPage;
