package com.example.demo.repository;

import com.example.demo.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users,Integer> {

    @Query("select u from Users as u where u.email=:email and u.password=:password")
    Users FindUser(String email, String password);

    @Query("select u from Users as u where u.email=:email")
    Users FindUserByEmail(String email);

    @Query("select u from Users as u where u.fantasyTeam IS NOT NULL")
    List<Users> getAllUsersWithFantasyTeams();


}
