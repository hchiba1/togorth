import axios from 'axios';

const endpoint: string = 'https://orth.dbcls.jp/sparql';

export class Species {
    id: number;
    specific_name: string;
    common_name: string;
    comment: string;
    time: number;
    group: string;

    constructor() {
        this.id = 0;
        this.specific_name = '';
        this.common_name = '';
        this.comment = '';
        this.time = 0.0;
        this.group = '';
    }

    static createQuery(group_id: string): string {
        const sparql = 'PREFIX orth: <http://purl.jp/bio/11/orth#> '
                     + 'PREFIX dct: <http://purl.org/dc/terms/> '
                     + 'PREFIX hop: <http://purl.org/net/orthordf/hOP/ontology#> '
                     + 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '
                     + 'PREFIX group: <http://purl.org/net/orthordf/hOP/group/> '
                     + 'select distinct ?common_id ?scientific_name ?common_name ?comment ?time where { '
                     + '   values ( ?group )  { ( group:' + group_id + ' ) } '
                     + '   ?group orth:organism ?organism . '
                     + '   ?organism rdfs:label ?scientific_name ; '
                     + '             dct:identifier ?common_id ; '
                     + '             dct:description ?common_name ; '
                     + '             rdfs:comment ?comment ; '
                     + '             hop:branchTimeMya ?time . '
                     + '} order by ?common_id';
        return sparql;
    }

    static async getSpeciesList(group_id: string, fun: ((list: Species[]) => void)) {
        const sparql = Species.createQuery(group_id);
        const res = await axios.get(
            endpoint,
            {
                params: {
                    format: 'application/sparql-results+json',
                    query: sparql
                }
            }
        );
        const bindings: any[] = res.data.results.bindings;
        let array: Species[] = new Array(bindings.length);
        let index = 0;

        bindings.forEach(
            (element: any) => {
                var species: Species = new Species();
                species.id = Number(element.common_id.value);
                species.common_name = element.common_name.value;
                species.specific_name = element.scientific_name.value;
                species.time = Number(element.time.value);
                species.comment = element.comment.value;
                species.group = group_id;

                array[index] = species;
                index++;
            }
        );

        fun(array);
    }
}
