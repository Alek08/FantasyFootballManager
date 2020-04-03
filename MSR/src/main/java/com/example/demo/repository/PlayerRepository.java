package com.example.demo.repository;

import com.example.demo.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PlayerRepository  extends JpaRepository<Player, Integer> {


    @Query("select p from Player as p where p.position=:pos and p.team.id=:teamId")
    List<Player> FindByPosition(String pos,Integer teamId);


    @Query("select p from Player as p where p.name=:name")
    Player FindByName(String name);


    @Query("select p from Player as p  where p.team.id=:teamId")
    List<Player> FindAllPlayersInTeam(Integer teamId);


    @Query(value = "select TOP 10 * from Players Order By TotalPoints desc",nativeQuery = true)
    List<Player> getTopPlayers();


}
