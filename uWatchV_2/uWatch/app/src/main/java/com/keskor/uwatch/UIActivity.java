package com.keskor.uwatch;


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
import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.security.MessageDigest;


public class UIActivity extends ActionBarActivity implements View.OnClickListener {


    private static final int CAMERA_REQUEST = 0;
    private static final int VIDEO_REQUEST = 0;
    ImageView imageViewer;
    Button buttonPhoto;
    Button buttonVideo;
    Button buttonAudio;
    Intent cameraIntent;
    Intent videoIntent;
    Intent audioIntent;
    Bitmap takenPhoto;
    String selectedImagePath;
    String picturePath;
    Uri mCapturedImageURI;
    Uri uriSavedImage;
    File image;

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
        imageViewer = (ImageView) this.findViewById(R.id.imageView);
        buttonPhoto = (Button) this.findViewById(R.id.photoButton);
        buttonVideo = (Button) this.findViewById(R.id.videoButton);
        buttonAudio = (Button) this.findViewById(R.id.voiceButton);

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
            case R.id.photoButton:
                cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                /*ContentValues values = new ContentValues();
                //values.put(MediaStore.Images.Media.TITLE, "u_watch.jpg");
                values.put(android.provider.MediaStore.Images.Media.TITLE,"u_watch.jpg");
                mCapturedImageURI  = getContentResolver().insert(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                cameraIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, mCapturedImageURI);
                startActivityForResult(cameraIntent, CAMERA_REQUEST);*/
                //Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
                //Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                //Create folder
                File imagesFolder = new File(Environment.getExternalStorageDirectory(), "uWatch/image");
                imagesFolder.mkdirs();
                //Assign name for image
                String f_name = "uWatch-" + System.currentTimeMillis() + ".jpg";
                image= new File(imagesFolder, f_name);
                uriSavedImage = Uri.fromFile(image);
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, uriSavedImage);
                //launch camera app with result code (forResult)
                startActivityForResult(cameraIntent, 1);
                break;

            case R.id.videoButton:
                videoIntent = new Intent(android.provider.MediaStore.ACTION_VIDEO_CAPTURE);
                startActivityForResult(videoIntent,VIDEO_REQUEST);
                break;

            case R.id.voiceButton:
                //audioIntent = new Intent();
                break;

        }

    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == 1 && resultCode == RESULT_OK)
        {
            selectedImagePath = getRealPathFromURI(uriSavedImage);
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

        }


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


        public void hashImage(String path) throws Exception
        {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            FileInputStream fis = new FileInputStream(path);

            byte[] dataBytes = new byte[1024];

            int n_read = 0;
            while ((n_read = fis.read(dataBytes)) != -1) {
                md.update(dataBytes, 0, n_read);
            };
            byte[] md_bytes = md.digest();

            //convert the byte to hex format method 1
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < md_bytes.length; i++) {
                sb.append(Integer.toString((md_bytes[i] & 0xff) + 0x100, 16).substring(1));
            }

            System.out.println("Hex format : " + sb.toString());

        }


}
