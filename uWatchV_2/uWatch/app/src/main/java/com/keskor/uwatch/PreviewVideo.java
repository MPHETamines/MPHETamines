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
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.util.List;

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
                Uri uriSavedVideo = Uri.fromFile(video);
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
                StringBody hash = new StringBody(hashPDE(filePath));
                MultipartEntity en = new MultipartEntity();
                en.addPart("capturedPDE", capturedFile);
                en.addPart("hash", hash);
                httppost.setEntity(en);

                System.out.println("executing request " + httppost.getRequestLine());

                try {


                    DefaultHttpClient httpclient = (DefaultHttpClient)  Wrapper.getNewHttpClient();
                    httpclient.setKeepAliveStrategy(new ConnectionKeepAliveStrategy() {
                        @Override
                        public long getKeepAliveDuration(HttpResponse response, HttpContext httpContext) {
                            final HeaderElementIterator it = new BasicHeaderElementIterator(response
                                    .headerIterator(HTTP.CONN_KEEP_ALIVE));
                            while (it.hasNext()) {
                                final HeaderElement he = it.nextElement();
                                final String param = he.getName();
                                final String value = he.getValue();
                                if (value != null && param.equalsIgnoreCase("timeout")) {
                                    try {
                                        return Long.parseLong(value) * 1000;
                                    } catch (final NumberFormatException ignore) {
                                    }
                                }
                            }
                            return 30 * 1000;
                        }
                    });
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

    public String hashPDE(String path) throws Exception
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

        return sb.toString();


    }



}
