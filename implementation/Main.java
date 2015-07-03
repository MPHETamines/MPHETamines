/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author harry
 */
public class Main {
    GPSTracker gps = new GPSTracker(this);
    if(gps.canGetLocation()){ // gps enabled} // return boolean true/false

        //Getting Latitude and Longitude
        gps.getLatitude(); // returns latitude
        gps.getLongitude(); // returns longitude

        //Showing GPS Settings Alert Dialog
        gps.showSettingsAlert();

        Stop using GPS
        gps.stopUsingGPS();
    }
    else{
        //gps not enabled
    }
}
