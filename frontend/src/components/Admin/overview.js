import React, { useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import  { useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Overview() {


    const [options] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
          text: "Total Users Graph"
        },
        axisY: {
          includeZero: true
        },
        data: [{
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 68 },
            { x: 70, y: 38 },
            { x: 80, y: 92, indexLabel: "Highest" },
            { x: 90, y: 54 },
            { x: 100, y: 60 },
            { x: 110, y: 21 },
            { x: 120, y: 49 },
            { x: 130, y: 36 }
          ]
        }]
      });
    
    



      const options2 = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light1", // "light1", "dark1", "dark2"
		title:{
			text: "Iu users"
		},
		data: [{
			type: "pie",
			indexLabel: "{label}: {y}%",		
			startAngle: -90,
			dataPoints: [
				{ y: 20, label: "Telangana" },
				{ y: 24, label: "Andhra pradesh" },
				{ y: 20, label: "Tamil nadu" },
				{ y: 14, label: "Maharastra" },
				{ y: 12, label: "Delhi" },
				{ y: 10, label: "Karnataka" }	
			]
		}]
	}


  useEffect(() => {
    // Check if CanvasJS is available
    if (!window.CanvasJS) {
      console.error('CanvasJS library not loaded.');
      return;
    }

    try {
      const chart = new window.CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Number of iPhones Sold in Different Quarters"
        },
        axisX: {
          minimum: new Date(2015, 1, 25),
          maximum: new Date(2017, 2, 15),
          valueFormatString: "MMM YY"
        },
        axisY: {
          title: "Number of Sales",
          titleFontColor: "#4F81BC",
          includeZero: true,
          suffix: "mn"
        },
        data: [{
          indexLabelFontColor: "darkSlateGray",
          name: "views",
          type: "area",
          yValueFormatString: "#,##0.0mn",
          dataPoints: [
            { x: new Date(2015, 2, 1), y: 74.4, label: "Q1-2015" },
            // Add other data points
          ]
        }]
      });

      chart.render();
    } catch (error) {
      console.error('Error rendering chart:', error);
    }
  }, []); // Run once when component mounts

  return (

<>
<AdminDashboard />
<div style={{display:"flex",marginLeft:"50px"}}>

 <div style={{width:"40%"}}>
      <CanvasJSChart options={options} />
    </div>

    <div>
			<CanvasJSChart options={options2} />
		</div>
    <div id="chartContainer" style={{ height: '370px', width: '100%' }}></div>
    </div>
</>

 
  )
}


