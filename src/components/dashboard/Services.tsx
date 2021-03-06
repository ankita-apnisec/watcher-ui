import React, { useRef, useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { Header } from "../../common/Header";
import {
    MDBBtn,
    MDBFreeBird,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBFormInline,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBEdgeHeader,
    MDBCardTitle,
    MDBProgress,
    MDBListGroup,
    MDBListGroupItem,
    MDBBreadcrumbItem,
    MDBBreadcrumb
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css"
export const Services = (props: any) => {
    const token = localStorage.getItem("token");
    console.log(props)
    if (token === null || token === undefined || token.length <0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid className="pb-5" style={{ padding: "2vw" }}>
                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "0px" }}>
                        <MDBBreadcrumb >
                            <MDBBtn className="back" onClick={() => props.SwitchView('assets')} color="blue-grey" style={{ border: "2px solid blue-grey", borderRadius: "5px", marginLeft: "0px !important", fontSize: "8px !important" }}>
                                <MDBIcon icon="arrow-left" style={{ fontSize: "8px" }} /> Back</MDBBtn>
                            <MDBBreadcrumbItem>assets</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>services</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <div style={{ maxHeight: "70vh", overflowY: "auto",  overflowX: "hidden" }}>
                    <MDBRow className="awsRow">
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCard">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-s3-010621.webp" alt="Amazon S3" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>S3 bucket</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>6 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCard">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-ec2-010621.webp" alt="AWS EC2" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>EC2</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>9 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCard">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-rds-010621.webp" alt="AWS RDS" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>RDS</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>3 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol><MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-lambda-010621.webp" alt="AWS Lambda" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Lambda</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>2 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol><MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-kinesis-010621.webp" alt="AWS Kinesis" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Kinesis</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>1 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol><MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-elastic-beanstalk-010621.webp" alt="AWS Elastic Beanstalk" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Elastic Beanstalk</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>6 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol><MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-glacier-010621.webp" alt="Amazon Glacier" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Glacier</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>1 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol><MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-sns-010621.webp" alt="AWS SNS" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>SNS</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>1 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-cloudfront-010621.webp" alt="AWs CloudFront" width={"40vw"} height="66" />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>CloudFront</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-ebs-010621.webp" alt="AWS EBS" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>EBS</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol> <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-vpc-010621.webp" alt="AWS VPC" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>VPC</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol> <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-sqs-010621.webp" alt="AWS SQS" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>SQS</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-dynamodb-010621.webp" alt="DynamoDB" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>DynamoDB</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-elasticache-010621.webp" alt="AWS ElastiCache" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>ElastiCache</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://cdn.mindmajix.com/blog/images/aws-redshift-010621.webp" alt="AWS Redshift" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Redshift</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://www.cloudnexa.com/contentful/assets/6FlWaCeF84vbIXTYMTJ1du/0f76adb07337b4194933d534b0b1d12d/amplify2.png" alt="AWS Redshift" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Amplify</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="https://res.cloudinary.com/practicaldev/image/fetch/s--GxuX6kvH--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/noeekvo08dpur71j9ukc.jpg" alt="AWS Redshift" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>AppSync</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                        <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow className="serviceCardDisabled">
                                <MDBCol sm="3" md="3" lg="3" >
                                    <img className="alignleft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAkFBMVEX////3lB73jQD3jwD3kxn+7N32iwD3kQ/3khX3kAv//vz+9u34o0P//fr/+vX+9Or+8eT4oDr4pkz82Lb96NT6v4b7yZr83sH7zaH6vID3mSn5rF781bH95c75tG/4p1H94cf6w475sGb3mzD5r2T5t3b5q1r81rP6wo37y5/4nzb3mST3lxf7zqf4oj/4oUfl6CvIAAAUJ0lEQVR4nN1daXurKhCuQFxiY/Z9s7Vp06Zp//+/u5EB1AgGFJuc+z73w31OksrIMPsMT09/iM7LPjk5zupntxj85XP/EPNnNyBOCuJj9D6593paQOcX+U4OPnrr33tNtrEokpjCw+N7r8ouDuiaxJRr3Zd7r8smXhmNJEAUHpxNB83uvTJ7WAKNBA1fPubbSfxxcDBQ6c7vvTZbGLsgavwP8U+9GaabSXB4x4VZRAS75g0L0rSzopLIe73XsuxiGVBqfqLiP4cnupfu9j6rsouQHkhyiq4/mNAP/Pd7LMo2Pim3uhIDB7YY/R9sgnV69ryD5JOQCiS8+fMl2ccwPXpIaqm+Ufp3f70i++h9U56UfrZJOdkf/fGKWkCPHslv6WdU9JCk+8dLso+IEvIl/QwE73fvj5dkH1EqXciz9LMulTzev09kH6mJpC/ACf59IgeUyJP0MzAH/gc7CYSgkr2TgkrX/w+RWOo4jqiN7v/70nUMvqQn2co5fBTEf74oy5ixmEBQtmtCwuMD0zsszB76vyK2gxZXn0VDEdrCw85dlmcFm3yIDp0Ln4VDL/vML72CfwXRuhiiQ7ucGI29YogS7aXy99ERe2yrSMDoCfALyw5MXl12Hn2+nx7+B2NaB8TICJzjM99SjFZvy8PeR5x+tF7y7112+h/TJZMEczIOUSpjOSXE9zJG9bzL7m35V51g9U/lR2bZNgITbp3AuQZB7zQe2Z3yb5N/KNg8GPGAOdpxcRLtrpMh2BFh2O2KbyYa/SM5vQ32OTfmMzrxL8opjQAfc+K0J06w/0+EfCKe93AYN2aI3wT5eHn12VzwM3p9eGUS88X6V8qfog8mubcrhyGzlxOc4vbX2QRCIaAf6eECcx3Fss8Em5OHNmY7QnGoMo+TCiKfwpHQp18PK39m3IzBJ5XCg9AVUuU/Pl2fM/tjGrN9btcQVxYuB3SBSKXSF7zwmMas8Dg8v8II7eJqIp+eppwdHs+Yjd6E4nir3AGqKt0q9zEzjtDhoYzZOfE0dTkkDSrFSmYZPJIx280Ux+8tqfhN0z83snVz4aWhR6kPmdxUHDnQ9DK6VSgQCn8bPT+EMplxiYN1mGuVEuneFpxnbhk8gjGb8zi0xAQQqfHNwa+mKGsfmcdRpThySCi7aknNFyF/SNxkjQ2R8zjWmvU4X+nCsZ5qyIUXlg1W2Qwx4R4HlngcclAiPc0vZ2Ibf90pMput4Ed/BZRIed5ZhjmP5vnos84aGyKnOI4GP0vLJBSJPCmy4C3a/3mFWk4qGJVUUSITk19kRvEf18cORCTVNQyWUiKHRj/p/4jNfP1DY/YsXi4yfbkpkf6v4Y9euGcSfP9VJV703uCYUCKNy+kmK6FM/iYyIqznWgLv5F6wNv5Z5pmgYfvGbO8gYhy1korRBb06Jyvz5mRhQKvIGyF/7NHmPJPrgK5dCMXhkTvEJoRn0ubThcehb6raRec5c3laqovJXLzWT4USR2FKJm0ok8y+umsZw/YU8M20HxnJhV3u5/ak6O1cfmbkmYj6EIrD82K7f9kc43aOzeQkQqHrB4hrZzkTi2F2YTreUeIUIdL1HrKjTAZD1NYhqI9czmRnQZmIxscHyxous9qL2OR30fzz5Tg9vsw+xI7193wbvbuGzCQQkZGchdmdnGfH6fQ4W2zlRmfnECAcpMAIJTMayR9zxfEYEqeIzOXDCQ1rd6YOwpwEZ1ZecHRA+UobgvE6DndZgc2DSJwiPkXNCHqJNr8oIHkK/Os1x+ViIh+JbQxWD1qqmcmfICg1TRP0XtjMBSKOGlYEWDvoSpulOQqbw8uLHR/nO475v90/41KBDS6slqQSBXMKfF9QycrEL5p1v4g7k/H0lNvYh2VVjo6T8amHfo7n8fi8TBjz+g7zCfuYc6XQHHPB6/76YVmVIxyKYtI3sSFblhTzWNsNVEmRYh3ClO3uzXzpA2AMO3JFwQy8FfDIoHGB4Cuu3MB39FM5txBtF8v1l5dG61zva738jG0ZiTsPTuPV3/tgVKYa/4duZLl+aAHE/1hZR7xcuRdTw8/V9qYC4u1sgdAItJ9b+lNAQXDxfyfQcyuxS9/oC6qu1NDCZIkLejrDhdKfTdNDv4ECKAnL7en+4e7TMX0PhEiMNlYi9lH+xAjzX1SuWs7gIzxt1rr9mm4GWUk+mfAit336igNpvIT+Wv6RNsZJeXzLNQJ8aMIuNEOPpbV4VKYGs6eEEivVhVR/mvRVlyRxPKw0pTK2RddFvgYPBZ6UUrCgTdO7pxPda+m56KREmvRVfxeZfrAu7iJJhQ1y6X/4qvkl8OqK8QFVIET62ZZ1qNJzsZd+JaTH1SCZiJI8lZ/YyxOI8PB1No47/bDf2c7PyxFBOEcoqVtj34HubzkF9FCugEh5Li1UnmgFsJcIrgt/c6azh5zD+Joho8nsGeUsTx/VMpJht+SaLgQzoWonqb1HHH0Rjx0vYZIyDrJdCvBbrPgjg9kqx9JIXSirxvzmTp6eVjfOpCPTLgpcXop/ohJg45KMxGoVMX/OhBMemccfqJokjvQz2OVhlXQ9Q8uxvtyjO5+WLywEq/oacnP+Jb7urYx1JqwSSw80Ha7ivzE9KW0fYgaD/mPhBKB1rjV0pOWoLYQI8okplTMgUiqcn5mefAlUB28ASzUoLMF8oWIbdfVCKKKC/rcZlSFshfRQbnnvgtp2fWdvF53OmrKHO6H8hJmk92c8j+OvDM5lZ8f7D2Tv8xlY8YkVgjnlcHt2rgjGU63lFolEZjNoYhH61zY/4n2u/atc2H4ELyTdP9YIj698rY2bX3CA1hpJzwKRxvnDgc+rg7U0SW9TNItLHjGLXME8tXfwOYv7fSzQmL5fNLzpFOWJDMyTCuGJs95tzyd8IddmMSlUTvVYHI+1ZIZMUKA9L6+OxqLIwye5P+K8VAuFPJFVvR8q9B2eLL8hfDoHnDeV+P+jV76Z4YIFkgXvb9k78dHz53h8Pu59URmUvA9zltflcO6q1p4nkgxrlMB02LM8uQnGEL/njuJlTW/nhHmsHt5/jufj2d5jf0hE69JjKVo0URqkEL9POXgwG+b+podG6oxg4UwGdWa1xTx+pmbY8Q8qxCDPYZpjL0SOM63r587p1vecEjwRcZ3sctzho+Ss2KSidMV1qGTSgigquHvnJDuKBAUHLg4/ZZH0ICkohf6+5N0W7Mgwb0gTdFpI13CtJ0c1wjd7eN1YJpu7Zydb5kUSnnMrnJcIIOWe2o1T/JZ3vQ/zfRaruZApO5suLsJNzKM3ItRdNgnmWWRfIh0mxVfsoy/JuepthgiJoKHMTOosA/EUmYn09DKj+EyxSPFZw0NkjCdRQTv+kr3LiSm/g4k4lx5G+F0lOgab49sK6JDPJ7u8CBfYSe63WEECLxKXyNiwMDjaSQ0TmLjleP5oN4tvmIZ9eIir8JAmB/cihDzzklVtcBOs5Bmlfr53kQcKAuB3moG3BTRyKp2P6Jy4lR2QTfEDvFTuOTi4rnwT4VMIhusZIeBiSUdcckxarev/YAZZ6VSFkpOYAaJ2unG3X+Gh3AddsO4Mh/iC3NGOhS9uNh63jGmgED1VmCnnyEoxMHsn9tFR8WsVqIds0FcD37eTtKsF2mVJk27agIm4Bg4ejfs47v3mBC+poDRqkoFphgZjqoFd7lj1wVWlwaGEBN7JwL+j9sAdR5SHrqlZBVMaKvXeNUC84fsVfnyTaoOkhLhqcoocW9f4J3axBlWt3ycFp9hsW+iYR+9+JfVsCr7+Aqg8NhzEfTDN2lkGTIj333S/D6LSsNExvjFSpm2A+apIKUoA5o58VK4SIKzko2f/AvCSFaOaJaAVEL6p/0fVjnHLqjUwInVdirCeYmcTu7SNnm6Pwla7ISNSPj69DIgZqPx8JSLDdzMHSWFLHsdmNW9vNflub8blMSIXVEe+DQCMpLvsyFSrcrBcuq68YqEy/VkQ1QCXVrfDG/a9XEF4EwPXyKWDo68zaUcLYFfqWs/L2lodjHRdi7fH6gUstW6+UgYMNAduJOr6wBuY0WKCla68hBppWzXAcImRptyb1LdcDH9KFauZr6MGd7X0+ALMHd35N0X4RkwwM4sIVoNl8DTNtOcG3sTSqH6Qr8tKzATkjqZVNzB3JTOwKhhNwcwyEXZiJpCp0OR9VpJV09iC8IDueE52ZYSNu8DMQpLUbKkdq6GtCNpFvXAoHRs39B1NgsthUMOVzAAxM91Vdxi/WphlBQpE06Y0W2UJ0Y301hVYMspoNpQUrHdM88HAb/WN5ncjbl9gk7VVAEriNC8w6tJwVAMjBNw0XzMEFrHCDV0nUAV+IYye4gMdIC931QIUKWhroAPLtDfUIuyyFE2ngqrURnkbKIrVtSXAcZG3C+njzHoCNSN1NBbZKBj1CaX2ul+H9jcnaGLAhqxsSjNhz2KRTbL7HTMjvc+LxuL6j1wDkbriDrahmURPzJhhyto1/doMy0uJdYNScKCazbKAnjxtedlltU76xcdX4AVHuheHgE/W0FWfGBnpF/HPaoFxvetBQ9Zmqc1/H3CTXrP0W3dlqGp5aVit4U5RwkuXdQWJnQtXD4ZGU2/lmzFc/rf8qi3935pF21QA88PV54cOL1Y0vuI+ShiNgXa0l1WaNQ0RQtzW5F19iBlFZupSDEXwv7RfKfBZ8zo/c65/ERNkRgb+z5jXRhNHP4IC6eXmwQjYGKMatKUYVKQ5N5yOkGa/IYG+9TIxzEopceMaEynEaBWCdlqbGYsxHCQwCJ/SeiMr9zzva9gUYl8cD89uRpgG4uY7x/dNQsRfjY1zDrAODRMN4lyml4QtKgXJ4JB1ZHgrE7+QpWtslN5CWNO0inectcIS7C2Vv57nG1mQWSPswoJxzkGzHMbxqU5+IJXnDl/KfBjNDzjXyEJcQzu7zkFSYVrveHd32WamAgWh/fFjMoguR7QXTuLFIXHz98I5AY7NHhDZMM45WHmWecxvTq5aNYJ0lkIKlBvxxD5zjQdxsTIY42XJAfGwGiq3+1I52yS3z+jHfENoHs1SGq2R8RQeNMj00apGGBPSvpYGZooYdT0zuD8tT5QrbKLnjmpFalnRmK1Kzh5q9M6izd7FPpFTiMiyZm2bLeOcgxZmNuH+/ma9ctNGsFxfbSqGksO87k4wd95edfUGIpONyq16nfFx/XwK0jk1aRtnsp+Om4wagtEBxkVYakC4yKCIXYko7Hc6k86gHzUtUAPjXLvCUAM0K2/JtrCEH2vGOQdNsDbO5NjEoHnk/BoWgvGWAca5rSo3wLd15mgIm8Y5Bxjpd6vxLQHmQtkqcmPY2oqmWEKNyJMGKib73AN2IufXgPKDyiKd2F1am7AdrivLOcyjwVoY34xVRx4JbN3OMMZeZWIsbuIyqHG73CUd9UBcKy+XTlmqShkdbvNVLexvnAKYgaDdbVsJSI1V/K1Tw7IWFWiZHiEqpwHMBUsvFxQESVT27aRpWYsKg2rNxOb9WrKJIKmOVWUnR9Mhl9qgkUlVuQvMoZYOBKkFeGduLP/UsJLBADDgTn51JNgKhFi7TwyqEYkjlZ8tWtIVNem9k2IsXH1AHUkgFXSLOokLTZyUNekgDUsTfBoBpka4Mp1lVidmBmXjKCv5MOxevIEYGFYyrjNsUnN+C3PFUYggFt60bvAajD3K4Tg267SdrvIIktelzA8M97PWi5Y9TvHu1o1qzm+B1viW1NOGDT6w7oaN5X+4V6d9WR/Qm3BVnsUGdyHdpgMDyFmkYc35LfBpRHFn0O+H7EZQ1inRRtCg+P56UdjvDzoT2qvWoOb8FqDpzEuDw+mQv1WSDL/anAvGSib90e/PV3JKbzJwESRWWnTfp4UMFaGAc9PS7J5fdn+LL57EYOFaCBXmiluB1P5CQ0xUD2wxpDZV5BqtxyEElpIZl47JAAJj9PPZ8Tz3tMc8H4pHKr2wxnjll8sF6R0nPhZ1DdbDZgIJL7jDV4+UGrUWwE8k9l4mqZkaxqLMqK0hIfzCL0xmnatH2jc+UvRAvhE356xGbHhsS7H1AWPWfOlsyK7xs25GUoCHR/yiRmRDttuxslj7xFXM5bO9R0LPB/GuuQQsTKMJXLpgCqR0Fth00Ba8ZlAfEi8OdrgV2xWCY2UXbmq3uiWDr5zPRCsUFMGfJoBQjqxnC4oi7HtbFaHOcUueOowIlD5y0WCyQAXgXiOpRIPsi7cbdKxiQGNK8kKdgczpaw4a4FF0qsNlFqlzYhVVQRXKr9a1MyVEET9XGJhWoNgt6p5YVyK03FvRnDrDt5ZaH4rLdajgtR06A39ZUaN9ByIpY1mf6AnsKtdM1+xKpPDLkH+x8LcUZQq0eqrxXYNSQhQjXViYB8QF9n3n+7RaJcnXEPDMMALs39n/jPgHz+yLSbJanb6/fSbCgEjpe+2B4LFtDVRU7oMK8deTTmgt4NsNOxOQ2dLaTMM2ZF1M1Bp/XKMHSAfMGJAlH16gGMV6EJ365b6snx/MOvspUXAJZK3u4PVZKz/PwEZSljOfB7DcbQuBJ97RLzl5MBi1hTAouwCwxLCz1vweMZbn+ujBuAW7mUKGI5u3U3yxM6OJK4ZYgp+O5I9sI57dZV3V+fqa8I0NI9GeNmuEaMXuicqVenXYhXFIc6adIXikF69mnajX7UXbqQdmgNHNbSbYskcG/jSNnfX643fWf1F7ksEt8G5lgl1vlaww72shXmvVvhv+yAD5w58V4i0mrb3W9JFZv2Bmfpk1dhri7MoeWeOaSn3EXjlRgIatVsHOcdmRM+yzNEX06hZ7kryWBECG/h5dP7L1+y8m77wrkBAPu7v2cmgC8T691hlcGQ+jv3jkU/98+Fk5p9Vwfzj/Ub324Lxc70fPo/3bdFODU/8Dq4IByHSWY4sAAAAASUVORK5CYII=" alt="AWS Redshift" width={"40vw"} />
                                </MDBCol>
                                <MDBCol sm="9" md="9" lg="9" >
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>Backup</p>
                                    <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>0 available</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>
        </>
    )
}