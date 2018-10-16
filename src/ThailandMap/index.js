import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { citiesMap, roads, getAllPossiblePaths } from './MapData';
import City from './City';
import Paths from './Paths';

export default class ThailandMap extends Component {
  state = {
    start: null,
    end: null,
    selectedPath: null,
  };

  computePaths = () => {
    const { start, end } = this.state;

    this.setState({
      paths: getAllPossiblePaths(start, end, roads),
      selectedPath: null,
    });
  };

  selectPath = selectedPath => this.setState({ selectedPath });

  handleGoogleMapApi = (google) => {
    this.google = google;
  };

  drawSelectedRoute = () => { // TODO it may leak
    if (this.flightPath) this.flightPath.setMap(null);

    const { selectedPath, paths } = this.state;
    if (selectedPath === null) return;
    const path = paths[selectedPath];

    const lineSymbol = {
      path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    this.flightPath = new this.google.maps.Polyline({
      path: [...path.map(({ from }) => from), path[path.length - 1].to],
      icons: [{
        icon: lineSymbol,
        offset: '100%',
        repeat: '50px',
      }],
      geodesic: true,
      strokeColor: '#33BD4E',
      strokeOpacity: 1,
      strokeWeight: 5,
    });

    this.flightPath.setMap(this.google.map);
  };

  componentDidUpdate = () => {
    if (this.google) this.drawSelectedRoute();
  }

  render() {
    const {
      start, end, paths, selectedPath,
    } = this.state;

    return (
      <div className="map">
        <div className="paths">
          <Paths
            start={start}
            end={end}
            selectPath={this.selectPath}
            selectedPath={selectedPath}
            paths={paths}
          />
        </div>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleGoogleMapApi}
          bootstrapURLKeys={{ key: 'AIzaSyAtN7-KIU2yT68bkrgBXRyIxLL_blLGf4M' }}
          defaultCenter={{
            lat: 14.7563,
            lng: 100.5018,
          }}
          defaultZoom={7}
        >
          {Object.keys(citiesMap).map((key) => {
            const city = citiesMap[key];
            const { name, lat, lng } = city;
            const active = selectedPath !== null
              && paths[selectedPath].find(({ from, to }) => city === from || city === to);

            return (
              <City
                setStart={() => this.setState({ start: city }, this.computePaths)}
                setEnd={() => this.setState({ end: city }, this.computePaths)}
                inactive={!active}
                start={city === start}
                end={city === end}
                key={key}
                lat={lat}
                lng={lng}
                name={name}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}
