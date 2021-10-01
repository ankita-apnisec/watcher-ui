import React, { useRef, useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Charts from "react-apexcharts";
export const OrgChart = (props: any) => {
    const [chartoptions, setChartoptions] = useState({
        series: [85],
        options: {
          chart: {
            offsetY: 0,
            offsetX: -50,
            sparkline: {
              enabled: true
            }
          },
          colors: props.color? props.color :  ['#008037' ,'#787878', '#ff9800', '#2bbbad'],
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#fff',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false,
                  style: {
                    fontSize: '8px',
                    fontFamily: 'Inter'
                  }
                },
                value: {
                  offsetY: -2,
                  fontSize: '12px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            opacity: 0.85
            // gradient: {
            //   shade: 'light',
            //   shadeIntensity: 0.4,
            //   inverseColors: false,
            //   opacityFrom: 1,
            //   opacityTo: 1,
            //   stops: [0, 50, 53, 91]
            // },
          },
          labels: ['Average Results'],
        },
    });
   
    return (
        <>
            <Charts
                options={chartoptions.options}
                series={chartoptions.series}
                type="radialBar"
                width="300"
            />
        </>
    )
}