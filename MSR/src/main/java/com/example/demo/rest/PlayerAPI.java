package com.example.demo.rest;

import com.example.demo.models.Player;
import com.example.demo.models.Team;
import com.example.demo.service.PlayerService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = {"/api/player"},
        produces = MediaType.APPLICATION_JSON_VALUE)
public class PlayerAPI {

        private final PlayerService playerService;

        public PlayerAPI(PlayerService playerService) {
            this.playerService = playerService;
        }


        @PostMapping("/add_player")
        public Player createPlayer(@RequestParam("name") String name, @RequestParam("team") String teamName,
                                   @RequestParam("pos") String pos
        ) {
            return playerService.createPlayer(name, teamName,pos);
        }



        @GetMapping("/get_all_players")
        public List<Player> getAllPlayers() {


            return playerService.getAllPlayers();
        }


    @GetMapping()
    public List<Player> getAllPlayersInPos(@RequestParam("pos") String pos,@RequestParam("teamId") Integer teamId) {
                return playerService.getAllPlayersInPos(pos,teamId);

    }

    @GetMapping("get_top_players")
    public List<Player> getTopPlayers() {
        return playerService.getTopPlayers();

    }


    @GetMapping("/get_all_players_in_team/{teamId}")
    public List<Player> getAllPlayers(@PathVariable(value = "teamId") Integer teamId) {

        return playerService.findAllPlayersInTeam(teamId);
    }


    @PatchMapping( value = "/{name}")
    public Player updatePlayers(@RequestParam(value = "name") String name,@RequestParam(value = "newname") String newName,
                                @RequestParam(value = "total_points") Integer total_points) {
        return playerService.updatePlayers(name,newName,total_points);
    }

    @GetMapping( value = "/{name}")
    public Player findByName(@PathVariable(value = "name") String name) {
        return playerService.findByName(name);
    }

    @DeleteMapping(value = "/{name}")
    void deletePlayer(@PathVariable(value = "name") String name){
            this.playerService.deletePlayer(name);
    }


}
