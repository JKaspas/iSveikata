package lt.vtvpmc.ems.isveikata.patient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PatientService {

    @Autowired
    private JpaPatientRepository jpaPatientRepository;
}
