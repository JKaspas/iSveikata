package lt.vtvpmc.ems.isveikata.employees;


import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EmployeesService {

    @Autowired
    private JpaPatientRepository jpaPatientRepository;
}
