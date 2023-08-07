$(document).ready(function () {
  // Amenities event listener - OnCheck
  const amenities = {};

  function amenityListener () {
    const checkedAmenities = Object.values(amenities).join(', ');
    $('.amenities > h4').text(checkedAmenities);
  }

  $('.amenities input[type="checkbox"]').on('change', function () {
    const $checkbox = $(this);
    const id = $checkbox.parent().data('id');
    const name = $checkbox.parent().data('name');

    if ($checkbox.is(':checked')) {
      amenities[id] = name;
    } else {
      delete amenities[id];
    }

    amenityListener();
  });

  // Function to fetch and display places from the backend
  function getDbPlaces () {
    const apiUrl = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
    const requestBody = '{}';

    $.ajax({
      url: apiUrl,
      type: 'POST',
      data: requestBody,
      contentType: 'application/json',
      success: function (data) {
        renderPlaces(data);
      },
      error: function (error) {
        console.log('Error fetching places:', error);
      }
    });
  }

  // create <article> tags representing places and append them to the section.places
  function renderPlaces (placesData) {
    const placesSection = $('.places');
    placesSection.empty();

    for (const place of placesData) {
      const articleHTML = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>
      `;
      placesSection.append(articleHTML);
    }
  }

  // API status function:
  function checkAPIStatus () {
    const apiUrl = 'http://' + window.location.hostname + ':5001/api/v1/status/';
    $.get(apiUrl, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // on page load:
  checkAPIStatus();
  getDbPlaces();
});
