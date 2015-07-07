

 
import java.io.FileInputStream;
import java.security.MessageDigest;
 
public class SHACheckSumExample 
{
    public static void main(String[] args)throws Exception
    {
        String p="C:\\Users\\TEMP.User-PC.000\\Documents\\picture.jpg";
       hashImage(p);
 
       }
    
    
     public String hashImage(String path) throws Exception
        {
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
 
        System.out.println("Hex format : " + sb.toString());
        return sb.toString();
        }

     
}