package com.example.demo.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "TeamName")
    private String teamName;
    @Column(name = "TotalPoints")
    private int total_points=0;
    @Column(name = "PlayedMatches")
    private int played_matches=0;
    @Column(name = "wins")
    private int wins;
    @Column(name = "losts")
    private int losts;
    @Column(name = "draws")
    private int draws;


   // @OneToMany
   // private List<Player> players;



    public Team( ) {

    }

    public Team(String teamName, int total_points, int wins, int losts, int draws,int played_matches) {
        this.teamName = teamName;
        this.total_points = total_points;
        this.wins = wins;
        this.losts = losts;
        this.draws = draws;
        this.played_matches=played_matches;

    }


    public void setPlayed_matches(int played_matches) {
        this.played_matches = played_matches;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setTotal_points(int total_points) {
        this.total_points = total_points;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public void setLosts(int losts) {
        this.losts = losts;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }


    public int getPlayed_matches() {
        return played_matches;
    }

    public Integer getId() {
        return Id;
    }

    public String getTeamName() {
        return teamName;
    }

    public int getTotal_points() {
        return total_points;
    }

    public int getWins() {
        return wins;
    }

    public int getLosts() {
        return losts;
    }

    public int getDraws() {
        return draws;
    }


}
