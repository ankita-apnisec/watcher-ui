import React from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBFormInline, MDBIcon, MDBInput, MDBRow } from "mdbreact";

export const Footer: React.FC = () => {
    return (
        <div className="page-footer font-small mdb-color pt-2">
            <div className="container-fluid text-center text-md-left">
                <div className="row d-flex align-items-center">
                    <div className="col-md-4 col-lg-8">
                        <p className="text-center text-md-left text-white">
                            Apni sec Watcher©2021 &nbsp;&nbsp; | &nbsp;&nbsp; Disclaimer &nbsp;&nbsp;| &nbsp;&nbsp; Privacy Policy &nbsp;&nbsp; | &nbsp;&nbsp;Sitemap
                        </p>
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <p className="text-center text-md-right text-white">
                            <MDBBtn size="sm" social="fb">
                                <MDBIcon fab icon="facebook-f" />
                            </MDBBtn>
                            <MDBBtn size="sm" social="tw">
                                <MDBIcon fab icon="twitter" />
                            </MDBBtn>
                            <MDBBtn size="sm" social="li">
                                <MDBIcon fab icon="linkedin-in" />
                            </MDBBtn>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
