package com.keskor.uwatch;

/**
 * Created by Martina on 7/7/2015.
 */
public class Users {

    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;

    public Users(String name,String surname,String username,String email,String password)
    {
        super();
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Users(String username,String password)
    {
        super();
        this.username = username;
        this.password = password;
    }

    public  String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public  String getSurname()
    {
        return surname;
    }

    public void setSurname(String surname)
    {
        this.surname = surname;
    }

    public  String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
