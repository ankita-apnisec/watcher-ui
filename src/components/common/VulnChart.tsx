import React, { useRef, useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Charts from "react-apexcharts";
export const Chart = (props: any) => {
    const [chartoptions, setChartoptions] = useState({
        options: {
            chart: {
                id: "bar",
                offsetX: 30,
                offsetY: -20,
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: ["Critical", "High", "Low"],
                offsetY: 5,
                labels: {
                    show: false,
                    style: {
                        fontSize: '3px',
                        fontFamily: 'Inter'
                      }
                },
                axisBorder: {
                    show: true,
                    color: '#607d8b',
                    height: 4,
                    width: '100%',
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    style: {
                        fontSize: '3px',
                        fontFamily: 'Inter'
                      }
                }
            },
            fill: {
                opacity: 0.95
            },
            colors: props.color? props.color : ['#f44336', '#ff9800', '#2bbbad'],
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: '3px',
                    fontFamily: 'Inter'
                  }
            },

            legend: {
                show: props.width > 200 ? true : false,
                position: "right",
                offsetY: 40,
                fontSize: "8px"
            },
            plotOptions: {
                bar: {
                    distributed: true,
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
            },
            grid: {
                show: false,
            },
            tooltip: {
                style: {
                    fontSize: '3px',
                    fontFamily: 'Inter'
                  }
            }
        },
        series:
            [{
                name: "Vulnearbility",
                data: props.series? props.series :[30, 40, 45],
            }]

    });
    useEffect(() => {
        setChartoptions({
            options: {
                chart: {
                    offsetX: props.width > 200 ? 0: 10,
                    offsetY: props.width > 200 ? 0 : -30,
                    id: "bar",
                    toolbar: {
                        show: false
                    }
                },
                xaxis: {
                    categories: ["Critical", "High", "Medium", "Low"],
                    offsetY: 5,
                    labels: {
                        show: props.width > 90 ? false : true,
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Inter'
                          }
                    },
                    axisBorder: {
                        show: true,
                        color: '#607d8b',
                        height: 4,
                        width: '100%',
                    },
                    axisTicks: {
                        show: false
                    },
                    tooltip: {
                        style: {
                            fontSize: '6px',
                            fontFamily: 'Inter'
                          }
                    }
                },
                fill: {
                    opacity: 0.95
                },
                colors: props.color? props.color : ['#f44336', '#ff9800', '#0784eb', '#2bbbad'],
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '10px',
                        fontFamily: 'Inter'
                      }
                },
                legend: {
                   show: props.width > 150 ? true : false,
                    position:  props.width > 150 ? "right" : "right" ,
                    offsetY:  20,
                    fontSize: "10px"
                },
                plotOptions: {
                    bar: {
                        distributed: true,
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    },
                },
                grid: {
                    show: false,
                },
                tooltip: {
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Inter'
                      }
                }
            },
            series:
                [{
                    name: "Vulnearbility",
                    data: props.series? props.series :[30, 40, 45],
                }]
    
        })
    }, [props]);
    return (
        <>
            <Charts
                options={chartoptions.options}
                series={chartoptions.series}
                type="bar"
                width={props.width}
                height={props.height}
            />
        </>
    )
}