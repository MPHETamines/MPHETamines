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


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import javax.crypto.Cipher;
import java.io.FileInputStream;
import java.security.MessageDigest;

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
    ImageView buttonPhoto;
    ImageView buttonVideo;
    ImageView buttonAudio;
    Intent cameraIntent;
    Intent videoIntent;
    Intent audioIntent;
    Bitmap takenPhoto;
    String selectedImagePath;
    String picturePath;
    Uri mCapturedImageURI;
    Uri uriSavedPDE;
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
        buttonPhoto = (ImageView) this.findViewById(R.id.uWatchPhoto);
        buttonVideo = (ImageView) this.findViewById(R.id.uWatchVideo);
        buttonAudio = (ImageView) this.findViewById(R.id.uWatchAudio);

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
                Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                uriSavedPDE = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                i.putExtra(MediaStore.EXTRA_OUTPUT, uriSavedPDE);
                startActivityForResult(i, CAMERA_CAPTURE_IMAGE_REQUEST_CODE);
                break;

            case R.id.uWatchVideo:
                try
                {
                    recordingVideo();
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                }
                break;

            case R.id.uWatchAudio:
                audioIntent = new Intent(this, RecordAudio.class);
                startActivityForResult(audioIntent,AUDIO_CAPTURE_REQUEST_CODE);
                break;

        }

    }

    private void recordingVideo()
    {
        try
        {
            Intent videoIntent = new Intent(android.provider.MediaStore.ACTION_VIDEO_CAPTURE);
            uriSavedPDE = getOutputMediaFileUri(MEDIA_TYPE_VIDEO);
            videoIntent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY, 1);
            videoIntent.putExtra(MediaStore.EXTRA_OUTPUT, uriSavedPDE);
            startActivityForResult(videoIntent, CAMERA_CAPTURE_VIDEO_REQUEST_CODE);
        }catch(Exception e)
        {
            e.getMessage();
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        try {


            super.onActivityResult(requestCode, resultCode, data);

            super.onActivityResult(requestCode, resultCode, data);

            if (requestCode == CAMERA_CAPTURE_IMAGE_REQUEST_CODE)
            {
                if (resultCode == RESULT_OK)
                {
                    //CALL previewActivity() that will further open a new activity that will upload PDE
                    previewImageActivity(true);

                } else if (resultCode == RESULT_CANCELED) {
                    // user press cancel button
                    Toast.makeText(getApplicationContext(), "You cancelled capture of image", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    // application fail to capture image due to some error
                    Toast.makeText(getApplicationContext(), "Application failed to capture image", Toast.LENGTH_SHORT).show();
                }
            }
            else if(requestCode == CAMERA_CAPTURE_VIDEO_REQUEST_CODE)
            {
                if(resultCode == RESULT_OK)
                {
                    //CALL previewActivity() that will further open a new activity that will upload PDE
                    previewVideoActivity(true);
                }else if (resultCode == RESULT_CANCELED)
                {
                    // user press cancel button
                    Toast.makeText(getApplicationContext(), "You cancelled capture of video", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    // application fail to capture video due to some error
                    Toast.makeText(getApplicationContext(), "Application failed to capture video", Toast.LENGTH_SHORT).show();
                }
            }

        }catch (Exception e)
        {
            e.printStackTrace();
            System.out.println("I got here");
            e.getMessage();
        }
    }

    private void previewImageActivity(boolean b) {
        // TODO Auto-generated method stub
        try {
            Intent i = new Intent(this, PreviewImage.class);
            i.putExtra("filePath", uriSavedPDE.getPath());
            Toast.makeText(getApplicationContext(), uriSavedPDE.getPath(), Toast.LENGTH_SHORT).show();

            //i.putExtra("GeoLation", location);
            i.putExtra("isImage", b);
            startActivity(i);
        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    private void previewVideoActivity(boolean b)
    {
        // TODO Auto-generated method stub
        try {
            Intent i = new Intent(this, PreviewVideo.class);
            i.putExtra("filePath", uriSavedPDE.getPath());
            Toast.makeText(getApplicationContext(), uriSavedPDE.getPath(), Toast.LENGTH_SHORT).show();

            //i.putExtra("GeoLation", location);
            i.putExtra("isVideo", b);
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

            mediaFile = new File(mediaStorage.getPath() + File.separator + "uWatch_" + timeStamp + ".jpg") ;
            storagePath =mediaFile.getPath();

        } else if (type == MEDIA_TYPE_VIDEO) {

            mediaFile = new File(mediaStorage. getPath() + File. separator + "VID_" + timeStamp + ".mp4") ;
            storagePath =mediaFile.getPath();

        } else {
            return null;
        }

        return mediaFile;
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



    //hashing/encryption/decryptiion
    public static final String ALGORITHM = "RSA";
    public final String PRIVATE_KEY_FILE =uriSavedPDE.getPath()+"\\\\keys\\\\private.key";
    public  final String PUBLIC_KEY_FILE =uriSavedPDE.getPath()+"\\\\keys\\\\public.key";

    public  void generateKey() {
        try {
            final KeyPairGenerator keyGen = KeyPairGenerator.getInstance(ALGORITHM);
            keyGen.initialize(1024);
            final KeyPair key = keyGen.generateKeyPair();

            File privateKeyFile = new File(PRIVATE_KEY_FILE);
            File publicKeyFile = new File(PUBLIC_KEY_FILE);

            // Create files to store public and private key
            if (privateKeyFile.getParentFile() != null) {
                privateKeyFile.getParentFile().mkdirs();
            }
            privateKeyFile.createNewFile();

            if (publicKeyFile.getParentFile() != null) {
                publicKeyFile.getParentFile().mkdirs();
            }
            publicKeyFile.createNewFile();

            // Saving the Public key in a file
            ObjectOutputStream publicKeyOS = new ObjectOutputStream(
                    new FileOutputStream(publicKeyFile));
            publicKeyOS.writeObject(key.getPublic());
            publicKeyOS.close();

            // Saving the Private key in a file
            ObjectOutputStream privateKeyOS = new ObjectOutputStream(
                    new FileOutputStream(privateKeyFile));
            privateKeyOS.writeObject(key.getPrivate());
            privateKeyOS.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    public  boolean areKeysPresent() {

        File privateKey = new File(PRIVATE_KEY_FILE);
        File publicKey = new File(PUBLIC_KEY_FILE);

        if (privateKey.exists() && publicKey.exists()) {
            return true;
        }
        return false;
    }

    public byte[] encrypt(String text, PublicKey key) {
        byte[] cipherText = null;
        try {
            // get an RSA cipher object and print the provider
            final Cipher cipher = Cipher.getInstance(ALGORITHM);
            // encrypt the plain text using the public key
            cipher.init(Cipher.ENCRYPT_MODE, key);
            cipherText = cipher.doFinal(text.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cipherText;
    }

    public  String decrypt(byte[] text, PrivateKey key) {
        byte[] dectyptedText = null;
        try {
            // get an RSA cipher object and print the provider
            final Cipher cipher = Cipher.getInstance(ALGORITHM);

            // decrypt the text using the private key
            cipher.init(Cipher.DECRYPT_MODE, key);
            dectyptedText = cipher.doFinal(text);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return new String(dectyptedText);
    }

    public  String hashencryptFile(String path) throws Exception
    {
        //start hashing image
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        FileInputStream fis = new FileInputStream(path);

        byte[] dataBytes = new byte[1024];

        int nread = 0;
        while ((nread = fis.read(dataBytes)) != -1) {
            md.update(dataBytes, 0, nread);
        };
        byte[] mdbytes = md.digest();

        //convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < mdbytes.length; i++) {
            sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        //start encryption
        // Check if the pair of keys are present else generate those.
        if (!areKeysPresent()) {
            // Method generates a pair of keys using the RSA algorithm and stores it
            // in their respective files
            generateKey();
        }

        final String originalText = sb.toString();
        ObjectInputStream inputStream = null;

        // Encrypt the string using the public key
        inputStream = new ObjectInputStream(new FileInputStream(PUBLIC_KEY_FILE));
        final PublicKey publicKey = (PublicKey) inputStream.readObject();
        final byte[] cipherText = encrypt(originalText, publicKey);


        // Decrypt the cipher text using the private key.
        inputStream = new ObjectInputStream(new FileInputStream(PRIVATE_KEY_FILE));
        final PrivateKey privateKey = (PrivateKey) inputStream.readObject();
        final String plainText = decrypt(cipherText, privateKey);

        // Printing the Original, Encrypted and Decrypted Text
        System.out.println("HashValue: " + originalText);
        System.out.println("Encrypted: " +cipherText.toString());
        System.out.println("Decrypted: " + plainText);

        return cipherText.toString();
    }

}
