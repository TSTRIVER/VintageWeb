import React from "react";
import "./dashboard.css"
import Sidebar from "./Sidebar";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {Line,Doughnut} from "react-chartjs-2";
import {Chart as ChartJS,LineElement,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement} from "chart.js";import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminProduct } from "../../actions/productAction";


ChartJS.register(
    LineElement,CategoryScale,LinearScale,PointElement,ArcElement,Tooltip,Legend
)

const Dashboard = () => {    

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  let outOfStock = 0;

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

    const linedata = {
        labels: ["Initial_Amount","Amount_Earned"],
        datasets: [
          {
            label: "Total_Amount",
            backgroundColor: "tomato",
            borderColor: "rgb(197,72,49)",
            data: [0,3000],
          }
        ]
      };

      const doughnutState = {
        labels: ["Out_of_Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };
    
    //https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png

  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
        <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount<br />₹200
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>2000</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
            <div className="lineChart">
          <Line data={linedata} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        </div>
        </div>
    </>
  )
}

export default Dashboard;