package com.example.demo.service;


import com.example.demo.models.Team;

import java.util.List;

public interface TeamService {

    Team createTeam(String teamName);

    Integer TeamPlayedMatches(String teamName);

    List<Team> getAllTeams();

    List<Integer> MostGoalsSUM();

    List<String> MostGoalsTeams();

     Team updateTeam(String name,int total_points,int wins,int losts,int draws,int played_matches);

    Team findByName(String name);

     void deleteTeam(String name);


}
