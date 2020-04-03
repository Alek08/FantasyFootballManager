package com.example.demo.rest;


import com.example.demo.models.FantasyTeam;
import com.example.demo.models.Player;
import com.example.demo.service.FantasyTeamService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/fantasyteam"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class FantasyTeamAPI {

    FantasyTeamService fantasyTeamService;

    public FantasyTeamAPI(FantasyTeamService fantasyTeamService) {
        this.fantasyTeamService=fantasyTeamService;
    }

    @PostMapping("/add_fantasy_team")
    public FantasyTeam createFantasyTeam(@RequestBody FantasyTeam fantasyTeam) {
        return fantasyTeamService.createFantasyTeam(fantasyTeam);
    }


    @GetMapping("/get_all_fantasy_teams")
    public List<FantasyTeam> getAllFantasyTeams() {
        return fantasyTeamService.getAllFantasyTeams();
    }



}
