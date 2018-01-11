package lt.vtvpmc.ems.isveikata.specialization;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class SpecializationService {

    @Autowired
    private JpaSpecializationRepository jpaSpecializationRepository;
}
