package com.example.demo.repository;

import com.example.demo.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface TeamRepository  extends JpaRepository<Team, Integer> {

    @Query("select t from Team as t where t.teamName=:name")
    Team FindByName(String name);


    @Query("select COUNT(m.Id) from Match m JOIN Team t ON t.Id=m.homeTeam.Id OR t.Id=m.awayTeam.Id where t.teamName=:teamName")
    Integer TeamPlayedMatches(String teamName);


    @Query(value = "select  TOP 5 SUM(SVE.suma) as goals from (select st.tim, st.suma from (select  SUM(CAST(HomeTeamScores AS int)) as suma,TeamName as tim from Team as t,Match as m where m.homeTeam=t.Id Group By t.TeamName) as st union  select  st.tim, st.suma from (select  SUM(CAST(AwayTeamScores AS int)) as suma,TeamName as tim from Team as t,Match as m where m.awayTeam=t.Id Group By t.TeamName) as st  ) as SVE GROUP BY SVE.tim ORDER BY SUM(SVE.suma) desc",nativeQuery = true)
    List<Integer> MostGoalsSUM();

    @Query(value = "select  TOP 5 SVE.tim as team from (select st.tim, st.suma from (select  SUM(CAST(HomeTeamScores AS int)) as suma,TeamName as tim from Team as t,Match as m where m.homeTeam=t.Id Group By t.TeamName) as st union  select  st.tim, st.suma from (select  SUM(CAST(AwayTeamScores AS int)) as suma,TeamName as tim from Team as t,Match as m where m.awayTeam=t.Id Group By t.TeamName) as st  ) as SVE GROUP BY SVE.tim ORDER BY SUM(SVE.suma) desc",nativeQuery = true)
    List<String> MostGoalsTeams();





}
