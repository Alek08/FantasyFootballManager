package com.example.demo.service.impl;

import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.models.FantasyTeam;
import com.example.demo.models.Player;
import com.example.demo.models.Users;
import com.example.demo.repository.FantasyTeamRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.FantasyTeamService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FantasyTeamImpl implements FantasyTeamService {

private final FantasyTeamRepository fantasyTeamRepository;
private final UsersRepository usersRepository;

    public FantasyTeamImpl(FantasyTeamRepository fantasyTeamRepository,UsersRepository usersRepository) {
        this.usersRepository=usersRepository;
        this.fantasyTeamRepository=fantasyTeamRepository;
    }

    @Override
    public FantasyTeam createFantasyTeam(FantasyTeam fantasyTeam) {
        if( fantasyTeamRepository.FindByName(fantasyTeam.getName())==null)
        {

            Users user=usersRepository.FindUserByEmail(fantasyTeam.getUser_email());
            if(user!=null)
            {
                user.setFantasyTeam(fantasyTeam);
                return fantasyTeamRepository.save(fantasyTeam);
            }else
            {
                throw new NotFoundException("User with email "+fantasyTeam.getUser_email()+" not found");
            }

        }else {
            throw  new AlreadyExistsException("Fantasy Team with name "+fantasyTeam.getName()+" already exists");
        }
    }

    @Override
    public List<FantasyTeam> getAllFantasyTeams() {
        return fantasyTeamRepository.findAll();
    }
}
