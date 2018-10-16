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
