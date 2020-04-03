package com.example.demo.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "GameWeek")
public class GameWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "GameWeek")
    private String name;

    @ManyToMany
    private List<Match> matches;


    public GameWeek() {

    }

    public GameWeek(String name, List<Match> matches) {
        this.name = name;
        this.matches = matches;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public Integer getId() {
        return Id;
    }

    public List<Match> getMatches() {
        return matches;
    }
}
