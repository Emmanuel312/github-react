import React, { Component } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  Loading,
  Owner,
  Search,
  SearchWrapper,
  IssuesList,
  IssuesListLoading,
  PageFooter,
  PageButton,
} from "./styles";
import Container from "../../components/Container";
import api from "../../services/api";

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    search: "",
    loadingIssues: false,
    page: 1,
    repoName: "",
  };

  async componentDidMount() {
    const { params } = this.props.match;
    const repoName = decodeURIComponent(params.repository);
    const owner = decodeURIComponent(params.owner);
    this.setState({ repoName });

    const repository = await api.get(`repos/${owner}/${repoName}`);

    this.setState({ loading: false, repository: repository.data });
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = async (e) => {
    if (e.keyCode !== 13) return; // diferente de enter nao vai fazer nada

    await this.fetchIssues();
  };

  fetchIssues = async () => {
    const { search, page, repoName } = this.state;
    try {
      this.setState({ loadingIssues: true });
      const { data } = await api.get(`repos/${repoName}/issues`, {
        params: { state: search, per_page: 5, page },
      });
      this.setState({ issues: data, loadingIssues: false });
    } catch (err) {
      this.setState({ loadingIssues: false });
    }
  };

  handleNextPage = async () => {
    this.setState({ page: this.state.page + 1 });

    await this.fetchIssues();
  };

  handlePrevPage = async () => {
    this.setState({ page: this.state.page - 1 });

    await this.fetchIssues();
  };

  render() {
    const {
      loading,
      repository,
      issues,
      search,
      loadingIssues,
      page,
    } = this.state;
    console.log(page);
    if (loading) return <Loading>Carregando...</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <SearchWrapper>
          <Search
            value={search}
            onKeyDown={this.handleSearch}
            onChange={this.handleChange}
          />
        </SearchWrapper>

        {loadingIssues ? (
          <IssuesListLoading>
            <Skeleton count={5} height={66} />
          </IssuesListLoading>
        ) : (
          <IssuesList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssuesList>
        )}

        <PageFooter>
          <PageButton isInitialPage={page === 1} onClick={this.handlePrevPage}>
            <FaArrowLeft />
          </PageButton>

          <strong>{page}</strong>

          <PageButton onClick={this.handleNextPage}>
            <FaArrowRight />
          </PageButton>
        </PageFooter>
      </Container>
    );
  }
}
