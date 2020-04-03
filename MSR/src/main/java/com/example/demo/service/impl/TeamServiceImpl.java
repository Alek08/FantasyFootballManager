package com.example.demo.service.impl;

import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.Team;
import com.example.demo.repository.TeamRepository;
import com.example.demo.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {


    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Team createTeam(String teamName) {
        int flag = 0;

        List<Team> teams = teamRepository.findAll();
        for (int i = 0; i < teams.size(); i++) {
            if (teamName.equals(teams.get(i).getTeamName())) {
                flag = 1;
                break;
            }
        }

        if (flag == 0) {
            Team team = new Team();
            team.setTeamName(teamName);
            return teamRepository.save(team);

        } else {
            throw new AlreadyExistsException("Team with name " + teamName + " already exists");
        }


    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public List<Integer> MostGoalsSUM() {
        return teamRepository.MostGoalsSUM();
    }

    @Override
    public List<String> MostGoalsTeams() {
        return teamRepository.MostGoalsTeams();
    }

    @Override
    public Team findByName(String name) {
        Team team = teamRepository.FindByName(name);

        if (team != null) {
            return team;
        } else {
            throw new NotFoundException("Team with name " + name + " is not found");
        }
    }

    @Override
    public Team updateTeam(String name, int total_points, int wins, int losts, int draws,int played_matches) {

        Team team = this.teamRepository.FindByName(name);
        if (team != null) {

            team.setTotal_points(total_points);
            team.setWins(wins);
            team.setLosts(losts);
            team.setDraws(draws);
            team.setPlayed_matches(played_matches);


            return this.teamRepository.save(team);
        } else {
            throw new NotFoundException("Team with name " + name + " is not found");
        }


    }

    @Override
    public Integer TeamPlayedMatches(String teamName) {
        return teamRepository.TeamPlayedMatches(teamName);
    }

    @Override
    public void deleteTeam(String name) {

        Team team = this.teamRepository.FindByName(name);
        if (team != null) {
            teamRepository.deleteById(team.getId());
        } else {
            throw new NotFoundException("Team with name " + name + " is not found");
        }

    }
}
