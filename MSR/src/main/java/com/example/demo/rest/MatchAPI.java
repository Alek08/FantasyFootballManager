package com.example.demo.rest;


import com.example.demo.models.Match;
import com.example.demo.models.Team;
import com.example.demo.service.MatchService;
import com.example.demo.service.TeamService;
import org.apache.catalina.LifecycleState;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/match"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class MatchAPI {

    private final MatchService matchService;

    public MatchAPI(MatchService matchService ) {
        this.matchService = matchService;
    }

/*
@ModelAttribute is used for binding data from request param (in key value pairs),
@RequestBody and @ResponseBody annotations are used to bind the HTTP request/response body with a domain object in method parameter or return type. Behind the scenes, these annotation uses HTTP Message converters to convert the body of HTTP request/response to domain objects
 */
    @PostMapping("/add_match")//RequestBody za post ResponseBody za get
    public Match createMatch(@RequestBody Match match) {

        System.out.println(match);

       return matchService.createMatch(match);

    }



    @GetMapping(value = "/get_all_matches")
    List<Match> getAllMatches()
    {
        return matchService.getAllMatches();
    }


    @GetMapping( value = "/{id}")
    public Match getMatch(@PathVariable(value = "id") Integer id) {

        return matchService.getMatch(id);
    }

    @DeleteMapping(value = "/{id}")
    void deleteMatch(@PathVariable(value = "id") Integer id){
        this.matchService.deleteMatch(id);
    }


    @PatchMapping(value = "/{id}")
    public Match updateMatch(@PathVariable(value = "id") Integer id,@RequestBody Match match){
       return matchService.updateMatch(id,match);

    }



}
