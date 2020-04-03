package com.example.demo.service.impl;

import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.GameWeek;
import com.example.demo.models.Match;
import com.example.demo.repository.GameWeekRepository;
import com.example.demo.service.GameWeekService;
import com.example.demo.service.MatchService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameWeekServiceImpl implements GameWeekService {

    private final GameWeekRepository gameWeekRepository;
    private final MatchService matchService;

    public GameWeekServiceImpl( GameWeekRepository gameWeekRepository,MatchService matchService) {
        this.gameWeekRepository=gameWeekRepository;
        this.matchService= matchService;
    }

    @Override
    public GameWeek getGameWeekByName(String name) {

       GameWeek gameWeek =gameWeekRepository.FindByName(name);

       if(gameWeek!=null)
       {
           return gameWeek;
       }else {
           throw new NotFoundException("gameweek with name "+name+" does not exists");
       }

    }


    @Override
    public GameWeek createGameWeek(String gameWeekName) {


        GameWeek gameWeek1=gameWeekRepository.FindByName(gameWeekName);
        if(gameWeek1!=null)
        {
            throw new AlreadyExistsException("GameWeek with name "+gameWeekName+" already exists");

        }else
        {
            GameWeek gameWeek=new GameWeek();
            gameWeek.setName(gameWeekName);
            return gameWeekRepository.save(gameWeek);

        }



    }

    @Override
    public GameWeek updateGameWeek(Integer id, String newname) {

        Optional<GameWeek> gameWeek= gameWeekRepository.findById(id);
        if(gameWeek!=null) {

             gameWeek.get().setName(newname);
            return gameWeekRepository.save(gameWeek.get());

        }
        else {
            throw new NotFoundException("GameWeek with id"+id+" not found");
        }


    }

    @Override
    public GameWeek addMatchToGameWeek(Integer gameWeekId,Integer matchId) {

        Match match=matchService.getMatch(matchId);
        Optional<GameWeek> gameWeek=gameWeekRepository.findById(gameWeekId);

        if(match!=null && gameWeek!=null)
        {
            List<Match> matches=gameWeek.get().getMatches();
            matches.add(match);
            gameWeek.get().setMatches(matches);

           return gameWeekRepository.save(gameWeek.get());
        }
        else
        {
            if(match==null)
            throw new NotFoundException("Match with id "+matchId+" not found");
            if(gameWeek==null)
                throw new NotFoundException("GameWeek with id "+gameWeekId+" not found");
            else  throw new NotFoundException("sas");
        }

    }

    @Override
    public List<GameWeek> getAllGameWeeks() {
        return gameWeekRepository.findAll();
    }



    @Override
    public GameWeek getGameWeek(Integer id) {
        Optional<GameWeek> gameWeek= gameWeekRepository.findById(id);

        if(gameWeek!=null) {

            return gameWeek.get();
        }
        else {
            throw new NotFoundException("GameWeek with id"+id+" not found");
        }
    }

    @Override
    public void deleteGameWeek(int id) {
        Optional<GameWeek> gameWeek= gameWeekRepository.findById(id);
        if(gameWeek!=null) {
            gameWeekRepository.deleteById(id);
        }
        else {
            throw new NotFoundException("GameWeek with id"+id+" not found");
        }
    }


}
