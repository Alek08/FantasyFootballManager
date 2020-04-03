package com.example.demo.service;

import com.example.demo.models.Match;
import com.example.demo.models.Player;
import com.example.demo.models.Team;

import java.util.ArrayList;
import java.util.List;

public interface MatchService {

    Match createMatch(Match match);

    List<Match> getAllMatches();

    Match updateMatch(int id,Match match);

    Match getMatch(Integer id);

    void deleteMatch(int id);



}
