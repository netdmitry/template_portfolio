function init() {
   
    var mapOptions = {
        
        zoom: 7,
        scrollwheel:false,

        center: new google.maps.LatLng(53.905799, 27.560918), 

        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#E7A731"}]}]
    };

   
    var mapElement = document.getElementById('map');


    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(53.905799, 27.560918),
        map: map,
        title: 'Snazzy!'
    });
}

module.exports ={
    init : init
};