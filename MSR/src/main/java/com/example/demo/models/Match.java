package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Match")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "HomeTeamScores")
    private String homeTeamScores;


    @Column(name = "AwayTeamScores")
    private String awayTeamScores;


    @ManyToMany
    private List<Player> goalsPlayers;

    @ManyToMany
    private List<Player> assistsPlayers;



    @ManyToOne()
    private Team homeTeam;

    @ManyToOne()
    private Team awayTeam;


//ja koristi isata od GameWeek i doveduva do circular references
  //  @ManyToMany(mappedBy = "matches")
   // private List<GameWeek> gameWeeks;


    public Match( ) {

    }

    public Match(String homeTeamScores, String awayTeamScores, List<Player> goalsPlayers, List<Player> assistsPlayers, Team homeTeam, Team awayTeam) {
        this.homeTeamScores = homeTeamScores;
        this.awayTeamScores = awayTeamScores;
        this.goalsPlayers = goalsPlayers;
        this.assistsPlayers = assistsPlayers;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public void setHomeTeamScores(String homeTeamScores) {
        this.homeTeamScores = homeTeamScores;
    }

    public void setAwayTeamScores(String awayTeamScores) {
        this.awayTeamScores = awayTeamScores;
    }

    public void setGoalsPlayers(List<Player> goalsPlayers) {
        this.goalsPlayers = goalsPlayers;
    }

    public void setAssistsPlayers(List<Player> assistsPlayers) {
        this.assistsPlayers = assistsPlayers;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }


    public Integer getId() {
        return Id;
    }

    public String getHomeTeamScores() {
        return homeTeamScores;
    }

    public String getAwayTeamScores() {
        return awayTeamScores;
    }

    public List<Player> getGoalsPlayers() {
        return goalsPlayers;
    }

    public List<Player> getAssistsPlayers() {
        return assistsPlayers;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }


}
