import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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
 
  const allData = [
    {
      name: "Insurance A",
      policyNumber: "123456",
      amount: 1000,
      percentage: 10,
    },
    {
      name: "Insurance B",
      policyNumber: "654321",
      amount: 2000,
      percentage: 20,
    },
  ];

  const matchData = [
    {
      name: "Insurance A",
      policyNumber: "123456",
      amount: 1000,
      percentage: 10,
    },
  ];
  const positiveData = [
    {
      name: "Insurance B",
      policyNumber: "654321",
      amount: 2000,
      percentage: 20,
    },
  ];
  const negativeData = [];


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
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item.policyNumber}
                  </TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>{item.amount}</TableCell>
                  <TableCell sx={{ color: "#9ca3af" }}>
                    {item.percentage}%
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

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="flex max-w-[220px] items-center justify-between gap-2 bg-gray-800 rounded-full relative">
              <input
                className="border-none bg-transparent outline-none text-white text-base py-6 pl-6 pr-12"
                type="text"
                placeholder="Search something"
              />
              <button className="absolute right-2 w-[50px] h-[50px] rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-0 transition-all duration-300 ease-out transform hover:bg-gray-900 hover:shadow-lg hover:translate-y-[-3px] active:shadow-none active:translate-y-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ transform: "translateX(10px)" }}
                >
                  <g clipPath="url(#clip0_2_17)">
                    <g filter="url(#filter0_d_2_17)">
                      <path
                        d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_17"
                      x="-0.418549"
                      y="3.70435"
                      width="29.7139"
                      height="29.7139"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_17"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_17"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <clipPath id="clip0_2_17">
                      <rect
                        width="28.0702"
                        height="28.0702"
                        fill="white"
                        transform="translate(0.403503 0.526367)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <button className="relative flex items-center font-semibold text-[20px] gap-2 p-0 m-0 bg-none border-none cursor-pointer group">
  <p className="relative m-2 text-[20px] text-white-900 before:absolute before:inset-0 before:w-0 before:overflow-hidden before:text-red-600 before:content-['Subscribe'] before:transition-width before:duration-300 before:ease-out">
    BankName
  </p>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white-900 transition-transform duration-200 delay-200 group-hover:translate-x-1 group-hover:text-red-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
  <span className="absolute w-0 left-0 bottom-[-7px] h-[2px] bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
</button>

          
          <div className="container flex justify-end items-center">
            <label className="label relative flex items-center p-1 rounded-full border-2 border-blue-600 cursor-pointer transition-all ease-out duration-400 w-32">
              <input type="checkbox" className="input hidden" />
              <span className="circle flex justify-center items-center h-11 w-11 rounded-full bg-blue-600 relative overflow-hidden transition-all ease-out duration-400 shadow-none">
                <svg
                  className="icon text-white w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  ></path>
                </svg>
                <div className="square w-4 aspect-square rounded-sm bg-white opacity-0 invisible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-400"></div>
              </span>
              <p className="title absolute right-4 bottom-3 text-white text-lg transition-all ease-out duration-400">
                Export
              </p>
              <p className="title absolute right-4 bottom-3 text-white text-lg opacity-0 invisible">
                Open
              </p>
            </label>
          </div>
        </div>
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
            value="1,234"
            color="#8B5CF6"
            onViewClick={() => setActiveTable("matchData")}
          />
          <StatCard
            name="+ Count Data"
            icon={ShoppingBag}
            value="567"
            color="#EC4899"
            onViewClick={() => setActiveTable("positiveData")}
          />
          <StatCard
            name="- Count Data"
            icon={BarChart2}
            value="12.5%"
            color="#10B981"
            onViewClick={() => setActiveTable("negativeData")}
          />
        </motion.div>

        {activeTable === "allData" && renderTable(allData, "All Data")}
        {activeTable === "matchData" && renderTable(matchData, "Match Data")}
        {activeTable === "positiveData" &&
          renderTable(positiveData, "+ Count Data")}
        {activeTable === "negativeData" &&
          renderTable(negativeData, "- Count Data")}
      </main>
    </div>
  );
};

export default OverviewPage;
