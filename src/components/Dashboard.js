import React, { Component } from "react";
import "./Dashboard.css";
import { Col, Row, Container } from "react-bootstrap";
import WidgetText from "./WidgetText";
import Fusionchart from "./fusionchart";
import WidgetDoughnut from "./WidgetDoughnut";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import SessionWidget from "./SessionWidget";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      refferalSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      Sessions: null,
      No_of_Session: null,
      page_p_session: null,
      avg_s_time: null,
      Bounce: null,
      sourceArr: [],
      usersArr: [],
      sessionArr: []
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;

    let organicSource = 0;
    let directSource = 0;
    let refferalSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let No_of_Session = 0;
    let Sessions = 0;
    let page_p_session = 0;
    let avg_s_time = 0;
    let Bounce = 0;
    let selectedValue = null;
    let sourceArr = [];
    let usersArr = [];
    let sessionArr = [];

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        refferalSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        Sessions = arr[i].sessions;
        No_of_Session = arr[i].number_of_sessions_per_users;
        page_p_session = arr[i].page_per_session;
        avg_s_time = arr[i].avg_session_time;
        newUsers = arr[i].new_users;
        Bounce = arr[i].bounce_rate;
        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Refferal Source",
            value: arr[i].referral_source
          }
        );
        usersArr.push(
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
        sessionArr.push(
          {
            label: "Session",
            value: arr[i].sessions
          },
          {
            label: "Users",
            value: arr[i].users
          }
        );
      }
    }
    selectedValue = arg;

    this.setState({
      organicSource: organicSource,
      directSource: directSource,
      refferalSource: refferalSource,
      pageViews: pageViews,
      users: users,
      newUsers: newUsers,
      sourceArr: sourceArr,
      usersArr: usersArr,
      Sessions: Sessions,
      Bounce: Bounce,
      No_of_Session: No_of_Session,
      page_p_session: page_p_session,
      avg_s_time: avg_s_time,
      sessionArr: sessionArr
    });
  };
  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () => {
      console.log(this.state.users);
    });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col>Dashboard</Col>
            <Col>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mainDashboard">
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Refferal Source"
                value={this.state.refferalSource}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Fusionchart
                title=" Source Comparison "
                data={this.state.sourceArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
            <Col>
              <WidgetDoughnut
                title=" Users  Comparison "
                data={this.state.usersArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Session" value={this.state.Sessions} />
            </Col>

            <Col>
              <SessionWidget
                title=" Session  Comparison "
                data={this.state.sessionArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>

            <Col>
              <WidgetText title="Bounce Rate" value={this.state.Bounce} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
