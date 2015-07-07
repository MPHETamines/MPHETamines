package com.keskor.uwatch;


import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;


public class UIActivity extends Activity implements View.OnClickListener {


    private static final int CAMERA_REQUEST = 0;
    private static final int CAMERA_CAPTURE_IMAGE_REQUEST_CODE = 100;
    private static final int CAMERA_CAPTURE_VIDEO_REQUEST_CODE = 200;
    private static final int AUDIO_CAPTURE_REQUEST_CODE = 300;
    private static final int VIDEO_REQUEST = 0;
    private static final int MEDIA_TYPE_IMAGE = 1;
    private static final int MEDIA_TYPE_VIDEO=2;
    private static final int MEDIA_TYPE_AUDIO=3;
    ImageView imageViewer;
    ImageButton buttonPhoto;
    ImageButton buttonVideo;
    ImageButton buttonAudio;
    Intent cameraIntent;
    Intent videoIntent;
    Intent audioIntent;
    Bitmap takenPhoto;
    String selectedImagePath;
    String picturePath;
    Uri mCapturedImageURI;
    Uri uriSavedImage;
    File image;
    String storagePath;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ui);

        initialize();
        //InputStream is = getResources().openRawResource(R.drawable.ic_launcher);
        //takenPhoto = BitmapFactory.decodeStream(is);
    }


    private void initialize()
    {
        //imageViewer = (ImageView) this.findViewById(R.id.imageView);
        buttonPhoto = (ImageButton) this.findViewById(R.id.uWatchPhoto);
        buttonVideo = (ImageButton) this.findViewById(R.id.uWatchVideo);
        buttonAudio = (ImageButton) this.findViewById(R.id.uWatchAudio);

        buttonPhoto.setOnClickListener(this);
        buttonVideo.setOnClickListener(this);
        buttonAudio.setOnClickListener(this);

    }

    @Override
    public void onClick(View v)
    {

        //Perform action based on which button is Clicked
        switch (v.getId())
        {
            case R.id.uWatchPhoto:
                //cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                /*ContentValues values = new ContentValues();
                //values.put(MediaStore.Images.Media.TITLE, "u_watch.jpg");
                values.put(android.provider.MediaStore.Images.Media.TITLE,"u_watch.jpg");
                mCapturedImageURI  = getContentResolver().insert(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                cameraIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, mCapturedImageURI);
                startActivityForResult(cameraIntent, CAMERA_REQUEST);*/
                //Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
                //Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                //Create folder
               /* File imagesFolder = new File(Environment.getExternalStorageDirectory(), "uWatch/image");
                imagesFolder.mkdirs();
                //Assign name for image
                String f_name = "uWatch-" + System.currentTimeMillis() + ".jpg";
                image= new File(imagesFolder, f_name);
                uriSavedImage = Uri.fromFile(image);
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, uriSavedImage);
                //launch camera app with result code (forResult)
                startActivityForResult(cameraIntent, CAMERA_CAPTURE_IMAGE_REQUEST_CODE); */

                Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                uriSavedImage = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                i.putExtra(MediaStore.EXTRA_OUTPUT, uriSavedImage);
                startActivityForResult(i, CAMERA_CAPTURE_IMAGE_REQUEST_CODE);
                break;

            case R.id.uWatchVideo:
                videoIntent = new Intent(android.provider.MediaStore.ACTION_VIDEO_CAPTURE);
                startActivityForResult(videoIntent,VIDEO_REQUEST);
                break;

            case R.id.uWatchAudio:
                audioIntent = new Intent(this, RecordAudio.class);
                startActivityForResult(audioIntent,AUDIO_CAPTURE_REQUEST_CODE);
                break;

        }

    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        //if (requestCode == 1 && resultCode == RESULT_OK)
        //{
            /*selectedImagePath = getRealPathFromURI(uriSavedImage);
            Log.v("selectedImagePath", selectedImagePath);
            //imageViewer.setImageBitmap( BitmapFactory.decodeFile(selectedImagePath));
            try
            {
                hashImage(selectedImagePath);
            } catch (Exception e)
            {
                e.printStackTrace();
            }

            Bitmap photo = (Bitmap) data.getExtras().get("data");
            imageViewer.setImageBitmap(photo);

            //Bitmap photo = (Bitmap) data.getExtras().get("data");
            //imageViewer.setImageBitmap(photo);
            /*
            Bundle extras = data.getExtras();
            takenPhoto = (Bitmap) extras.get("data");
            imageViewer.setImageBitmap(takenPhoto);
            */

        try {


            super.onActivityResult(requestCode, resultCode, data);

            if (requestCode == CAMERA_CAPTURE_IMAGE_REQUEST_CODE) {
                if (resultCode == RESULT_OK) {
                    // successfully captured the image
                    // launching upload activity
                    previewImageActivity(true);


                } else if (resultCode == RESULT_CANCELED) {
                    // user cancelled Image capture
                    Toast.makeText(getApplicationContext(), "User cancelled image capture", Toast.LENGTH_SHORT).show();
                } else {
                    // failed to capture image
                    Toast.makeText(getApplicationContext(), "Sorry! Failed to capture image", Toast.LENGTH_SHORT).show();
                }
            }

            //}

        }catch (Exception e)
        {
            e.printStackTrace();
            System.out.println("I got here");
        }
    }

    private void previewImageActivity(boolean b) {
        // TODO Auto-generated method stub
        try {
            Intent i = new Intent(this, PreviewImage.class);
            i.putExtra("filePath", uriSavedImage.getPath());
            Toast.makeText(getApplicationContext(), uriSavedImage.getPath(), Toast.LENGTH_SHORT).show();

            //i.putExtra("GeoLation", location);
            i.putExtra("isImage", b);
            startActivity(i);
        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }


    private Uri getOutputMediaFileUri(int mediaTypeImage) {
        // TODO Auto-generated method stub
        return Uri.fromFile(getOutputMediaFile(mediaTypeImage));
    }


    private File getOutputMediaFile(int type) {
        // TODO Auto-generated method stub
        File mediaStorage = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"Camera");
        if(!mediaStorage.exists()){

            if(!mediaStorage.mkdirs()){

                //Log.d(TAG, "Failed to create"+ Configuration.IMAGE_DIRECTORY_NAME+" driectory");
                return null;
            }

        }

        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
                Locale. getDefault() ) . format(new Date() ) ;
        File mediaFile = null;
        if (type == MEDIA_TYPE_IMAGE) {

            mediaFile = new File(mediaStorage.getPath() + File.separator + "IMG_" + timeStamp + ".jpg") ;
            storagePath =mediaFile.getPath();

        } else if (type == MEDIA_TYPE_VIDEO) {

            mediaFile = new File(mediaStorage. getPath() + File. separator + "VID_" + timeStamp + ".mp4") ;
            storagePath =mediaFile.getPath();

        } else {
            return null;
        }

        return mediaFile;
    }


    public String getRealPathFromURI(Uri contentUri)
    {
        String res = null;
        String[] my_data = {android.provider.MediaStore.Images.Media.DATA };
        Cursor cursor = getContentResolver().query(contentUri, my_data, null, null, null);
        if(cursor.moveToFirst())
        {
            int column_index = cursor.getColumnIndexOrThrow(android.provider.MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
        }
        cursor.close();
        return res;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_ui, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }





}
