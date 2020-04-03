package com.example.demo.service.impl;

import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.FantasyTeam;
import com.example.demo.models.Match;
import com.example.demo.models.Player;
import com.example.demo.models.Team;
import com.example.demo.repository.FantasyTeamRepository;
import com.example.demo.repository.MatchRepository;
import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.MatchService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;
    private final FantasyTeamRepository fantasyTeamRepository;

    public MatchServiceImpl(MatchRepository matchRepository,TeamRepository teamRepository,PlayerRepository playerRepository,FantasyTeamRepository fantasyTeamRepository) {
        this.teamRepository=teamRepository;
        this.matchRepository=matchRepository;
        this.playerRepository=playerRepository;
        this.fantasyTeamRepository=fantasyTeamRepository;
    }

    @Override
    public Match createMatch(Match match) {

        Team homeTeam=match.getHomeTeam();//ne saka ako na match mu dademe od ReuestBody homeTeam
        Team awayTeam=match.getAwayTeam();
String flag="";

        Team h1=this.teamRepository.FindByName(homeTeam.getTeamName());
        Team a1=this.teamRepository.FindByName(awayTeam.getTeamName());

        ////////////////Poeni za TIM

        if(Integer.parseInt(match.getHomeTeamScores())>Integer.parseInt(match.getAwayTeamScores()))
        {
            int total=h1.getTotal_points();
            h1.setTotal_points(total+3);

            int wins=h1.getWins();
            h1.setWins(wins+1);

            int losts=a1.getLosts();
            a1.setLosts(losts+1);

            //mislam moze i so this.teamRepository.save homeTeam ili h1

            flag=h1.getTeamName();

        }else if(Integer.parseInt(match.getHomeTeamScores())<Integer.parseInt(match.getAwayTeamScores())){
            int total=a1.getTotal_points();
            a1.setTotal_points(total+3);

            int wins=a1.getWins();
            a1.setWins(wins+1);

            int losts=h1.getLosts();
            h1.setLosts(losts+1);

            flag=a1.getTeamName();

        }else if(Integer.parseInt(match.getHomeTeamScores())==Integer.parseInt(match.getAwayTeamScores()))
        {
            int total_home=h1.getTotal_points();
            total_home=total_home+1;
            h1.setTotal_points(total_home);

            int total_away=a1.getTotal_points();
            total_away=total_away+1;
            a1.setTotal_points(total_away);

            int hd=h1.getDraws();
            h1.setDraws(hd+1);

            int ad=a1.getDraws();
            a1.setDraws(ad+1);
            flag="nereseno";

        }

        ////////////////Poeni za Igracite

       List<Player> home_players= playerRepository.FindAllPlayersInTeam(h1.getId());
       List<Player> away_players= playerRepository.FindAllPlayersInTeam(a1.getId());

       if(flag.equals(h1.getTeamName()))
       {
           for(int i=0;i<home_players.size();i++)
           {
               Player player=home_players.get(i);
               player=playerRepository.FindByName(player.getName());
               int total= player.getTotal_points();
               total=total+3;
               player.setTotal_points(total);
           }
       }else if(flag.equals(a1.getTeamName()))
       {
               for(int i=0;i<away_players.size();i++)
               {
                   Player player=away_players.get(i);
                   player=playerRepository.FindByName(player.getName());
                   int total= player.getTotal_points();
                   total=total+3;
                   player.setTotal_points(total);
               }

       }  else if(flag.equals("nereseno"))
       {
           for(int i=0;i<home_players.size();i++)
           {
               Player player=home_players.get(i);
               player=playerRepository.FindByName(player.getName());
               int total= player.getTotal_points();
               total=total+1;
               player.setTotal_points(total);
           }

           for(int i=0;i<away_players.size();i++)
           {
               Player player=away_players.get(i);
               player=playerRepository.FindByName(player.getName());
               int total= player.getTotal_points();
               total=total+1;
               player.setTotal_points(total);
           }

       }

        ////////////////Poeni za Igracite GOLOVI I ASISTENCII


        List<Player> goals_Players=match.getGoalsPlayers();

        List<Player> assists_Players=match.getAssistsPlayers();


        for(int i=0;i<goals_Players.size();i++)
        {
            Player player=goals_Players.get(i);
            player=playerRepository.FindByName(player.getName());
            int total= player.getTotal_points();
            total=total+5;
            player.setTotal_points(total);
            this.playerRepository.save(player);
        }

        for(int i=0;i<assists_Players.size();i++)
        {
            Player player=assists_Players.get(i);
            player=playerRepository.FindByName(player.getName());
            int total= player.getTotal_points();
            total=total+3;
            player.setTotal_points(total);
            this.playerRepository.save(player);
        }

        ////Izigrani natprevari
        int a_match_played=a1.getPlayed_matches();
a1.setPlayed_matches(a_match_played+1);

        int h_match_played=h1.getPlayed_matches();
        h1.setPlayed_matches(h_match_played+1);

        Match m=new Match();//bez new detached entity passed to persist exception

        m.setAwayTeam(a1);
        m.setHomeTeam(h1);
        m.setAssistsPlayers(assists_Players);
        m.setGoalsPlayers(goals_Players);
        m.setHomeTeamScores(match.getHomeTeamScores());
        m.setAwayTeamScores(match.getAwayTeamScores());


        List<FantasyTeam> fantazii_timovi =fantasyTeamRepository.findAll();



        for(int i=0;i<fantazii_timovi.size();i++)
        {
            FantasyTeam fantasyTeam=fantazii_timovi.get(i);

            //dokolku se smenat poenite za da ne se dodadat starite
           // int total= fantasyTeam.getTotal_points();
            int total_for_player=0;

            List<Player> fantasy_players=  fantasyTeam.getPlayers();
            for(int j=0;j<fantasy_players.size();j++)
            {
                Player player=fantasy_players.get(j);
                total_for_player+= player.getTotal_points();
            }

        //    fantasyTeam.setTotal_points(total_for_player+total);
            fantasyTeam.setTotal_points(total_for_player);

        }




        return this.matchRepository.save(m);

    }



    @Override
    public List<Match> getAllMatches() {
        return this.matchRepository.findAll();
    }

    @Override
    public Match updateMatch(int id,Match m) {

        Optional<Match> match = this.matchRepository.findById(id);
        if (match != null) {
          match.get().setAssistsPlayers(m.getAssistsPlayers());
          match.get().setGoalsPlayers(m.getGoalsPlayers());

          match.get().setAwayTeamScores(m.getAwayTeamScores());
          match.get().setHomeTeamScores(m.getHomeTeamScores());

            return this.matchRepository.save(match.get());
        }
        else {
            throw  new NotFoundException("Match with id "+id+" is not found");
        }


    }

    @Override
    public Match getMatch(Integer id) {
        Optional<Match> m=this.matchRepository.findById(id);
        if(m.isPresent())
        {
            return m.get();
        }else {
            throw  new NotFoundException("Match with id "+id+" is not found");
        }

    }

    @Override
    public void deleteMatch(int id) {
        this.matchRepository.deleteById(id);

    }
}
