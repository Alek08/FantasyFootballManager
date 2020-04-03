package com.example.demo.service;

import com.example.demo.models.Users;

import java.util.List;

public interface UsersService {

    Users getUser(String email, String password);

   List<Users>  getAllUsers();
   List<Users>  getAllUsersWithFantasyTeams();

    Users addUser(String name, String email, String password);
}
