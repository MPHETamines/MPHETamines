package com.keskor.uwatch;

import android.app.Activity;
import android.media.ExifInterface;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;

/**
 * Created by herb-adventure on 7/8/2015.
 */
public class ExifData  {

    String path;
    public ExifData(String _path)
    {
        path=_path;

    }


    public String readExif()
    {
        ExifInterface exif= null;
        try {
            exif = new ExifInterface(path);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String locationData ="LOCATION DATA SUMMARY\n";
        locationData+=getString(ExifInterface.TAG_GPS_DATESTAMP,exif);
        locationData+=getString(ExifInterface.TAG_GPS_TIMESTAMP,exif);
        locationData+=getString(ExifInterface.TAG_GPS_ALTITUDE,exif);
        locationData+=getString(ExifInterface.TAG_GPS_LONGITUDE,exif);
        locationData+=getString(ExifInterface.TAG_GPS_LATITUDE,exif);


        return locationData;
    }




    public String getString(String tag,ExifInterface e)
    {
        return tag + " : " + e.getAttribute(tag) + "\n";
    }


}
