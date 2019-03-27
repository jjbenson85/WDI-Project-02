# General Assembly Project 2 : React Hackathon

### Timeframe
36 hours

## Technologies used

* JavaScript - React
* HTML5
* CSS - SCSS - Bulma
* GitHub
* Web APIs - Zomato - FSA
* Maps - Mapbox GL JS

## Installation

1. Clone or download the repo
1. ```Yarn``` to install packages
1. ```Yarn run build```
1. ```Yarn run start```
1. Open your local host on port 4000

## React Hackathon - Heath & Tasty

![Health & Tasty](https://user-images.githubusercontent.com/34242042/55016239-40381380-4fe6-11e9-8916-5295ebe85b70.png)


You can find a hosted version here ----> [Live: Health & Tasty](https://health-and-tasty.herokuapp.com/)

### Project overview
Health & Tasty was the result of a 36 hour React Hackathon and was co-created and pair coded with Edward Lea. Health & Tasty uses the Zomato restaurant API and food standards agency’s API to show the hygiene rating of nearby restaurants. Restaurant locations are plotted on a map of the users surrounding area using [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).


### Instructions
1. Once the site has loaded in your browser, click to allow location information access.

2. Health & Tasty will then use your location to find nearby restaurants.

3. Scroll right to see more restaurants.

4. Note the FSA Hygiene rating of each restaurants!

5. Click on a restaurant to view more details.

## Process

This project was a pair project as part of the General Assembly Web Development Immersive course. We had a day and a half to produce a Single Page Application built in React using available web APIs.

I was paired with [Edward Lea](https://github.com/EdwardLea). We started by coming up with areas that we were both interested in and decided upon food. Ed said that he had recently wished to know the hygiene rating of restaurants but the data isn't available from google maps, and I thought that was a great idea!

We searched online and found the official [FSA](http://api.ratings.food.gov.uk/help) api and the [Zomato](https://developers.zomato.com/api) restaurant API and tested them using Insomnia, a REST client [Insomnia](https://insomnia.rest/).


![Health TastyZomatoInsomnia](https://user-images.githubusercontent.com/34242042/55014159-62c82d80-4fe2-11e9-8e8f-d8f1414e1f38.png)


We drew some Wireframes on paper.

The two main concepts we explored were a 'Tinder' style swipe index page (left page) and a map based index page (right page).
![Health & Tasty Wireframes](https://user-images.githubusercontent.com/34242042/55010891-f7c82800-4fdc-11e9-9a0a-a692caa03617.jpg)

We settled on the 'Tinder' style and I created a mock-up in [Draw.io](https://www.draw.io/) an online drawing application just to try out some different styles. 

![Health TastyMockup4](https://user-images.githubusercontent.com/34242042/55012722-be44ec00-4fdf-11e9-8f56-d99c36fb32f1.png)

![Health TastyMockup2](https://user-images.githubusercontent.com/34242042/55011638-10850d80-4fde-11e9-92f4-a2e147576c6f.png)

Though we didn't copy these mockups in the end, it was really good just to try a few things out and see what felt right.

When it came to the actual coding we decided to pair code the entire project. Pair coding was a really great experience as we would catch each others silly mistakes and both be able to discuss ideas and solutions to problems.

We used [axios](https://github.com/axios/axios) to make AJAX requests to Zomato and the FSA using our longitude and latitude coordinates and got it to display data in the console.

We then combined the data from the APIs and displayed a list of establishments we had available from both APIs.

We then build out the React components:
- PlacesCard.js to show a single establishment
- PlacesIndex.js component to show all the result Cards
- PlacesShow.js component to display more information about a selected establishment.
- Map.js  used MapboxGl to display the users location and the location of a restaurant.
- Home.js is a simple landing page
- Loading.js is rendered whenever we are waiting for something to complete, such as an API request.
- Header.js was built as a simple site navigation/brand logo holder and back button, but we decided to not use it so it was not completed.

We used the [Bulma](https://bulma.io/) CSS framework as it is very quick and easy to get something presentable quickly.

We styled the site based on the results of the mockups, but didn't copy them exactly. We decided that we wanted images of restaurants as a background image and we used images from the Zomato api for the establishment images. If none were supplied we used stock placeholder images.

### Challenges

The main challenge of the project was combining the two APIs together.

Using insomnia we could see that we would need to match an establishment from the FSA database to the Zomato database using a common key. We decided we would use the Zomato 'name' field and FSA 'BusinessName' fields.

![FSASearchResult](https://user-images.githubusercontent.com/34242042/55015225-5a70f200-4fe4-11e9-914c-2883d244773e.png)

![ZomatoSearchResult](https://user-images.githubusercontent.com/34242042/55015226-5a70f200-4fe4-11e9-8669-16f01d501c48.png)



We would make a request to Zomato and be given the 20 closest establishments per request, (this is a limit imposed by Zomato), but even using 1000 responses from the FSA we would only get a couple of matches, so we spent a lot of time trying to improve our hit rate.

One way we did this was by removing all the 'and's, '&'s, 'the's, '''s, '-'s and spaces from the names and changing them to lowercase from both APIs.  This would help ensure that if any of the business names had been entered in the databases in a different way we could still get a match. for instance...

- The Dog & Bull ≠ Dog & Bull
- The Dog And Bull ≠ The Dog and Bull
- The Dog And Bull ≠ Dog And Bull
- Cooper's Wine-bar = Cooper's Winebar
- Cooper's Winebar ≠ Coopers Winebar

However, after removing the extra words and spaces

- dogbull = dogbull
- cooperswinebar = cooperswinebar


Here is the code...
```
const BusinessName = est.BusinessName.toLowerCase()
  .split(' and ').join('')
  .split('the ').join('')
  .split('-').join('')
  .split('\'').join('')
  .split('&').join('')
  .split(' ').join('')
```

This could probably be done with Regex but as we had a tight time limit we just stuck with something that worked.


This method did give us improved results, but was still way short of what we were expecting.

We decided to re-read through the FSA API guide and came across a way to only return establishments within a mile of the supplied geocode coordinates. We could also return the establishments in distance order with the closest first. This change meant that both APIs were supplying restaurants in distance order and greatly increased out hit rate. This in turn enabled us to decrease the total number of establishments we were requesting from the FSA from 1000 to 150 which reduced the request times drastically.


Here is a screenshot of the improved request using insomnia.
![Health TastyInsomnia](https://user-images.githubusercontent.com/34242042/55013416-fe589e80-4fe0-11e9-9835-e641069c1f29.png)

- maxDistanceLimit: 1 is the maximum distance from location in miles.
- longitude and latitude is the center of the search.
- BusinessTypeId: 1 is for Restaurant/Cafe/Canteen.
- sortOptionKey: distance orders results by distance.
- pageSize: 1000 Returns a maximum of 1000 entries per request.


### Wins

1. Map Bounds
  In the map component, we found a way to zoom the map so that the user and the restaurant fitted on the map. It sound's simple and it was! By just using the inbuilt MapBoxGL 'fitBounds' method we could achieve the desired result. (But I really thought it was going to be a struggle!) You can even pass in some padding to leave a gap on the edges of the map.

  ```
  this.props.bound && this.map.fitBounds([[
    longitude,
    latitude
  ], [
    this.props.location.longitude,
    this.props.location.latitude
  ]],{ padding: 40 })
  ```

  this.props.bound is supplied for the Show component, but not supplied for the Home component. This means that if it is not supplied the map.fitBounds method is not called.


2. Deployment
  After the Hackathon we decided to deploy the App to Heroku, however we had trouble with the FSA API as it is not using HTTPS and Heroku does not allow secure and insecure requests.

  To solve this problem we created a small backend to make requests to the FSA and pass them to the front-end, using request-promise to handle the back-end AJAX request.

  This means that the front-end axios request to the FSA are changed.

  ```
  axios
    .get(`http://api.ratings.food.gov.uk/Establishments/?maxDistanceLimit=1&longitude=${lon}&latitude=${lat}&BusinessTypeId=1&sortOptionKey=distance&pageSize=150`, {headers: {accept: 'application/json', 'x-api-version': 2}})
  ```
 Changes to...
  ```
  axios
    .get(`/api/establishments/?longitude=${lon}&latitude=${lat}`)
  ```



## Future features

1. Given more time we would get better background images.

2. Add buttons to the sides to show that you can scroll sideways.

3. Using MapBoxGL to provide walking directions to the restaurant.
