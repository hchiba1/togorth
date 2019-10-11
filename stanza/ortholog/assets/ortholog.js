// namespace
var ortholog = {};

// render
ortholog.render = function( root, data, genes, count ) {
    var margin = {
        left: 10,
        top:  10,
        right: 10,
        bottom: 10,
    };

    var gap = {
        row:    0,
        column: 10
    };

    var height = 20;
    var textWidth = 120;
    var borderWidth = 3;

    var size = ortholog.calculateSize( genes, count, margin, gap, height, textWidth, borderWidth );
    var width = borderWidth * count;

    var svg = d3.select( root )
                .append( 'svg' )
                .attr( 'width', size.width )
                .attr( 'height', size.height );

    for( var i = 0; i < genes.length; i++ ) {
        var gene = genes[ i ];
        var geneData = ortholog.createData( gene, data );
        ortholog.draw( svg, i, gene, geneData, margin, gap, width, height, textWidth, borderWidth );
    }
}

// calculte size
ortholog.calculateSize = function( genes, count, margin, gap, height, textWidth, borderWidth ) {
    width = margin.left + margin.right + borderWidth * count + gap.column + textWidth;
    height = margin.top + margin.bottom + genes.length * height + gap.row * ( genes.length - 1 );

    var size = {
        width: width,
        height: height
    };

    return size;
}

// create data
ortholog.createData = function( gene, data ) {
    var array = [];
    data.forEach(
        function( element ) {
            if( gene == element.gene_label.value ) {
                var row = {
                    id: parseInt( element.common_id.value ),
                    scientific_name: element.scientific_name.value,
                    common_name: element.common_name.value,
                    comment: element.comment.value,
                    time: element.time.value,
                    color: ortholog.getColor( element.comment.value )
                };

                array.push( row );
            }
        }
    );

    return array;
}

// calculate position
ortholog.calculatePosition = function( index, margin, gap, height ) {
    var x = margin.left;
    var y = margin.top + ( gap.row + height ) * index;

    var position = {
        x: x,
        y: y
    };

    return position;
}

// draw
ortholog.draw = function( svg, index, gene, data, margin, gap, width, height, textWidth, borderWidth ) {
    var position = ortholog.calculatePosition( index, margin, gap, height );
    var rect = ortholog.getRect( position, gap, width, height, textWidth );
    ortholog.drawText( svg, gene, position, height, textWidth );
    ortholog.drawMap( svg, data, rect, borderWidth );
    ortholog.drawRect( svg, rect );
}

// rect
ortholog.getRect = function( position, gap, width, height, textWidth ) {
    var rect = {
        x: position.x + textWidth + gap.column,
        y: position.y,
        width: width,
        height: height
    };

    return rect;
}

// draw rect
ortholog.drawRect = function( svg, rect ) {
    svg.append( 'rect' )
       .attr( 'x', rect.x )
       .attr( 'y', rect.y )
       .attr( 'width', rect.width )
       .attr( 'height', rect.height )
       .attr( 'stroke', 'black' )
       .attr( 'fill', 'none' )
       .attr( 'stroke-width', 1 );
}

// draw text
ortholog.drawText = function( svg, gene, position, height, textWidth ) {
    svg.append( 'text' )
       .attr( 'x', position.x )
       .attr( 'y', position.y + height / 2 )
       .attr( 'width', textWidth )
       .attr( 'alignment-baseline', 'middle' )
       .text( gene );
}

// draw map
ortholog.drawMap = function( svg, data, rect, borderWidth ) {
    svg.selectAll( 'path' )
       .data( data )
       .enter()
       .append( 'rect' )
       .attr( 'x', function( d, i ) {
           return borderWidth * ( d.id - 1 ) + rect.x;
       })
       .attr( 'y', rect.y )
       .attr( 'width', borderWidth )
       .attr( 'height', rect.height )
       .attr( 'stroke', 'none' )
       .attr( 'fill', function( d, i ) {
           return d.color;
       })
       .append( 'title' )
       .text( function( d ) {
           var title = "ID: " + d.id + "\n"
                     + "Scientific Name: " + d.scientific_name + "\n"
                     + "Common Name: " + d.common_name + "\n"
                     + "Comment: " + d.comment + "\n"
                     + "Time: " + d.time;
            return title;
       });
}

// get color
ortholog.getColor = function( comment ) {
    var color = 'navy';
    if( comment == 'Mammals' ) {
        color = '#31292b';
    }
    else if( comment == 'Other vertebrates' ) {
        color = '#515153';
    }
    else if( comment == 'Lancelets/tunicates' ) {
        color = '#6a6c6e';
    }
    else if( comment == 'Echinoderms/hemichordata' ) {
        color = '#929396';
    }
    else if( comment == 'Arthropods' ) {
        color = '#00b6ae';
    }
    else if( comment == 'Nematodes' ) {
        color = '#008dcb';
    }
    else if( comment == 'Cnidaria' ) {
        color = '#84460a';
    }
    else if( comment == 'Sponge/Placozoa' ) {
        color = '#995c2e';
    }
    else if( comment == 'Choanoflagellates' ) {
        color = '#c98c5c';
    }
    else if( comment == 'Fungi' ) {
        color = '#ffb83d';
    }
    else if( comment == 'Amoebozoa' ) {
        color = '#e2e100';
    }
    else if( comment == 'Plantae' ) {
        color = '#82cd44';
    }
    else if( comment == 'Other protists' ) {
        color = '#f11831';
    }

    return color;
}
