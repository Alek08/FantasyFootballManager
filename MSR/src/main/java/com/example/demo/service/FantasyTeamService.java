package com.example.demo.service;

import com.example.demo.models.FantasyTeam;
import com.example.demo.models.Player;

import java.util.List;

public interface FantasyTeamService {

    FantasyTeam createFantasyTeam(FantasyTeam fantasyTeam);

    List<FantasyTeam> getAllFantasyTeams();


}
