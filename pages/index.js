import { Container, Box, Heading } from "@chakra-ui/react";
import Section from "../components/layouts/section";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Label,
  j,
} from "recharts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";

const Page = () => {
  const [monthlyValue, setMonthlyValue] = useState();
  const [years, setYears] = useState();
  const [interest, setInterest] = useState();
  const [data, setData] = useState([]);
  const [contributionString, setContributions] = useState();
  const [compoundedInterestString, setCompoundedInterest] = useState();
  const [totalString, setTotal] = useState();

  // data.push([{Years: "Year 1", MonthlyValue: monthlyValue}])
  // const data = [{Years: "Year 1", MonthlyValue: monthlyValue}]

  const calculate = (e) => {
    if (years && interest && monthlyValue) {
      let totalCash = 0;
      let contributions = 0;
      let dataArray = [];
      let currYear = 1;
      let interestVariable = interest / 100;
      let payment = parseInt(monthlyValue);

      for (let i = 0; i < years; i++) {
        for (let z = 0; z < 12; z++) {
          totalCash = totalCash * (1 + interestVariable / 12) + payment;
        }
        contributions = payment * 12 * (i + 1);

        dataArray.push({
          Years: "Year " + currYear,
          Contributions: contributions,
          "Compounded Interest": Math.round(totalCash - contributions),
          TotalLabel: Math.round(totalCash).toLocaleString(),
        });
        currYear = ++currYear;
      }
      setContributions("Your contributions: " + contributions.toLocaleString());
      setCompoundedInterest(
        "Total profit: " +
          Math.round(totalCash - contributions).toLocaleString()
      );
      setTotal("Your end total: " + Math.round(totalCash).toLocaleString());
      setData(dataArray);
    }
  };

  return (
    <Container>
      {/* HEADER SECTION */}
      <Box display={{ md: "flex" }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" align="center">
            Investment Visualizer
          </Heading>
          <Heading as="h2" variant="signature" align="center">
            by Daniel Tomic Lindvall
          </Heading>
          <p
            align="center"
            style={{
              color: "#202023",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            A web tool made to show how compound interest works if you invest on
            a monthly basis!
          </p>
        </Box>
      </Box>

      {/* INPUT VALUES SECTION */}
      <form>
        <Section delay={0.2} align="center">
          <Heading as="h3" variant="section-title" align="center">
            Input Values
          </Heading>
          <Box align="center">
            <TextField
              margin="dense"
              fullWidth
              label="Monthly savings"
              variant="outlined"
              onChange={(e) => setMonthlyValue(e.target.value)}
            />
            <TextField
              margin="dense"
              fullWidth
              label="How many years?"
              variant="outlined"
              onChange={(e) => setYears(e.target.value)}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Interest rate in %"
              variant="outlined"
              onChange={(e) => setInterest(e.target.value)}
            />
            <Button
              style={{ padding: "10px", width: "30%", margin: "13px" }}
              variant="outlined"
              color="primary"
              onClick={(e) => {
                calculate();
              }}
            >
              Visualize
            </Button>

            <p
              align="center"
              style={{
                color: "#202023",
                paddingRight: "50px",
                paddingLeft: "50px",
              }}
            >
              {contributionString}
            </p>
            <p
              align="center"
              style={{
                color: "#202023",
                paddingRight: "50px",
                paddingLeft: "50px",
              }}
            >
              {totalString}
            </p>
            <p
              align="center"
              style={{
                color: "#202023",
                paddingRight: "50px",
                paddingLeft: "50px",
              }}
            >
              {compoundedInterestString}
            </p>
          </Box>
        </Section>
      </form>

      {/* BAR CHART SECTION */}
      <Section delay={0.4} align="center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={500}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <XAxis>
              <Label value="Years" offset={-5} position="insideBottomRight" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Contributions"
              stackId="a"
              fill="grey"
              labelType="none"
            />
            <Bar dataKey="Compounded Interest" stackId="a" fill="#82ca9d" />
            <Bar
              name="Total"
              dataKey="TotalLabel"
              stackId="a"
              opacity="0"
              legendType="none"
            />
          </BarChart>
        </ResponsiveContainer>
      </Section>
    </Container>
  );
};

export default Page;
