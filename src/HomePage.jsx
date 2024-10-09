import React from 'react';

const HomePage = () => {
    return (
        <section style="padding-top:20px">
            <div className="row mb-4">
                <div className="col-lg-9 mb-0 mb-lg-0">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h6 text-uppercase mb-0">Hello User!</h2>
                        </div>
                        <div className="card-body">
                            <p className="text-gray">This is a tellers portal. You can initiate transactions by
                                clicking on the list icon in the right hand top corner.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;