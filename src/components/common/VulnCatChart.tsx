import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Charts from "react-apexcharts";
export const CategoryChart = (props: any) => {
    const [chartoptions, setChartoptions] = useState({
        series: props.series? props.series : [14, 23, 21],
        options: {
            chart: {
                offsetY: 20,
                offsetX: 50
            },
            stroke: {
                colors: ['#fff']
            },
            colors: props.color? props.color :  ['#7ed957', '#008037', '#2bbbad'],
            labels: props.category? props.category : ["SubD takeover", "Leaky directory", "git misconfig"],

            dataLabels: {
                enabled: false,
            },
            yaxis: {
                show: false
            },
            fill: {
                opacity: 0.95
            },
            plotOptions: {
                polarArea: {
                  rings: {
                    strokeWidth: 0
                  },
                  spokes: {
                    strokeWidth: 0
                  },
                }
              },
              legend: {
                position: "right",
                offsetY: 20,
                offsetX: 10,
                fontSize: "8px"
            },
            tooltip: {
                style: {
                    fontSize: '8px',
                    fontFamily: 'Inter'
                  },
                x: {
                    show: false
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    });
    useEffect(() => {
        setChartoptions({
            series: props.series? props.series : [14, 23, 21],
            options: {
                chart: {
                    offsetY: 20,
                    offsetX: -60
                },
                stroke: {
                    colors: ['#fff']
                },
                colors: props.color? props.color :  ['#7ed957', '#008037', '#2bbbad'],
                labels: props.category? props.category : ["SubD takeover", "Leaky directory", "git misconfig"],
    
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    show: false
                },
                fill: {
                    opacity: 0.95
                },
                plotOptions: {
                    polarArea: {
                      rings: {
                        strokeWidth: 0
                      },
                      spokes: {
                        strokeWidth: 0
                      },
                    }
                  },
                  legend: {
                    position: "right",
                    offsetY: 20,
                    offsetX: 10,
                    fontSize: '10px'
                },
                tooltip: {
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Inter'
                      },
                    x: {
                        show: false
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
    
        })
    }, [props]);
    
    return (
        <>
            <Charts
                options={chartoptions.options}
                series={chartoptions.series}
                type="polarArea"
                width="350"
            />
        </>
    )
}