package com.example.demo.rest;


import com.example.demo.models.GameWeek;
import com.example.demo.service.GameWeekService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/gameweek"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class GameWeekAPI {

private final GameWeekService gameWeekService;

    public GameWeekAPI(GameWeekService gameWeekService) {
        this.gameWeekService=gameWeekService;
    }

    @PostMapping("/add_gameweek")
    public GameWeek createGameWeek(@RequestParam("gameWeekName") String gameWeekName) {
        return gameWeekService.createGameWeek(gameWeekName);
    }



    @PostMapping("/add_match_to_gameweek")
    public GameWeek createGameWeek(@RequestParam("gameWeekId") Integer gameWeekId,
                                   @RequestParam("matchId") Integer matchId) {

        return gameWeekService.addMatchToGameWeek(gameWeekId,matchId);
    }


    @GetMapping(value = "/get_all_gameweeks")
    List<GameWeek> getAllGameWeeks() {
        return gameWeekService.getAllGameWeeks();
    }


    @GetMapping( value = "/{id}")
    public GameWeek getGameWeek(@PathVariable(value = "id") Integer id) {

        return gameWeekService.getGameWeek(id);
    }

    @GetMapping()
    public GameWeek getGameWeekByName(@RequestParam("gameweekname") String gameweekname) {

        return gameWeekService.getGameWeekByName(gameweekname);
    }




    @PatchMapping(value = "/{id}")
    public GameWeek updateGameWeek(@PathVariable(value = "id") Integer id,@RequestParam(value = "newname") String name){
        return gameWeekService.updateGameWeek(id, name);

    }


    @DeleteMapping(value = "/{id}")
    void deleteGameWeek(@PathVariable(value = "id") Integer id){

        this.gameWeekService.deleteGameWeek(id);
    }




}
