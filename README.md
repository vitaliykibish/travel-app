# Travel App

This app helps you to find a convenient flights from your offices.
It presents a list of flights for each direction based on your location including weather.

## Table of contents

- [Travel App](#travel-app)
  - [Table of contents](#table-of-contents)
  - [Stack](#stack)
  - [Getting Started](#getting-started)
  - [API](#api)
  - [Code example](#code-example)
    - [Hooks](#hooks)
      - [useFetch](#usefetch)
    - [Components](#components)
      - [Data](#data)
      - [UI](#ui)
  - [Reflection](#reflection)
  - [TODO](#todo)

## Stack

- React (create-react-app for better experience)
- Typescript (good to have during working with unfamiliar REST API)
- CSS Modules

## Getting Started

```sh
npm install
npm start
```

## API

- Weather ([OpenWeatherMap API](https://openweathermap.org/api/one-call-api))
- Flights ([KIWI API](https://docs.kiwi.com/#flights-flights))

## Code example

### Hooks

#### useFetch

Fetching data with simple caching and abort for unmounted components.

```JSX
import useFetch from 'hooks/useFetch';

const App = () => {
  const { loading, error, data } = useFetch('/api/weather');
}
```

### Components

#### Data

Provides weather details for the next 7 days.

```JSX
<WeatherWeekData lat={52.3667} lon={4.8945}>
  {(data) => {
    // render UI
  }}
</WeatherWeekData>
```

Provides cheep flights for the next 7 days.

```JSX
<FlightsWeekData flyFromCode="AMS" flyToCode="MAD">
  {(data) => {
    // render UI
  }}
</FlightsWeekData>
```

#### UI

Renders daily flight direction with price and weather.

```JSX
<FlightWithWeather
  dateMs={1290361282723}
  flyFromCode="MAD"
  flyToCode="AMS"
  tempFrom={21}
  tempTo={23}
  conditionFrom="clear"
  conditionTo="cloud"
  price={89}
/>
```

## Reflection

The next step is to make more complex calls to API and create specific matches for price and weather.

Features:

- special offers based on price and weather
- provide limit of days with preferable weather at destination location
- add return flights with similar requirements (also can be like special offer)

## TODO

- improve API caching
- add sorting by price/weather
- improve UI/UX (mobile/desktop)
- add additional layout components
- add datepicker
- use state manager for better scaling app
- add tests
