$(document).ready(function () {
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
});
