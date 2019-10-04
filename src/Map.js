import React from 'react';
import L from 'leaflet'

class Map extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var coordinates = this.props.coords.split(',');
        this.map = L.map('map').setView(coordinates, 15);
        var attribution = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        var tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution});
        tiles.addTo(this.map);
        L.marker(coordinates).addTo(this.map);
    }

    render(){
        return <div id='map'></div>
    }
}

export default Map;