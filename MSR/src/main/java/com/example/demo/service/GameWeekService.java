package com.example.demo.service;

import com.example.demo.models.GameWeek;
import com.example.demo.models.Match;

import java.util.List;

public interface GameWeekService {

    GameWeek createGameWeek(String gameWeekName);

    GameWeek addMatchToGameWeek(Integer gameWeekId,Integer matchId);

    List<GameWeek> getAllGameWeeks();



    GameWeek getGameWeek(Integer id);

    GameWeek getGameWeekByName(String name);

    GameWeek updateGameWeek(Integer id,String newname);

    void deleteGameWeek(int id);

}
