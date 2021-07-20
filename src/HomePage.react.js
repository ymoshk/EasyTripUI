// @flow

import * as React from "react";

import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper.react";
import PassengersCount from "./pages/PassengersCount";

function Home() {
  return (
    <SiteWrapper>
    <PassengersCount>

    </PassengersCount>
    </SiteWrapper>
  );
}

export default Home;
