import {Component} from 'react';
import {Species} from '../model/Species'
import ReactDOM from 'react-dom';

const max_id = 177;
const border_width = 3;
const height = 20;

interface IBarProps {
    group_id: string;
}

export class Bar extends Component<IBarProps, {}> {
    group_id: string;
    svg: any;
    id: number;
    static counter: number = 0;

    constructor(props: any) {
        super(props);
        this.id = Bar.counter;
        this.group_id = props.group_id;
        Bar.counter++;
    }

    static getColor(comment: string) {
        let color = 'navy';
        if(comment == 'Mammals') {
            color = '#31292b';
        }
        else if(comment == 'Other vertebrates') {
            color = '#515153';
        }
        else if(comment == 'Lancelets/tunicates') {
            color = '#6a6c6e';
        }
        else if(comment == 'Echinoderms/hemichordata') {
            color = '#929396';
        } 
        else if(comment == 'Arthropods') {
            color = '#00b6ae';
        }
        else if(comment == 'Nematodes') {
            color = '#008dcb';
        }
        else if(comment == 'Cnidaria') {
            color = '#84460a';
        }
        else if(comment == 'Sponge/Placozoa') {
            color = '#995c2e';
        }
        else if(comment == 'Choanoflagellates') {
            color = '#c98c5c';
        }
        else if(comment == 'Fungi') {
            color = '#ffb83d';
        }
        else if(comment == 'Amoebozoa') {
            color = '#e2e100';
        }
        else if(comment == 'Plantae') {
            color = '#82cd44';
        }
        else if(comment == 'Other protists') {
            color = '#f11831';
        }

        return color;
    }

    render() {
        const width = border_width * max_id;
        const divId = 'result' + this.id;
        let div = <div id={divId}></div>
        Species.getSpeciesList(
            this.group_id,
            (list) => {
                const items: any[] = []
                list.forEach(
                    function(element: Species) {
                        const color = Bar.getColor(element.comment);
                        const title = "ID: " + element.id + "\n"
                                + "Scientific Name: " + element.specific_name + "\n"
                                + "Common Name: " + element.common_name + "\n"
                                + "Comment: " + element.comment + "\n"
                                + "Time: " + element.time;
                        const rect = <rect
                            x={(element.id - 1) * border_width}
                            y={0}
                            height={height}
                            width={border_width}
                            fill={color}
                            stroke='none'
                        >
                            <title>{title}</title>
                        </rect>
                        items.push(rect);
                    }
                );

                let svg = <svg
                    id={'svg' + this.id}
                    width={width}
                    height={height}
                    viewBox={'0 0 ' + width + ' ' + height}
                    style={
                            {
                                border: 'solid 1px black',
                                margin: '10px 0px'
                            }
                          }
                  >
                      {items}
                  </svg>
                  ReactDOM.render(svg, document.getElementById(divId));
            }
        );

        return div;
    }
}
