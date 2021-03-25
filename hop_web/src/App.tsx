import {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import {Gene} from './model/Gene'

import {Container, AppBar, Toolbar, Typography, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {Bar} from './view/Bar'

// const url = 'https://orth.dbcls.jp/api/genes';
const url = 'http://localhost:3000/api/genes';


export class Search extends Component {
    
    state = {
        options: []
    }

    constructor(props: any) {
        super(props);
        this.state = {options: []};
    }

    componentDidMount() {
        axios.get(url).then(
            (response) => {
                this.setState({options: response.data});
            }
        );
    }

    render() {
        return (          
            <Container>
                <AppBar position='static' style={{margin: '0 0 20px 0'}}>
                    <Toolbar>
                        <Typography>
                            HOP (Human Ortholog Profile) Search
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Autocomplete
                    id="genes"
                    options={this.state.options}
                    getOptionLabel={
                        (option: Gene) => {
                            return option.name;
                        }
                    }
                    onInputChange={
                        (event: object, value: string, reason: string) => {
                            axios.get(url + '?keyword=' + value).then(
                                (response) => {
                                    this.setState({options: response.data});
                                }
                            );
                        }
                    }
                    onChange={
                        (event, value) => {
                            if(value != null) {
                                ReactDOM.render(
                                    <Bar group_id={(value as Gene).id}></Bar>,
                                    document.getElementById('result')
                                );
                            }
                        }
                    }
                    renderInput={
                        (params) => {
                            return(
                                <TextField 
                                    {...params}
                                    label="Human gene"
                                    variant="standard"
                                />
                            );
                        }
                    }
                />
                <div id="result"></div>
            </Container>
        );
    }
}

export default Search;
