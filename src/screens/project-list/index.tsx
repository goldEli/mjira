import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import styled from "@emotion/styled";
import Helmet from "react-helmet";
// import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "screens/project-list/util";

export const ProjectListScreen = () => {
  // const [param, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // const debouncedParam = useDebounce(param, 200);
  // const { isLoading, data: list } = useProjects(debouncedParam);
  // const { data: users } = useUsers();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
