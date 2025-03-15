import java.util.HashMap;

public class IDandPasswords {

    HashMap<String,String> logininfo = new HashMap<String,String>();

    public IDandPasswords() {
        
        logininfo.put("admin","password");
        logininfo.put("Ian", "Reyes1!");

   
    }
    protected HashMap getLoginInfo(){
        return logininfo;
    }
    

}
