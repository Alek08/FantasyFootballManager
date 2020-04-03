package com.example.demo.repository;

import com.example.demo.models.GameWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameWeekRepository  extends JpaRepository<GameWeek, Integer> {

    @Query("select g from GameWeek as g where g.name=:name")
    GameWeek FindByName(String name);



}
