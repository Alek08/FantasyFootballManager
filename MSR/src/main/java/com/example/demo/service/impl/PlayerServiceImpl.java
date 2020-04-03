package com.example.demo.service.impl;

import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.Player;
import com.example.demo.models.Team;
import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.PlayerService;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class PlayerServiceImpl implements PlayerService {


    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository,TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    public Player createPlayer(String name, String teamName,String pos) {
        Team team=teamRepository.FindByName(teamName);
            if(team!=null)
            {
                int flag = 0;
                List<Player> players = playerRepository.findAll();
                for (int i = 0; i < players.size(); i++) {
                    if (name.equals(players.get(i).getName())) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    Player player = new Player(name, team,pos);
                    return this.playerRepository.save(player);
                } else {
                    throw new AlreadyExistsException("Player with name " + name + " already exists");
                }
            }else
            {
                throw new NotFoundException("Team "+teamName+"does not exists");
            }

    }

    public List<Player> getAllPlayers() {

        return this.playerRepository.findAll();
    }

    @Override
    public List<Player> getAllPlayersInPos(String pos,Integer teamId) {

        return this.playerRepository.FindByPosition(pos,teamId);
    }

    @Override
    public List<Player> getTopPlayers() {
        return playerRepository.getTopPlayers();
    }

    @Override
    public List<Player> findAllPlayersInTeam(Integer teamId) {
        return this.playerRepository.FindAllPlayersInTeam(teamId);
    }

    public Player updatePlayers(String name, String newname,Integer total_points) {
        Player player = this.playerRepository.FindByName(name);
        if (player != null) {
            player.setName(newname);
            player.setTotal_points(total_points);
            return this.playerRepository.save(player);
        }
        else {
            throw  new NotFoundException("Player with name "+name+" is not found");
        }


    }

    public void deletePlayer(String name) {
        Player player=playerRepository.FindByName(name);

        if(player!=null)
        {
            playerRepository.deleteById(player.getId());
        }
        else
        {
            throw  new NotFoundException("Player with name "+name+" is not found");
        }

    }

    public Player findByName(String name) {

        Player player = playerRepository.FindByName(name);

        if(player!=null){
            return player;
        }
        else {
            throw  new NotFoundException("Player with name "+name+" is not found");
        }
    }


}