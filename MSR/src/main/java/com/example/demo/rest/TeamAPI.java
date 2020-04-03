package com.example.demo.rest;

import com.example.demo.models.Team;
import com.example.demo.service.TeamService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/team"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class TeamAPI {

    private final TeamService teamService;

    public TeamAPI(TeamService teamService) {
        this.teamService = teamService;
    }


    @PostMapping("/add_team")
    public Team createTeam(@RequestParam("name") String name) {
        return teamService.createTeam(name);
    }


    @GetMapping("get_all_teams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }


    @PatchMapping( value = "/{name}")
    public Team updateTeam(@PathVariable(value = "name") String name,@RequestParam("total_points") int total_points,
         @RequestParam("wins") int wins,@RequestParam("draws") int draws,
             @RequestParam("losts") int losts, @RequestParam("played_matches") int played_matches) {

        return teamService.updateTeam(name,total_points,wins,draws,losts,played_matches);
    }



    @GetMapping( value = "/most_goals_sum")
    public List<Integer> MostGoalsSUM() {
        return teamService.MostGoalsSUM();
    }

    @GetMapping( value = "/most_goals_teams")
    public List<String> MostGoalsTeams() {
        return teamService.MostGoalsTeams();
    }


    @GetMapping( value = "/{name}")
    public Team findByName(@PathVariable(value = "name") String name) {

        return teamService.findByName(name);
    }


    @GetMapping(value = "/playedmatches")
    public Integer TeamPLayedMatches(@RequestParam("teamName") String teamName)
    {
        return teamService.TeamPlayedMatches(teamName);
    }


    @DeleteMapping(value = "/{name}")
    void deleteTeam(@PathVariable(value = "name") String name){
        this.teamService.deleteTeam(name);

    }





}
