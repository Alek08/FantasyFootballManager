import React from 'react'
import player from '../../img-01.png';
import player2 from '../../player2.png';
import player3 from '../../player3.png';
import par from '../../back_particles.png';
import statsimage from '../../statsimage.png';


import {BrowserRouter as Router, Link} from "react-router-dom";
function Carousel() {


    const p={
        color:"#ffffff"
    };



    return(
        <div id="carouselExampleCaptions" data-interval="4000" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">

                <div className="carousel-item active">

                    <img src={player} width="300" height="600"/>

                    <img src={par} width="800" height="600"/>



                        <div className="carousel-caption d-none d-md-block">
                            <Link className="nav-link"  to={"/createteam"}>
                                <button type="button" className="btn btn-warning">Create Team</button>
                            </Link>

                            <p style={p}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={player2} width="500" height="600" />
                        <div className="carousel-caption d-none d-md-block">
                            <Link className="nav-link"  to={"/matchresults"}>
                                <button type="button" className="btn btn-warning">Match Results</button>
                            </Link>
                            <p style={p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={player3} width="500" height="600"/>

                    <img src={statsimage} />

                    <div className="carousel-caption d-none d-md-block">
                            <Link className="nav-link"  to={"/statistics"}>
                                <button type="button" className="btn btn-warning">Statistics</button>
                            </Link>

                            <p style={p}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )

}
export default Carousel;