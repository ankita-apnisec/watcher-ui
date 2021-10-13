import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Charts from "react-apexcharts";
export const GradeChart = (props: any) => {
    const [chartoptions, setChartoptions] = useState({
        series: props.value ? [props.value] : [80],
        options: {
          chart: {
            offsetY: 20,
            offsetX: props.offsetX ? props.offsetX : 0,
            sparkline: {
              enabled: true
            }
          },
          title: {
            text: props.title ? props.title : "Vulnerability grade",
            offsetX: 20,
            offsetY: 0,
            floating: false,
           
        },
        colors: props.color? props.color : ['#008037' ,'#787878', '#ff9800', '#2bbbad'],
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
            opacity: 0.55
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
                width="200"
            />
        </>
    )
}