package com.example.demo.models;


import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "FantasyTeams")
public class FantasyTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "Name")
    private String name;
    @Column(name = "UserEmail")
    private String user_email;
    @Column(name = "TotalPoints")
    private Integer total_points=0;

   @ManyToMany
    private List<Player> players;


    public FantasyTeam() { }

    public FantasyTeam(String name, String user_email, Integer total_points, List<Player> players) {
        this.name = name;
        this.user_email = user_email;
        this.total_points = total_points;
        this.players = players;
    }

    public Integer getId() {
        return Id;
    }

    public String getName() {
        return name;
    }

    public String getUser_email() {
        return user_email;
    }

    public Integer getTotal_points() {
        return total_points;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public void setTotal_points(Integer total_points) {
        this.total_points = total_points;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
