// URL for json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// fetch json data & initlizing drop down

function graphs() {
    let dropdownbar = d3.select('#selDataset');

    d3.json(url).then((data) => {
        console.log(data);

        let names = data.names;
        names.forEach((name) => {
            dropdownbar.append('option').text(name).property('value', name);
        });
            let name = names[0];

            bar(name);
            bubble(name);
            demographic(name);

    });
}

//creating trace bar chart, data array, and plotting bar chart 

function bar(x) {
    d3.json(url).then((data) => {
        console.log(data);

        let results = data.samples;

        let value = results.filter(result => result.id == x);

        let valueData = value[0];

        //creating trace 
        let trace = [{
            x: valueData.sample_values.slice(0,10).reverse(),
            y: valueData.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: valueData.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        //creating plot 
        Plotly.newPlot('bar', trace);
    })
}

// create trace for bubble chart, data array, and plotting

function bubble(x) {
    d3.json(url).then((data) => {

        // setting values 
        let results = data.samples;

        let value = results.filter(result => result.id == x);

        let valueData = value[0];

        //trace for bubble
        let trace = [{
            x: valueData.otu_ids,
            y: valueData.sample_values,
            text: valueData.otu_labels,
            mode: 'markers',
            marker: {
                size: valueData.sample_values,
                color: valueData.otu_ids,
                colorscale: 'Earth'
            }
        }];

        //layout for bubble 
        let layout = {
            xaxis: {title: 'OTU ID'}
        };

        //plotting bubble 
        Plotly.newPlot('bubble', trace, layout);
    });
}


//individuals demographic data info 

function demographic(x) {
    d3.json(url).then((data) => {
        console.log(data);

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == x);

        let valueData = value[0];

        d3.select('#sample-metadata').html('');

        let entries = Object.entries(valueData);

        entries.forEach(([key, value]) => {
            d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
        });

        console.log(entries)

    });
}


//handle drop down change event 
function change_option(x) {

    bar(x);
    bubble(x);
    demographic(x);

}

//initilize charts 
graphs()





