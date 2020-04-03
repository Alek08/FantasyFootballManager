package com.example.demo.service.impl;

import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.UsersService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UsersService {

    private final UsersRepository userRepository;


    public UserServiceImpl(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Users addUser(String name, String email, String password) {

        Users user=userRepository.FindUserByEmail(email);
        if(user!=null)
        {
            throw new AlreadyExistsException("User with email "+email+" already exists");

        }else{

            Users userUnique=new Users();
            userUnique.setName(name);
            userUnique.setEmail(email);
            userUnique.setPassword(password);

            return userRepository.save(userUnique);
        }



    }

    @Override
    public Users getUser(String email, String password) {

        Users user=userRepository.FindUser(email,password);

        if(user!=null)
        {
            return user;
        }else {
            throw new NotFoundException("User with email "+email+" and password "+password+" not found");
        }
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public List<Users> getAllUsersWithFantasyTeams() {
        return userRepository.getAllUsersWithFantasyTeams();
    }
}
