package lt.vtvpmc.ems.isveikata.specialization;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.mappers.SpecializationMapper;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SpecializationService {

    @Autowired
    private JpaSpecializationRepository jpaSpecializationRepository;
    @Autowired
    private SpecializationMapper specializationMapper;

    public void createSpecialization(SpecializationDto specializationDto) {
        jpaSpecializationRepository.save(specializationMapper.dtoToSpecialization(specializationDto));
    }

    public List<SpecializationDto> getAllSpecialization() {
        return specializationMapper.specializationsToDto(jpaSpecializationRepository.findAll());
    }

}
