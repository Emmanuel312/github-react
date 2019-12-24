import React, { Component } from 'react'
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {  Form, SubmitButton,List,Input } from './styles'
import Container  from '../../components/Container'
import api from '../../services/api'

export default class Main extends Component
{

    static propTypes =
    {
        match: PropTypes.shape(
        {
            params: PropTypes.shape(
            {
                repository:  PropTypes.string
            })
        }).isRequired
    }

    state =
    {
        newRepo : '',
        repositories: [],
        loading: false,
        error: false,
    }

    componentDidMount()
    {
        const repositories = localStorage.getItem('@repositories')

        if(repositories)
            this.setState({ repositories: JSON.parse(repositories) })
    }

    componentDidUpdate(_,prevState)
    {
        const { repositories } = this.state
        if(prevState.repositories !== repositories)
        {
            localStorage.setItem('@repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e =>
    {   
        this.setState({ newRepo: e.target.value, error: false })
    }

    handleSubmit = async e =>
    {
        
        const { newRepo, repositories } = this.state
        
        e.preventDefault()
        this.setState({ loading: true })

        try
        {
            if(repositories.filter(repository => repository.name === newRepo).length) // repositorio duplicado
                throw new Error('Repositório duplicado')

            const response = await api.get(`repos/${newRepo}`)
            const data = 
            {
                name : response.data.full_name
            }

            this.setState({ repositories: [...repositories,data], newRepo: '', loading: false  })
        }
        catch(err)
        {
            console.log(err)
            this.setState({  loading: false, error: true })
        }

        
    }

    render()
    {
        const { newRepo,loading,repositories,error } = this.state

        return (
            <Container>
                <h1>
                    <FaGitAlt />
                    Repositorios
                </h1>
                
                <Form  onSubmit={this.handleSubmit} >
                    <Input error={error} type='text' placeholder="Adicionar repositorio" value={newRepo} onChange={this.handleInputChange} />
                    <SubmitButton  loading={loading} >
                        {loading? 
                        <FaSpinner color="#FFF" size={14} /> :
                        <FaPlus color="#FFF" size={14} />}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => 
                    (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }

    
}