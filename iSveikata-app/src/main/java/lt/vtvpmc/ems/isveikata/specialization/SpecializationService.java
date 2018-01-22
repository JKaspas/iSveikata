package lt.vtvpmc.ems.isveikata.specialization;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SpecializationService {

    @Autowired
    private JpaSpecializationRepository jpaSpecializationRepository;

    public void createSpecialization(Specialization specialization) {
        jpaSpecializationRepository.save(specialization);
    }

    public List<Specialization> getAllSpecialization() {
        return jpaSpecializationRepository.findAll();
    }

}
