import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import City from './City';

const citiesMap = {
  A: {
    name: 'Bangkok',
    lat: 13.7563,
    lng: 100.5018,
  },
  B: {
    name: 'Pattaya',
    lat: 12.9236,
    lng: 100.8825,
  },
  C: {
    name: 'Chiang Mai',
    lat: 18.7061,
    lng: 98.9817,
  },
  D: {
    name: 'Phitsanulok',
    lat: 16.8211,
    lng: 100.2659,
  },
  E: {
    name: 'Khon Kaen',
    lat: 16.4322,
    lng: 102.8236,
  },
  F: {
    name: 'Chumphon Province',
    lat: 10.493,
    lng: 99.18,
  },
};

const exampleWeights = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1';

const grapth = exampleWeights.split(', ').map((str) => {
  const from = citiesMap[str[0]];
  const to = citiesMap[str[1]];
  const weight = parseInt(str[2], 10);
  return {
    from,
    to,
    weight,
  };
});

export default class ThailandMap extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const selectedPath = null;

    return (
      <div className="map">
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
            return (
              <City
                inactive={selectedPath && !selectedPath.includes(city)}
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
