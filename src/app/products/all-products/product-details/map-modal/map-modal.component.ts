/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import leaflet from 'leaflet';
import { Map } from 'leaflet';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {
  @Input() title: string;
  @Input() longitude: string;
  @Input() latitude: string;
  @ViewChild('map') mapContainer: ElementRef;
  //map: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.loadMap();
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  loadMap(){
    const map = new Map('map').setView([this.latitude, this.longitude], 11);
    //this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Bee Organic',
      maxZoom: 15
    }).addTo(map);

    const marker = leaflet.marker([this.latitude, this.longitude]).addTo(map);
    const popup = marker.bindPopup('<b>Košnice se nalaze ovde!</b>');
    /*
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationFound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      });
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    });
*/
  }

}
