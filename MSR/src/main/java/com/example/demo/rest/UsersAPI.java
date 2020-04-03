package com.example.demo.rest;


import com.example.demo.models.Users;
import com.example.demo.service.UsersService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/user"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class UsersAPI {

    private final UsersService userService;

    public UsersAPI(UsersService userService) {
        this.userService = userService;
    }


    @PostMapping
    public Users AddUser(@RequestParam("name") String name, @RequestParam("email") String email,
                         @RequestParam("password") String password) {

        return userService.addUser(name,email,password);
    }


    @GetMapping
    public Users getUser(@RequestParam("email") String email, @RequestParam("password") String password) {

        return userService.getUser(email,password);
    }


    @GetMapping(value = "/get_all_users")
    public List<Users> getAllUser() {

        return userService.getAllUsers();
    }

    @GetMapping(value = "/get_all_users_with_fantasy_teams")
    public List<Users> getAllUsersWithFantasyTeams() {

        return userService.getAllUsersWithFantasyTeams();
    }



}
