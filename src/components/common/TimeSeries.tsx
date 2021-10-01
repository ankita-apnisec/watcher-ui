import React, { useRef, useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Charts from "react-apexcharts";
export const TimeSeries = (props: any) => {
    const [chartoptions, setChartoptions] = useState({
        series: [{
          name: "Critical",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "High",
          data: [35, 41, 42, 42, 29, 18, 29, 37, 34, 26, 20, 17]
        },
        {
          name: 'Medium',
          data: [46, 47, 44, 49, 35, 38, 22, 47, 32, 26, 25, 17]
        },
        {
            name: 'Low',
            data: [43, 37, 41, 42, 32, 36, 29, 37, 32, 26, 25, 17]
          }
      ],
      options : {
        chart: {
     //   height: "20vh",
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      colors: props.color? props.color : ['#f44336', '#ff9800', '#0784eb', '#2bbbad'],
      // colors : ["#787878", "#5a5a5a", "#a6a6a6"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2, 3, 2],
        dashArray: [0, 5, 3]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
          'Oct', 'Nov', 'Dec'
        ],
      },
      
      grid: {
        borderColor: '#f1f1f1',
      }
    }
      
});
   
    return (
        <>
            <Charts
                options={chartoptions.options}
                series={chartoptions.series}
                type="line"
               width="600"
               height="300"
            />
        </>
    )
}