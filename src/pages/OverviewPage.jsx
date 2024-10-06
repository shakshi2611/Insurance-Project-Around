import { BarChart2, ShoppingBag, Users, Zap, Search, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from "@mui/material";

const OverviewPage = () => {
  const [activeTable, setActiveTable] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for demonstration
  const allData = [
    { name: "Insurance A", policyNumber: "123456", amount: 1000, percentage: 10 },
    { name: "Insurance B", policyNumber: "654321", amount: 2000, percentage: 20 },
  ]; 

  const matchData = [{ name: "Insurance A", policyNumber: "123456", amount: 1000, percentage: 10 }];
  const positiveData = [{ name: "Insurance B", policyNumber: "654321", amount: 2000, percentage: 20 }];
  const negativeData = [];

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  
  const renderTable = (data, title) => (
    <div style={{ marginTop: "30px" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{
        backgroundColor: "#1f2937", 
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#6366F1" }}>Name</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Policy Number</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Amount</TableCell>
              <TableCell sx={{ color: "#6366f1" }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.name}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.policyNumber}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.amount}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.percentage}%</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ color: "#9ca3af" , textAlign: "center" }}>
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Overview' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#9ca3af",
                  },
                 
                  "&.Mui-focused fieldset": { 
                    borderColor: "#9ca3af",
                  },
                },
                marginRight: "10px",
              }}
              style={{ marginRight: "10px" }}
            />
            <Button variant="contained"  color="primary" onClick={handleSearch} startIcon={<Search />}>
              Search
            </Button>
          </div>
          <Button variant="contained" color="secondary" onClick={handleExport} startIcon={<Download />}>
            Export
          </Button>
        </div>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='All Data'
            icon={Zap}
            value='$12,345'
            color='#6366F1'
            onViewClick={() => setActiveTable("allData")}
          />
          <StatCard
            name='Match Data'
            icon={Users}
            value='1,234'
            color='#8B5CF6'
            onViewClick={() => setActiveTable("matchData")}
          />
          <StatCard
            name='+ Count Data'
            icon={ShoppingBag}
            value='567'
            color='#EC4899'
            onViewClick={() => setActiveTable("positiveData")}
          />
          <StatCard
            name='- Count Data'
            icon={BarChart2}
            value='12.5%'
            color='#10B981'
            onViewClick={() => setActiveTable("negativeData")}
          />
        </motion.div>

      
        {activeTable === "allData" && renderTable(allData, "All Data")}
        {activeTable === "matchData" && renderTable(matchData, "Match Data")}
        {activeTable === "positiveData" && renderTable(positiveData, "+ Count Data")}
        {activeTable === "negativeData" && renderTable(negativeData, "- Count Data")}
      </main>
    </div>
  );
};

export default OverviewPage;
