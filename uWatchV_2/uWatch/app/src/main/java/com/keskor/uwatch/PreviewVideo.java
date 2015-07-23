package com.keskor.uwatch;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import org.apache.http.HeaderElement;
import org.apache.http.HeaderElementIterator;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectionKeepAliveStrategy;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeaderElementIterator;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.List;

import javax.crypto.Cipher;

/**
 * Created by Keskor on 04-Jul-15.
 */
public class PreviewVideo extends Activity
{

    VideoView previewVideo;
    DisplayMetrics dm;
    SurfaceView sur_View;
    MediaController media_Controller;
    Button sendToServer;
    String filePath;
    String responseFromServer;
    ExifData ed;
    TextView tv;
    Uri uriSavedVideo;
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.preview_video);


        initialize();

    }

    private void initialize()
    {


        //ed.readExif();
        try
        {




                previewVideo = (VideoView) this.findViewById(R.id.myVideoView);
                sendToServer = (Button) this.findViewById(R.id.send_to_server);
                filePath = getIntent().getStringExtra("filePath");
                tv = (TextView) this.findViewById(R.id.locationText);
                ed = new ExifData(filePath);
                tv.setText(ed.readExif());

                File video = new File(filePath);
                 uriSavedVideo = Uri.fromFile(video);
                previewVideo.setVideoURI(uriSavedVideo);

            media_Controller = new MediaController(this);
            dm = new DisplayMetrics();
            this.getWindowManager().getDefaultDisplay().getMetrics(dm);
            int height = dm.heightPixels;
            int width = dm.widthPixels;
            previewVideo.setMinimumWidth(width);
            previewVideo.setMinimumHeight(height);
            previewVideo.setMediaController(media_Controller);
            //video_player_view.setVideoPath("");
            previewVideo.seekTo(100);
            previewVideo.start();







            //previewImage.setOnClickListener(this);
            sendToServer.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v)
                {
                    List<NameValuePair> values = null;
                    new RequestSender().execute(values);

                }
            });
        }catch(Exception e)
        {
            e.printStackTrace();
        }



    }

    public class RequestSender extends AsyncTask<List<NameValuePair>, Integer,String> {

        @Override
        protected String doInBackground(List<NameValuePair>... params)
        {
            // TODO Auto-generated method stub
            try
            {
                System.out.println("Im sending to server now");
                responseFromServer = request(Configuration.ServerURL, params[0]);


            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            return responseFromServer;
        }

        @Override
        protected void onPostExecute(String result)
        {
            // TODO Auto-generated method stub
            super.onPostExecute(result);
            try {
                // if successful go to loggin
                //processResponse();
                tv.setText("Server message is "+result);


            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        @Override
        protected void onPreExecute()
        {
            // TODO Auto-generated method stub
            super.onPreExecute();
        }
    }

   /* @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == RESULT_OK)
        {
            onCreate(new Bundle());
        }

    }*/


    public String request(String url,  List<NameValuePair> pairs) throws Exception {
        try{
            /**
             * Get Captured File location
             */

            HttpPost httppost = new HttpPost(url);
            File file = new File(filePath);
            if(file.exists()) {
                FileBody capturedFile = new FileBody(file);
                StringBody hash = new StringBody(hashencryptFile(filePath));
                MultipartEntity en = new MultipartEntity();
                en.addPart("capturedPDE", capturedFile);
                en.addPart("hash", hash);
                httppost.setEntity(en);

                System.out.println("executing request " + httppost.getRequestLine());

                try {


                    DefaultHttpClient httpclient = (DefaultHttpClient)  Wrapper.getNewHttpClient();
                    HttpResponse res = httpclient.execute(httppost);
                    System.out.println(res.getStatusLine() + " & STATUS CODE IS "+ res.getStatusLine().getStatusCode());
                    BufferedReader in = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
                    String line = "";
                    StringBuffer sb = new StringBuffer();
                    String NL = System.getProperty("line.separator");
                    while ((line = in.readLine()) != null) {
                        sb.append(line + NL);
                    }
                    in.close();
                    return sb.toString();
                } catch(Exception ex){
                    ex.printStackTrace();
                }
            }else{
                Log.e("Debug", "Request Failed.");
            }


        }catch (Exception e){
            Log.e("Debug", e.getMessage());
            e.printStackTrace();
        }

        return null;
    }


    //hashing/encryption/decryptiion
    public static final String ALGORITHM = "RSA";
    public final String PRIVATE_KEY_FILE =uriSavedVideo.getPath()+"\\\\keys\\\\private.key";
    public  final String PUBLIC_KEY_FILE =uriSavedVideo.getPath()+"\\\\keys\\\\public.key";

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
