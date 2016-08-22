import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import {AboutPage} from '../about/about';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  last_update: number;
  total_cars_in_tunnel: number
  total_cars_in_mc30: number;
  alerts: string;

  http: Http;
  loadingCtrl: LoadingController;
  alertController: AlertController;
  navController: NavController;

  constructor(private _http: Http, private _loadingCtrl: LoadingController,
              private _alertController: AlertController,
              private _navController: NavController) {
    this.http = _http;
    this.loadingCtrl = _loadingCtrl;
    this.alertController = _alertController;
    this.navController = _navController;

    this.updateData();
  }

  update() {
    this.updateData();
  }

  showInfo() {
    this.navController.push(AboutPage);
  }

  private updateData() {
    let loadingText = this.createAndPresentLoadingText();
    this.http.get('http://mc30-status.alvarobermejo.com:7070/status').map(res => res.json()).subscribe(data => {
      this.last_update = Date.parse(data.last_update);
      this.total_cars_in_mc30 = data.total_cars_in_mc30;
      this.total_cars_in_tunnel = data.total_cars_in_tunnel;

      this.alerts = data.alerts;

      loadingText.dismiss();

      console.log(data);
    });
  }

  private createAndPresentLoadingText() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present()

    return loading;
  }
}
