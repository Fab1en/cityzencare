jQuery(function($){

    var ambulanceIcon = L.icon({
        iconUrl: '../img/ambulance.png',
        iconSize: [40, 41],
        popupAnchor: [0,-15]
    });

    var map = L.map('main').setView([48, 0.2], 13);
    L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
        maxZoom: 18
    }).addTo(map);
    
    var marker = L.marker([48.0078, 0.1995], {icon: ambulanceIcon} ).addTo(map);
    marker.bindPopup("Ma première ambulance !");
    
    var socket = io.connect('http://localhost:8080');
    socket.on('position', function (data) {
        console.log(data);
        marker.setLatLng(data);
    });

});
