import React, { Component } from "react";
import { connect } from "react-redux";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";
import { IGroup } from "./interfaces/IGroup";
import { apiRequest, IRequestProps } from "./../../api/apiRequest";
import { RequestType } from "./../../api/enum/RequestType";
import { RequestEndpoint } from "./../../api/enum/RequestEndpoint";

import {
  StateProps,
  DispatchProps,
  mapStateToProps,
  mapDispatchToProps,
} from "./store/PropsTypes";

import "./Groups.scss";

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps {}

interface IState {
  groups: IGroup[];
  error: any;
}
class Groups extends Component<IGroupsProps, IState> {
  constructor(props: IGroupsProps) {
    super(props);
    this.state = {
      groups: [],
      error: null,
    };
  }

  private cssClasses = {
    container: "groupsContainer",
  };

  /** Handles adding group */
  addGroupHandler = (group: IGroup) => {
    this.props.groupsAddGroup(group);
  };

  private getGroupProps: IRequestProps = {
    method: RequestType.GET,
    endpoint: RequestEndpoint.GET_USER_GROUPS,
    userId: "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91",
  };

  private addGroupProps: IRequestProps = {
    method: RequestType.POST,
    endpoint: RequestEndpoint.POST_ADD_GROUP,
    body: {
      name: "Grupa do dodania",
      code: "GDD",
    },
  };

  getGroupsRequest = async (): Promise<void> => {
    try {
      const response = await apiRequest(this.getGroupProps);
      this.setState({ groups: response });
    } catch (err) {
      this.setState({ error: err });
    }
  };

  addGroupRequest = async (): Promise<void> => {
    try {
      const response = await apiRequest(this.addGroupProps);
      this.setState({ groups: response });
    } catch (err) {
      this.setState({ error: err });
    }
  };

  //getGroupsHandler = () => this.props.groups;

  render() {
    let callbacks: IGroupCallbacks = {
      addGroup: this.addGroupHandler,
      getGroups: () => this.state.groups,
      //getGroups: this.getGroupsHandler,
      redirect: (route) => this.props.history.push(route),
    };

    return (
      <section className={this.cssClasses.container}>
        <GroupsRouter
          match={this.props.match}
          staticContext={this.props.staticContext}
          history={this.props.history}
          location={this.props.location}
          callbacks={callbacks}
        />
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));
