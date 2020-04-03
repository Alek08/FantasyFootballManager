//npm i react-charts-d3
import React,{Component} from "react";
import { LineChart } from 'react-charts-d3';
import { BarChart as BarChart1}  from 'react-charts-d3';
import { BarChart as BarChart2}  from 'react-charts-d3';

import { Container, Row, Col } from 'reactstrap';


//line
const data = [
    { key: 'Group 1', values: [ { x: 'A', y: 23 }, { x: 'B', y: 8 } ] },
    { key: 'Group 2', values: [ { x: 'A', y: 15 }, { x: 'B', y: 37 } ] },
];
/*
 <LineChart data={data} />
 */


class Statistics extends Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }
//component did mount mu treba vreme za povik i chart ne prikazuva koga se renderira Statistics



    render() {

        return(<div>
<br />
<Container>
    <div>

    <h2>Top 10 Players</h2>

    <BarChart1 data={this.props.chartData1} />

    </div>

    <div>
        <h2>Top 5 Teams With Most Goals</h2>

        <BarChart2  data={this.props.chartData2} />
    </div>

</Container>


        </div>)
    }


}

export default Statistics