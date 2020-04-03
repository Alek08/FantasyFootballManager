package com.example.demo.repository;

import com.example.demo.models.FantasyTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FantasyTeamRepository extends JpaRepository<FantasyTeam,Integer> {

    @Query("select f from FantasyTeam as f where f.name=:name")
    FantasyTeam FindByName(String name);



}
