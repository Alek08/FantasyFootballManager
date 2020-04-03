package com.example.demo.models;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "PlayerName")
    private String name;

    @Column(name = "TotalPoints")
    private int total_points=0;

    @Column(name = "Position")
    private String position;

    @ManyToOne
    private Team team;


    public Player() {
    }
    public Player(String name, Team team,String position) {
        this.name = name;
        this.team = team;
        this.position = position;

    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPosition() {
        return position;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTeam(Team team) {
        this.team = team;
    }


    public void setTotal_points(int total_points) {
        this.total_points = total_points;
    }

    public int getTotal_points() {
        return total_points;
    }



    public Integer getId() {
        return Id;
    }

    public String getName() {
        return name;
    }

    public Team getTeam() {
        return team;
    }
}
