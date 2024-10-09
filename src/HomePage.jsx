import React from 'react';

const HomePage = () => {
    return (
        <section id="page-section">
            <div className="row mb-4">
                <div className="col-lg-9 mb-0 mb-lg-0">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h6 text-uppercase mb-0">Hello User!</h2>
                        </div>
                        <div className="card-body">
                            <p className="text-gray">Welcome to the Staff Application.
                                This application is designed to enable staff registration and update
                            </p>
                            <button className={"btn btn-primary"}>Staff Management</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;