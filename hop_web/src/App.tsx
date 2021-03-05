import react, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {Gene} from './model/Gene'
import {Container, AppBar, Toolbar, Typography, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';


export class Search extends Component {
    
    state = {
        options: []
    }

    constructor(props: any) {
        super(props);
        this.state = {options: []};
    }

    componentDidMount() {
        const url = 'https://orth.dbcls.jp/api/genes';
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
                            const url = 'https://orth.dbcls.jp/api/genes?keyword=' + value
                            axios.get(url).then(
                                (response) => {
                                    this.setState({options: response.data});
                                }
                            );
                        }
                    }
                    onChange={
                        (event, value) => {
                            // A gene is selected.
                            console.log(value)
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
            </Container>
        );
    }
}

export default Search;
