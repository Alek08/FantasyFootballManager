package com.example.demo.service;

import com.example.demo.models.Player;
import com.example.demo.models.Team;

import java.util.List;


public interface PlayerService {


    Player createPlayer(String name, String teamName,String pos);

    List<Player> getAllPlayers();

    List<Player> getAllPlayersInPos(String pos,Integer teamId);


    List<Player> getTopPlayers();



    List<Player> findAllPlayersInTeam(Integer teamId);

    Player updatePlayers(String oldName, String name,Integer total_points);

    void deletePlayer(String name);

    Player findByName(String name);
}